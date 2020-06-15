//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    data: undefined,
    currentDataName: null,
    currencyType: app.globalData.currencyType,
    historyType: app.globalData.historyType,
    dataType: app.globalData.dataType,
    dataKey: [],
    currentDataIndex: 0,
    showloading: true,
    historyArray: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function(options) {
    var _this = this;
    if (app.globalData.openid == "") {
      wx.cloud.callFunction({
        name: "login",
        data: {},
        success(res) {
          app.globalData.openid = res.result.openid.replace(/-/g, '_');
          _this.fetchData();
        },
        fail(err) {
          util.networkError();
        }
      })
    } else {
      _this.fetchData();
    }
  },
  onReady: function() {

  },
  fetchData: function() {
    new Promise((resolve, reject) => {
      util.httpsGet('ping').then((res) => {
        if (res.statusCode == 200) {
          //console.log("服务器连接成功", res)
          /* 下面这句不要删 测试用 发布时必删 不删不能用 */
          //app.globalData.openid = "oSyGb5UnRscPC1eVlm32isfX__OY"
          /* 上面这句不要删 测试用 发布时必删 不删不能用 */
          util.httpsGet('db?sql=SHOW TABLES LIKE "' + app.globalData.openid + '"').then((res) => {
            app.globalData.registered = res.data.length != 0
            if (app.globalData.registered) {
              util.httpsGet('db?sql=select * from ' + app.globalData.openid).then((res) => {
                app.globalData.userData = {}
                //将远程数据存入本地全局变量
                if (res.data == "数据库连接失败！") {
                  console.error(res.data)
                  util.networkError();
                }
                for (var i = 0; i < res.data.length; ++i) {
                  app.globalData.userData[res.data[i].name] = res.data[i]
                  app.globalData.userData[res.data[i].name].history = []
                }
                util.httpsGet('db?sql=select * from ' + app.globalData.openid + 'history').then((res) => {
                  //获取本用户所有预算历史并将其放入合适的预算中
                  for (var i = 0; i < res.data.length; ++i) {
                    app.globalData.userData[res.data[i].name].history.push(res.data[i])
                    if (res.data[i].peer != null)
                      app.globalData.userData[res.data[i].peer].history.push(res.data[i])
                  }
                  resolve();
                  //console.log(app.globalData.userData)
                }).catch((err) => {
                  console.error(err)
                  util.networkError();
                })
              })
            } else app.globalData.userData = app.globalData.unregisteredData
          }).catch((err) => {
            console.error(err)
            util.networkError(err);
          })
        } else {
          console.error(err)
          util.networkError(err);
        }
      }).catch((err) => {
        console.error("服务器连接失败", err)
        util.networkError(err);
      })
    }).then((res) => {
      if (app.globalData.registered) {
        this.data.dataKey = []
        for (var key in app.globalData.userData)
          this.data.dataKey.push(key)
        this.setData({
          data: app.globalData.userData,
          currentDataName: this.data.dataKey[this.data.currentDataIndex],
        })
      } else if (app.globalData.registered == false) {
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
      } else if (app.globalData.registered == null) {
        console.error("出错了")
      }
      var temp = this.data.data[app.globalData.userData[this.data.dataKey[this.data.currentDataIndex]].name].history.length;
      for (var i = 0; i < (temp <= 4 ? temp : 4); i++)
        this.data.historyArray.push(i)
      this.setData({
        historyArray: this.data.historyArray
      })
    })
  },
  sideBudget: function(e) {
    if (e.target.id == "next") {
      if (this.data.currentDataIndex == this.data.dataKey.length - 1) {
        wx.showToast({
          title: '没有下个一个预算了',
          icon: 'none',
          duration: 500
        })
      } else {
        this.data.historyArray = []
        var temp = this.data.data[app.globalData.userData[this.data.dataKey[this.data.currentDataIndex + 1]].name].history.length;
        for (var i = 0; i < (temp <= 4 ? temp : 4); i++)
          this.data.historyArray.push(i)
        this.setData({
          currentDataName: app.globalData.userData[this.data.dataKey[++this.data.currentDataIndex]].name,
          historyArray: this.data.historyArray
        })
      }
    } else if (e.target.id == "previous") {
      if (this.data.currentDataIndex == 0) {
        wx.showToast({
          title: '没有上个一个预算了',
          icon: 'none',
          duration: 500
        })
      } else {
        this.data.historyArray = []
        var temp = this.data.data[app.globalData.userData[this.data.dataKey[this.data.currentDataIndex - 1]].name].history.length;
        for (var i = 0; i < (temp <= 4 ? temp : 4); i++)
          this.data.historyArray.push(i)
        this.setData({
          currentDataName: app.globalData.userData[this.data.dataKey[--this.data.currentDataIndex]].name,
          historyArray: this.data.historyArray
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
      this.onLoad()
      app.globalData.refreshdata = false;
    }
  },
})