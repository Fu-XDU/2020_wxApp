// miniprogram/pages/functions/express/exp_receipt/exp_receipt.js
const util = require('../../../../utils/util.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      tabs: ["新订单", "已接单", "已完成", "已取消"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0
    },
    orders: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    util.httpsGet("/api/db?sql=select * from Exp_Orders where state='0';").then((res) => {
      //console.log(res.data);
      this.setData({
        orders: res.data
      })
    }).catch((err) => {})
  },

  detail: function(a) {
    var id = a.currentTarget.dataset.id;
    //console.log(t)
    wx.navigateTo({
      url: "../exp_receipt_order_detail/exp_receipt_order_detail?id=" + id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //console.log("下拉刷新")
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})