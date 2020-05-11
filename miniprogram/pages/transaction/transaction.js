// miniprogram/pages/transaction/transaction.js
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: true,
    names: null,
    frmdata: null,
    to: null,
    value: 0,
    valueinput: null,
    todayleft: null,
    totalleft: null,
    remarks: null,
    remarkindex: 1,
    remarkinput: null,
    remarkscansubmit: null,
    totodayleft: null,
    tototalleft: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var name = []
    for (var key in app.globalData.userData) {
      if (key != options.name)
        name.push(key)
    }
    this.setData({
      remarks: app.globalData.remarks,
      name: name,
      frmdata: app.globalData.userData[options.name],
      todayleft: util.toFix(app.globalData.userData[options.name].todayleft - this.data.value),
      totalleft: util.toFix(app.globalData.userData[options.name].balance - this.data.value)
    })
  },
  secectBudget: function(e) {
    this.setData({
      select: false,
      to: app.globalData.userData[e.target.id],
      totodayleft: app.globalData.userData[e.target.id].todayleft,
      tototalleft: app.globalData.userData[e.target.id].balance,
    })
  },
  handleInput: function(e) {
    if (e.target.id == "remarks") {
      this.setData({
        remarkinput: e.detail.value,
      })
    } else if (e.target.id == "value") {
      if ((e.detail.value.split('.').length < 3) && (e.detail.value.indexOf('.') == -1 || e.detail.value.length - e.detail.value.indexOf('.') != 4)) {
        this.setData({
          value: 1*e.detail.value,
          todayleft: util.toFix(this.data.frmdata.todayleft - e.detail.value),
          totalleft: util.toFix(this.data.frmdata.balance - e.detail.value)
        })
      } else {
        this.setData({
          valueinput: this.data.value
        })
      }
    }
  },
  checkForm: function() {
    var _this = this
    return new Promise((resolve, reject) => {
      if (!_this.data.value || _this.data.value == 0) {
        wx.showModal({
          title: '提示',
          content: '未填写转账数额！',
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
        util.httpsGet("db?sql=INSERT INTO " + app.globalData.openid + this.data.frmdata.id + "" + "history" + this.data.to.id + "" + "(" + this.data.value + "" + "name, nameid, peer, peerid,value, time, remarks)VALUES(\"" + this.data.frmdata.name + '",' + this.data.frmdata.id + ',"' + this.data.to.name + '",' + this.data.to.id + "," + this.data.value + ',"' +
          time + '","' + remarkstosubmit + '")_AddTransaction').then((res) => {
          if (res.data == '1') {
            console.log("转账提交成功", res.data)
            wx.showModal({
              title: '提示',
              content: '转账添加成功',
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
            console.error("转账提交失败", res.data)
            util.networkError();
          }
        }).catch((err) => {
          console.error("转账提交失败", err)
          util.networkError();
        })
      })
    })

  },
  bindPickerChange: function (e) {
    if (e.target.id == "remarks") {
      this.setData({
        remarkindex: e.detail.value,
      })
    }
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