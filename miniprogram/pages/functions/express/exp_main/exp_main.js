// miniprogram/pages/functions/express/exp_main/exp_main.js
const app=getApp();
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCourier:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
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
  //检查是不是快递员Courier
    util.httpsGet("/api/db?sql=select 1 from Exp_Couriers where openid = '" + app.globalData.openid +"' limit 1").then((res)=>{
      this.data.isCourier=res.data.length;
      /*if (res.data.length)
        console.log("是快递员")
      else console.log("不是快递员")*/
    }).catch((err)=>{})
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

  },
  toOrder: function() {
    wx.navigateTo({
      url: '../exp_order/exp_order'
    })
    //console.log('进入快递下单界面')
  },
  toReceipt: function () {
    var realurl = this.data.isCourier ? '../exp_receipt/exp_receipt' : '../exp_courier_need_apply/exp_courier_need_apply';
    wx.navigateTo({
      url: realurl
    })
  }
})