// miniprogram/pages/functions/express/exp_courier_need_apply/exp_courier_need_apply.js
const app = getApp();
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  toApply: function() {
    //检查是否已申请快递员
    util.httpsGet("/api/db?sql=select 1 from Exp_Courier_Apply where openid = '" + app.globalData.openid + "' limit 1").then((res) => {
      if (res.data.length) {
        //console.log("正在申请快递员")
        wx.showModal({
          title: '正在审核',
          content: '我们正在审核，请勿重复申请',
          showCancel: false
        })
      } else {
        //console.log("未申请快递员")
        wx.navigateTo({
          url: '../exp_courier_apply/exp_courier_apply'
        })
        //console.log('进入快递员申请界面')
      }
    }).catch((err) => {
      util.networkError
    })
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

  }
})