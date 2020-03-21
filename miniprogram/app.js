//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'flg-xdu'
    })
  },
  globalData: {
    userInfo: null,
    apiUrl: 'https://flxdu.cn'
  }
})