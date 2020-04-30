Page({
  data: {
  },
  onLoad: function () {
  },
  //跳转楼层
  ToFloor1: function(e) {
    wx.navigateTo({
      url: '../menu_zhuyuan/zhuyuan_Floor1/zhuyuan_Floor1'
    })
    console.log('用户进入一楼界面')
  },
  ToFloor2: function(e) {
    wx.navigateTo({
      url: '../menu_zhuyuan/zhuyuan_Floor2/zhuyuan_Floor2'
    })
    console.log('用户进入二楼界面')
  },
  ToFloor3: function(e) {
    wx.navigateTo({
      url: '../menu_zhuyuan/zhuyuan_Floor3/zhuyuan_Floor3'
    })
    console.log('用户进入三楼界面')
  },
})