//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    data: undefined,
    currentDataName: null,
    currencyType : app.globalData.currencyType,
    historyType : app.globalData.historyType,
    dataType : app.globalData.dataType,
    dataKey: [],
    currentDataIndex: 0,
    showloading: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    return new Promise((resolve, reject) => {
      app.tableCallback = registered => {
        if (registered) {
          this.data.dataKey = []
          for (var key in app.globalData.userData)
            this.data.dataKey.push(key)
          this.setData({
            data: app.globalData.userData,
            currentDataName: this.data.dataKey[this.data.currentDataIndex]
          })
          resolve()
        } else if (registered == false) {
          //console.warn("用户未注册")
          for (var key in app.globalData.userData) {
            this.data.dataKey.push(key)
            // 计算剩余天数
            app.globalData.userData[key].remaindays = 10
            //计算今日剩余
            app.globalData.userData[key].todayLeft = 5
          }
          this.setData({
            data: app.globalData.userData,
            currentDataName: this.data.dataKey[this.data.currentDataIndex]
          })
          resolve()
        } else if (registered == null) {
          console.error("出错了")
          resolve()
        }
      }
    })
  },
  onReady: function() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    app.onLaunch();
    this.onLoad().then((res) => {
      wx.hideLoading()
    });
  },
  sideBudget: function(e) {
    if (e.target.id == "next") {
      if (this.data.currentDataIndex == this.data.dataKey.length - 1) {
        console.log("没有下个一个预算了")
      } else {
        this.setData({
          currentDataName: app.globalData.userData[this.data.dataKey[++this.data.currentDataIndex]].name
        })
      }
    } else if (e.target.id == "previous") {
      if (this.data.currentDataIndex == 0) {
        console.log("没有上个一个预算了")
      } else {
        this.setData({
          currentDataName: app.globalData.userData[this.data.dataKey[--this.data.currentDataIndex]].name
        })
      }
    }
  },
  navigate: function(e) {
    if (app.globalData.registered == false) {
      wx.showModal({
        title: '没有预算',
        content: '前往添加我的第一个预算',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '../newBudget/newBudget'
            })
          }
        }
      })
    } else {
      var url = null,
        navigate = true
      if (e.target.id == "myBudgets")
        url = '../myBudgets/myBudgets'
      else if (e.target.id == "income")
        url = "../income/income?name=" + this.data.currentDataName
      else if (e.target.id == "expenditure")
        url = "../expenditure/expenditure?name=" + this.data.currentDataName
      else if (e.target.id == "transaction") {
        if (this.data.dataKey.length < 2) {
          navigate = false;
          wx.showModal({
            title: '无法转账',
            content: '你至少需要2个预算来创建一个转账',
            showCancel: false
          })
        } else url = "../transaction/transaction?name=" + this.data.currentDataName
      } else if (e.target.id == "history")
        url = '../history/history?name=' + this.data.currentDataName
      if (navigate)
        wx.navigateTo({
          url: url
        })
    }
  },
  onShow: function() {
    //TODO:监听是否有删除或修改操作
    if (app.globalData.refreshdata) {
      console.log("refresh")
      app.onLaunch();
      this.onLoad()
      app.globalData.refreshdata = false;
    }
  },
})