const DB = wx.cloud.database()
const Mind_Reserve_InfoCollection=DB.collection("Mind_Reserve_Info")
Page({
  data: {
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    Mind_Reserve_InfoCollection.get().then(res=>{
      this.setData({
        Mind_Reserve_Info:res.data
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
    Mind_Reserve_InfoCollection.get().then(res=>{
      this.setData({
        Mind_Reserve_Info:res.data
      },res=>{
        console.log("数据更新完成")
        wx.stopPullDownRefresh()
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("触底啦~")
    let page=this.data.page+20;
    Mind_Reserve_InfoCollection.skip(page).get().then(res=>{
      let new_data=res.data
      let old_data=this.data.Mind_Reserve_Info
      this.setData({
        Mind_Reserve_Info:old_data.concat(new_data),
        page:page
      },res=>{
        console.log(res);
      }
      )
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
