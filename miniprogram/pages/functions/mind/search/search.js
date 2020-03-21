const DB = wx.cloud.database()
const Mind_Reserve_InfoCollection=DB.collection("Mind_Reserve_Info")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items:[]
  },
  handle_search:function(e){
    console.log(e.detail.value)
    // let search_input=e.detail.value,
    // for(let i=0;i<this.data.items.length;i++)
    // {
    //   if(search_input)
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Mind_Reserve_InfoCollection.get().then(res=>{
      console.log(res)
      this.setData({
        items:res
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})