// miniprogram/pages/myBudgets/myBudgets.js
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    budgets: null,
    leftplain: true,
    rightplain: true,
    leftdata: [],
    rightdata: [],
    todayleft: [],
    totalleft: [],
    todayspent: [],
    totalspent: [],
    currencyTypeSignal: app.globalData.currencyTypeSignal,
    delBtnWidth: 160,
    data: [{
      content: "1",
      right: 0
    }, {
      content: "2",
      right: 0
    }, {
      content: "3",
      right: 0
    }, {
      content: "4",
      right: 0
    }, {
      content: "5",
      right: 0
    }, {
      content: "6",
      right: 0
    }, {
      content: "7",
      right: 0
    }, {
      content: "8",
      right: 0
    }, {
      content: "9",
      right: 0
    }, {
      content: "10",
      right: 0
    }],
    isScroll: true,
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.budgets = app.globalData.userData
    for (var key in this.data.budgets) {
      this.data.leftdata.push(key)
      this.data.todayleft.push(this.data.currencyTypeSignal[this.data.budgets[key]['currency']] + " " + this.data.budgets[key].todayleft + "")
      this.data.totalleft.push(this.data.currencyTypeSignal[this.data.budgets[key]['currency']] + " " + this.data.budgets[key].balance + "")
      this.data.todayspent.push(this.data.currencyTypeSignal[this.data.budgets[key]['currency']] + " " + this.data.budgets[key].todaypay + "")
      this.data.totalspent.push(this.data.currencyTypeSignal[this.data.budgets[key]['currency']] + " " + this.data.budgets[key].totalpay + "")
    }
    this.setData({
      leftdata: this.data.leftdata
    })
    this.showData()
    //console.log(this.data.budgets)
  },
  showData: function() {
    var temp;
    if (this.data.leftplain && this.data.rightplain) temp = this.data.todayleft
    else if (!this.data.leftplain && this.data.rightplain) temp = this.data.todayspent
    else if (this.data.leftplain && !this.data.rightplain) temp = this.data.totalleft
    else if (!this.data.leftplain && !this.data.rightplain) temp = this.data.totalspent
    this.setData({
      rightdata: temp
    })
  },
  buttonTap: function(e) {
    var _this = this
    if (e.target.id == "left") {
      if (!this.data.leftplain) {
        this.setData({
          leftplain: !this.data.leftplain,
        })
        //更改显示的数据
        this.showData()
      }
    } else if (e.target.id == "spent") {
      if (this.data.leftplain) {
        this.setData({
          leftplain: !this.data.leftplain,
        })
        //更改显示的数据
        this.showData()
      }
    } else if (e.target.id == "today") {
      if (!this.data.rightplain) {
        this.setData({
          rightplain: !this.data.rightplain,
        })
        //更改显示的数据
        this.showData()
      }
    } else if (e.target.id == "total") {
      if (this.data.rightplain) {
        this.setData({
          rightplain: !this.data.rightplain,
        })
        //更改显示的数据
        this.showData()
      }
    } else if (e.target.id == "newBudget") {
      wx.navigateTo({
        url: '../newBudget/newBudget'
      })
    } else if (e.target.id == "deleteBudget") {
      //删除此预算
      wx.showModal({
        title: '提示',
        content: '仅删除其历史，不进行历史回滚',
        success(res) {
          if (res.confirm) {
            _this.deleteBudget(e.target.dataset.name)
          }
        }
      })
    } else if (e.target.id == "editBudget") {
      wx.navigateTo({
        url: './editBudget/editBudget?name=' + e.target.dataset.name,
      })
    }
  },

  deleteBudget: function(e) {
    var _this = this
    util.httpsGet("db/deleteBudget?openid=" + app.globalData.openid + "&budgetid=" + _this.data.budgets[e].id).then((res) => {
      if (res.data) {
        delete app.globalData.userData[e];
        wx.showModal({
          title: '提示',
          content: '删除成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              if (_this.data.leftdata.length == 1) {
                app.globalData.registered = false
                wx.reLaunch({
                  url: '../main/main',
                })
              } else {
                wx.reLaunch({
                  url: '../main/main',
                })
                app.globalData.refreshdata = true;
              }
            }
          }
        })
      }
    });
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