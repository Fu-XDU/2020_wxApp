//index.js
//获取应用实例
const app = getApp()
const util=require("../../utils/util.js")
Page({
  data: {
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {},
  onReady: function () {},
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
      url: '../functions/express/exp_main/exp_main'
    })
    console.log('用户进入快递取件界面')
  },
})