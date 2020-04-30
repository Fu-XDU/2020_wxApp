//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    data: undefined,
    dataType: ["每月", "每周", "一次性", "工资单"],
    historyType: ["收入", "支出"],
    currencyType: ["RMB"],
    currentDataName: null,
    dataKey: [],
    currentDataIndex: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    app.tableCallback = registered => {
      if (registered) {
        for (var key in app.globalData.userData)
          this.data.dataKey.push(key)
        this.setData({
          data: app.globalData.userData,
          currentDataName: app.globalData.userData[this.data.dataKey[this.data.currentDataIndex]].name
        })
      } else if (registered == false) {
        console.warn("用户未注册")
        for (var key in app.globalData.userData) {
          // 计算剩余天数
          app.globalData.userData[key].remaindays = 10
          //计算今日剩余
          app.globalData.userData[key].todayLeft = 5
        }
        this.setData({
          data: app.globalData.userData
        })
      } else if (registered == null) {
        console.log("出错了")
      }
    }
  },
  onReady: function() {
    app.onLaunch();
    this.onLoad();
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
    } else if (e.target.id == "previous"){
      if (this.data.currentDataIndex == 0) {
        console.log("没有上个一个预算了")
      } else {
        this.setData({
          currentDataName: app.globalData.userData[this.data.dataKey[--this.data.currentDataIndex]].name
        })
      }
    }
  },
  tomyBudgets: function(e) {
    wx.navigateTo({
      url: '../myBudgets/myBudgets'
    })
  },
  toIncome: function(e) {
    wx.navigateTo({
      url: "../income/income?name=" + this.data.currentDataName
    });
  },

})