const DB = wx.cloud.database()
const Car_Launch_InfoCollection=DB.collection("Car_Launch_Info")
const app = getApp()
Page({
  getData(){
    let that=this
    wx.cloud.database().collection("Car_Launch_Info").get({
      success(res){
        console.log("请求成功",res),
        that.setData({
          items:res.data
        })
      },
      fail(res){
        console.log("请求失败",res)
      }
    })
  },
  data: {
    items:[
    ],
    page:0
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
    Car_Launch_InfoCollection.get().then(res=>{
      // console.log(res)
      this.setData({
        Car_Launch_Info:res.data
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
    Car_Launch_InfoCollection.get().then(res=>{
      this.setData({
        Car_Launch_Info:res.data
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
    Car_Launch_InfoCollection.skip(page).get().then(res=>{
      let new_data=res.data
      let old_data=this.data.Car_Launch_Info
      this.setData({
        Car_Launch_Info:old_data.concat(new_data),
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