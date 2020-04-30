Page({
  data: {
  },
  onLoad: function () {
  },
  //跳转楼层
  ToFloor1: function(e) {
    wx.navigateTo({
      url: '../menu_haitang/haitang_Floor1/haitang_Floor1'
    })
    console.log('用户进入一楼界面')
  },
  ToFloor2: function(e) {
    wx.navigateTo({
      url: '../menu_haitang/haitang_Floor2/haitang_Floor2'
    })
    console.log('用户进入二楼界面')
  },
})