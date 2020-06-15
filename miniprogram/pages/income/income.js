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
    incomeinput: null,
    todayleft: null,
    totalleft: null,
    remarks: app.globalData.remarks,
    currencyTypeSignal: app.globalData.currencyTypeSignal,
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
      todayleft: this.data.currencyTypeSignal[app.globalData.userData[options.name]['currency']] + " " + util.toFix(app.globalData.userData[options.name].todayleft + this.data.income / app.globalData.userData[options.name].remaindays)+"",
      totalleft: this.data.currencyTypeSignal[app.globalData.userData[options.name]['currency']] + " " + util.toFix(app.globalData.userData[options.name].balance + this.data.income)+""
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
      if ((e.detail.value.split('.').length < 3) && (e.detail.value.indexOf('.') == -1 || e.detail.value.length - e.detail.value.indexOf('.') != 4)) {
        this.setData({
          income: e.detail.value,
          todayleft: this.data.currencyTypeSignal[this.data.data['currency']] + " " + util.toFix(this.data.data.todayleft + e.detail.value / this.data.data.remaindays) + "",
          totalleft: this.data.currencyTypeSignal[this.data.data['currency']] + " " + util.toFix(this.data.data.balance + e.detail.value * 1) + ""
        })
      } else {
        this.setData({
          incomeinput: this.data.income
        })
      }
    }
  },
  checkForm: function() {
    var _this = this
    return new Promise((resolve, reject) => {
      if (!_this.data.income ||_this.data.income == 0) {
        wx.showModal({
          title: '提示',
          content: '未填写收入！',
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
      else if (!!this.data.remarkinput) remarkstosubmit = this.data.remarkinput
      util.getHttpTime("yyyy-MM-dd").then((time) => {
        util.httpsGet("db?sql=INSERT INTO " + app.globalData.openid + "history" + this.data.data.id + "" + "(" + this.data.income + "" + "name, nameid, value, time, remarks)VALUES(\"" + this.data.data.name + '",' + this.data.data.id + ',' + this.data.income + ',"' +
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