// miniprogram/pages/income/income.js
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    income: 0,
    remarks: null,
    remarkindex: 1,
    remarkinput: null,
    remarkscansubmit: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      data: app.globalData.userData[options.name],
      remarks: app.globalData.remarks
    })
  },
  bindPickerChange: function(e) {
    if (e.target.id == "remarks") {
      this.setData({
        remarkindex: e.detail.value,
      })
    }
  },
  handleInput: function(e) {
    if (e.target.id == "remarks") {
      this.setData({
        remarkinput: e.detail.value,
      })
    } else if (e.target.id == "income") {
      this.setData({
        income: Number(e.detail.value),
      })
    }
  },
  checkForm: function() {
    var _this = this
    return new Promise((resolve, reject) => {
      if (_this.data.income == 0) {
        wx.showModal({
          title: '提示',
          content: '收入为0！',
          showCancel: false
        })
        reject();
      } else if (!app.globalData.openid) {
        //console.log("提交时无openid，尝试登录")
        new Promise((resolve, reject) => {
          util.login().then((res) => {
            //console.log("用户登录成功", res)
            app.globalData.openid = res.result.openid
            resolve()
          }).catch((err) => {
            //console.error("用户登录失败", err)
            util.networkError();
            reject(err)
          })
        }).then(() => {
          resolve();
        })
      } else {
        resolve();
      }
    })
  },
  submit: function() {
    this.checkForm().then((res) => {
      var remarkstosubmit = "";
      if (this.data.remarkindex > 0) remarkstosubmit = this.data.remarks[this.data.remarkindex]
      else if (!!remarkinput) remarkstosubmit = this.data.remarkinput
      util.getHttpTime("yyyy-MM-dd").then((time) => {
        util.httpsGet("db?sql=INSERT INTO " + app.globalData.openid + "history" + this.data.data.id + "" + "(" + this.data.income+""+"name, nameid, value, time, remarks)VALUES(\"" + this.data.data.name + '",' + this.data.data.id + ',' + this.data.income + ',"' +
          time + '","' + remarkstosubmit + '")_AddIncome').then((res) => {
          if (res.data == '1') {
            console.log("收入提交成功", res.data)
            wx.showModal({
              title: '提示',
              content: '收入添加成功',
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: '../main/main'
                  })
                }
              }
            })
          } else {
            console.error("收入提交失败", res.data)
            util.networkError();
          }
        }).catch((err) => {
          console.error("收入提交失败", err)
          util.networkError();
        })
      })
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})