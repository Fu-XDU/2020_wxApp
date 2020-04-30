Page({
  data: {
  },
  onLoad: function () {
  },
  //跳转楼层
  ToFloor1: function(e) {
    wx.navigateTo({
      url: '../menu_dingxiang/dingxiang_Floor1/dingxiang_Floor1'
    })
    console.log('用户进入一楼界面')
  },
  ToFloor2: function(e) {
    wx.navigateTo({
      url: '../menu_dingxiang/dingxiang_Floor2/dingxiang_Floor2'
    })
    console.log('用户进入二楼界面')
  },
  ToFloor3: function(e) {
    wx.navigateTo({
      url: '../menu_dingxiang/dingxiang_Floor3/dingxiang_Floor3'
    })
    console.log('用户进入三楼界面')
  },
  
})