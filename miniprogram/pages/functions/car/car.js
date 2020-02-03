// pages/car/car.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  
  ToCar: function(e) {
    wx.navigateTo({
      url: '../car/car'
    })
    console.log('用户进入拼车界面')
  },
  ToSet: function(e) {
    wx.navigateTo({
      url: '../car/set/set'
    })
    console.log('用户进入发布界面')
  },
  ToMine: function(e) {
    wx.navigateTo({
      url: '../car/mine/mine'
    })
    console.log('用户进入我的界面')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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