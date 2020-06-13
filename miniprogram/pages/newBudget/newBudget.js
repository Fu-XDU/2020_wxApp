// miniprogram/pages/newBudget/newBudget.js
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    type: app.globalData.dataType[0],
    typeboxes: app.globalData.dataType,
    typeindex: 0,
    beginTime: "今日",
    beginTimeboxes: ["今日", "每月第一天", "每月最后一天", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日", "31日"],
    beginTimeindex: 0,
    endTime: app.globalData.currencyType[0],
    endTimeboxes: ["今日"],
    endTimeindex: 0,
    currency: app.globalData.currencyType[0],
    currencyboxes: app.globalData.currencyType,
    currencyindex: 0,
    total: null,
    totalinput: null,
    balance: null,
    balanceinput: null,
    rollover: "是，滚存",
    rolloverboxes: ["是，滚存", "不，不要滚存"],
    rolloverindex: 0,
    overflowtip: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
  checkForm: function() {
    var _this = this
    return new Promise((resolve, reject) => {
      if (!!!_this.data.name || !!!_this.data.total || !!!_this.data.balance) {
        wx.showModal({
          title: '提示',
          content: '内容未填写完整',
          showCancel: false
        })
        reject();
      } else if (!!!app.globalData.openid) {
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
  submitToDb: function() {
    if (!app.globalData.userData[this.data.name]) {
      this.data.name = this.data.name.replace(/%/g, '%25');
      this.data.name = this.data.name.replace(/#/g, '%23');
      this.data.name = this.data.name.replace(/&/g, '%26');
      this.data.name = this.data.name.replace(/=/g, '%3D');
      this.data.name = this.data.name.replace(/\?/g, '%3F');
      this.data.name = this.data.name.replace(/\//g, '%2F');
      this.data.name = this.data.name.replace(/ /g, '%20');
      this.data.name = this.data.name.replace(/\+/g, '%2B');
      util.httpsGet("db?sql=INSERT INTO " + app.globalData.openid + "(name, dataType, beginTime, currency, total, balance, rollover, endTime)VALUES(\"" + this.data.name + '",' + this.data.typeindex + ',"' + this.data.beginTime + '",' +
        this.data.currencyindex + ',' + this.data.total + ',' + this.data.balance + ',' + (this.data.rolloverindex + 1) % 2 + ',"' + this.data.endTime + '")_Add').then((res) => {
        if (res.data == '1') {
          console.log("预算提交成功", res.data)
          wx.redirectTo({
            url: './newBudgetSucceed/newBudgetSucceed'
          })
        } else {
          console.error("预算提交失败", res.data)
          util.networkError();
        }
      }).catch((err) => {
        console.error("预算提交失败", err.data)
        util.networkError();
      })
    } else {
      wx.showModal({
        title: '重名啦',
        content: '你已经有名为' + this.data.name + '的预算啦',
        showCancel: false
      })
    }
  },
  submitForm: function() {
    this.checkForm().then(() => {
      //每月
      //如果选的日期可能在其他月份不出现，在其他地方会判断，所以直接存数字即可。每月最后一天存32
      if (this.data.typeindex == 0) {
        this.data.endTime = ""
        //今日
        if (this.data.beginTimeindex == 0) {
          //拿到今日日期
          util.getHttpTime("dd").then((res) => {
            this.data.beginTime = res.toString()
            this.realSubmit()
          })
        } else if (this.data.beginTimeindex == 1) {
          this.data.beginTime = "1"
          this.realSubmit()

        } else if (this.data.beginTimeindex == 2) {
          this.data.beginTime = "32"
          this.realSubmit()
        } else {
          this.data.beginTime = this.data.beginTime.slice(0, this.data.beginTime.length - 1)
          this.realSubmit()
        }
      } else if (this.data.typeindex == 1) {
        this.data.endTime = ""
        this.data.beginTime = Number(this.data.beginTimeindex) + 1
        this.realSubmit()
      } else {
        this.data.rolloverindex = 1
        this.realSubmit()
      }
    })
  },
  realSubmit: function() {
    if (app.globalData.registered == true) {
      this.submitToDb()
    } else {
      this.createTable().then((res) => {
        if (res.data == true)
          this.submitToDb()
        else console.log("something wrong")
      })
    }
  },
  // 处理input组件输入事件
  handleInput: function(e) {
    if (e.target.id == "name")
      this.data.name = e.detail.value
    else if (e.target.id == "total") {
      if ((e.detail.value.split('.').length < 3) && (e.detail.value.indexOf('.') == -1 || e.detail.value.length - e.detail.value.indexOf('.') != 4)) {
        this.setData({
          total: e.detail.value
        })
      } else {
        this.setData({
          totalinput: this.data.total
        })
      }
    } else if (e.target.id == "balance") {
      /*
      //检查是否超额
      if ((e.detail.value > this.data.total) && this.data.overflowtip) {
        wx.showModal({
          title: '友情提示',
          content: '您将为自己提供超过自己所设定的总预算的资金。',
          showCancel: false
        })
        this.data.overflowtip = false
      }*/
      if ((e.detail.value.split('.').length < 3) && (e.detail.value.indexOf('.') == -1 || e.detail.value.length - e.detail.value.indexOf('.') != 4)) {
        this.setData({
          balance: e.detail.value
        })
      } else {
        this.setData({
          balanceinput: this.data.balance
        })
      }
    }
  },
  // 处理picker选择器选择事件
  bindPickerChange: function(e) {
    if (e.target.id == "type") {
      this.data.type = this.data.typeboxes[e.detail.value],
        this.setData({
          typeindex: e.detail.value,
          beginTimeindex: 0,
        })
      var temp = null;
      if (this.data.typeindex == 0)
        temp = ["今日", "每月第一天", "每月最后一天", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日", "31日"]
      else if (this.data.typeindex == 1)
        temp = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
      else if (this.data.typeindex == 2) {
        this.setData({
          beginTime: "2020-05-01",
          endTime: "2020-05-01",
        })
      } else if (this.data.typeindex == 3) { //先不用
      }
      this.setData({
        beginTimeboxes: temp
      })
    } else if (e.target.id == "beginTimeSelector") {
      this.data.beginTime = this.data.beginTimeboxes[e.detail.value],
        this.setData({
          beginTimeindex: e.detail.value,
        })
    } else if (e.target.id == "beginTimeMultiSelector") {
      this.setData({
        beginTime: e.detail.value,
        endTime: e.detail.value,
      })
    } else if (e.target.id == "endTimeMultiSelector") {
      this.setData({
        endTime: e.detail.value,
      })
    } else if (e.target.id == "currency") {
      this.data.currency = this.data.currencyboxes[e.detail.value],
        this.setData({
          currencyindex: e.detail.value,
        })
    } else if (e.target.id == "rollover") {
      this.data.rollover = this.data.rolloverboxes[e.detail.value],
        this.setData({
          rolloverindex: e.detail.value,
        })
    }
  },
  createTable: function() {
    return new Promise((resolve, reject) => {
      util.httpsGet("db/initUser?openid=" + app.globalData.openid).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
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