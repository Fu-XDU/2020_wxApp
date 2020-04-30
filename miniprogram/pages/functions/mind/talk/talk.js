const app = getApp()
const util = require('../../../../utils/util.js')
Page({
  data: {
    all_info:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新
    util.httpsGet("/api/db?sql=select * from Mind_Reserve_Info").then((res) => {
      console.log(res.data),
      this.setData({
        all_info:res.data
      })
    })
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
    // console.log("触底啦~")
    // let page=this.data.page+20;
    // Mind_Reserve_InfoCollection.skip(page).get().then(res=>{
    //   let new_data=res.data
    //   let old_data=this.data.Mind_Reserve_Info
    //   this.setData({
    //     Mind_Reserve_Info:old_data.concat(new_data),
    //     page:page
    //   },res=>{
    //     console.log(res);
    //   }
    //   )
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
