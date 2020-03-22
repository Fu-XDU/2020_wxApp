//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: app.globalData.apiUrl + '/api/ping',
      data: {},
      success(res) {
        if (res.statusCode == 200)
          console.log('Get', app.globalData.apiUrl + '/api/ping', res.statusCode, res.data)
      }
    })
    wx.request({
      url: app.globalData.apiUrl + '/api/db',
      data: { sql:"SELECT * FROM book"},
      success(res) {
        if (res.statusCode == 200)
          console.log('Get', app.globalData.apiUrl + '/api/ping', res.statusCode, res.data)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

  },
  ToCar: function(e) {
    wx.navigateTo({
      url: '../functions/car/car'
    })
    console.log('用户进入拼车界面')
  },
  ToMind: function(e) {
    wx.navigateTo({
      url: '../functions/mind/mind'
    })
    console.log('用户进入心理咨询界面')
  },
  ToMenu: function(e) {
    wx.navigateTo({
      url: '../functions/menu/menu'
    })
    console.log('用户进入菜单界面')
  },
  ToBaoguo: function(e) {
    wx.navigateTo({
      url: '../functions/express/express'
    })
    console.log('用户进入快递取件界面')
  },
})
