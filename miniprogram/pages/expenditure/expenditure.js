/* miniprogram/pages/expenditure/expenditure.js */
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    expenditure: 0,
    expenditureinput: null,
    todayleft: null,
    totalleft: null,
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
      remarks: app.globalData.remarks,
      todayleft: util.toFix(app.globalData.userData[options.name].todayleft - this.data.expenditure * 1),
      totalleft: util.toFix(app.globalData.userData[options.name].balance - this.data.expenditure * 1)
    })
    //sconsole.log(this.data.data)
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
    } else if (e.target.id == "expenditure") {
      if ((e.detail.value.split('.').length < 3) && (e.detail.value.indexOf('.') == -1 || e.detail.value.length - e.detail.value.indexOf('.')!=4)) {
        this.setData({
          expenditure: e.detail.value,
          todayleft: util.toFix(this.data.data.todayleft - e.detail.value * 1),
          totalleft: util.toFix(this.data.data.balance - e.detail.value * 1)
        })
      } else {
        this.setData({
          expenditureinput: this.data.expenditure
        })
      }
    }
  },
  checkForm: function() {
    var _this = this
    return new Promise((resolve, reject) => {
      if (!_this.data.expenditure ||_this.data.expenditure == 0) {
        wx.showModal({
          title: '提示',
          content: '未填写支出！',
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
        util.httpsGet("db?sql=INSERT INTO " + app.globalData.openid + "history" + this.data.data.id + "" + "(-" + this.data.expenditure + "" + "name, nameid, value, time, remarks)VALUES(\"" + this.data.data.name + '",' + this.data.data.id + ',-' + this.data.expenditure + ',"' +
          time + '","' + remarkstosubmit + '")_AddExpenditure').then((res) => {
          if (res.data == '1') {
            console.log("支出提交成功", res.data)
            wx.showModal({
              title: '提示',
              content: '支出添加成功',
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
            console.error("支出提交失败", res.data)
            util.networkError();
          }
        }).catch((err) => {
          console.error("支出提交失败", err)
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