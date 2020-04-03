//app.js
const util = require("./utils/util.js")
App({
  onLaunch: function() {
    const _this = this;
    wx.cloud.init({
      env: 'flg-xdu'
    })
    new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "login",
        data: {},
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    }).then((res) => {
      console.log("用户登录成功", res)
      _this.globalData.openid = res.result.openid
      util.httpsGet('/api/ping').then((res) => {
        if (res.statusCode==200)
          console.log("服务器连接成功", res)
        else {
          util.networkError();
        }
      }).catch((err) => {
        console.error("服务器连接失败", err)
        util.networkError();
      })
    }).catch((err) => {
      console.error("用户登录失败", err)
      util.networkError();
    })
  },

  globalData: {
    userInfo: null,
    apiUrl: 'https://flxdu.cn',
    openid: "",
  }
})