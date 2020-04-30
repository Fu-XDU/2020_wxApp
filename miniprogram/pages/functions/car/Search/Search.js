const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_input:"",
    search_result:[],
    search_suc:false,
    is_searched:false
  },

  handle_search_input:function(e){
    // console.log(e.detail.value)
    this.setData({
      search_input:e.detail.value
    })
  },

  submit:function(e){
    let _this=this;
    console.log(e.detail.value.search_input)
    console.log('select * from Car_Launch_Info where start="' + e.detail.value.search_input + '"')
    // console.log('select * from Car_Launch_Info where start="' + e.detail.value.search_input+ '"' + ' or end="' + e.detail.value.search_input + '"')
    wx.request({
      url: app.globalData.apiUrl + '/api/db',
      data:{
        sql: 'select * from Car_Launch_Info where start="' + e.detail.value.search_input+ '"'
      },
      // + ' or end="' + e.detail.value.search_input + '"'
      success(res){
        console.log(res.data),
        _this.setData({
          is_searched:true
        })
        if (res.data.length!=0)
        {
          _this.setData({
            search_suc:true,
            search_result:res.data
          }) 
        }
      }
    })
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