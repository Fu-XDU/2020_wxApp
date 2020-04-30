// miniprogram/pages/functions/menu/menu-.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  ToZhuyuan: function(e) {
    wx.navigateTo({
      url: '../menu/menu_zhuyuan/menu_zhuyaun'
    })
    console.log('用户进入竹园界面')
  },
  ToHaitang: function(e) {
    wx.navigateTo({
      url: '../menu/menu_haitang/menu_haitang'
    })
    console.log('用户进入海棠界面')
  },
  ToDingxiang: function(e) {
    wx.navigateTo({
      url: '../menu/menu_dingxiang/menu_dingxiang'
    })
    console.log('用户进入丁香界面')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})