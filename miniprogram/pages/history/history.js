// miniprogram/pages/history/history.js
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    budget:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      budget: app.globalData.userData[options.name],
    })
    //console.log(this.data.budget.history)
  },
  buttonTap:function(e){
    var _this = this
    if (e.target.id == "deleteHistory") {
      wx.showModal({
        title: '提示',
        content: '仅删除历史，不进行历史回滚',
        success(res) {
          if (res.confirm) {
            _this.delete1History(e.target.dataset.id)
          }
        }
      })
    }
  },
  delete1History: function (e) {
    var _this = this
    util.httpsGet("db/delete1History?openid=" + app.globalData.openid + "&historyid=" + e).then((res) => {
      if (res.data) {
        wx.showModal({
          title: '提示',
          content: '删除成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '../main/main'
              })
            }
          }
        })
      }
    });
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