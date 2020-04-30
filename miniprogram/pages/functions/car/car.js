const app = getApp()
const util = require('../../../utils/util.js')
Page({
  data: {
    code:"",
    all_info:[]
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
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新
    util.httpsGet("/api/db?sql=select * from Car_Launch_Info").then((res) => {
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
    // var that=this;
    // wx.request({
    //   url: 'https://flxdu.cn/api/db?sql=SELECT * FROM book',//服务器地址
    //   method:"GET",
    //   data:{},//有参数需传给后台需在这里定义
    //   header:{//设置请求的header
    //     'content-type':'aplication/json'
    //   },
    //   success:function(res){
    //     console.log(res.data)
    //     // that.setData({
    //     //   postList:res.data,
    //     // })
    //   }
    // })
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
    // Car_Launch_InfoCollection.get().then(res=>{
    //   this.setData({
    //     Car_Launch_Info:res.data
    //   },res=>{
    //     console.log("数据更新完成")
    //     wx.stopPullDownRefresh()
    //   })
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("触底啦~")
    // let page=this.data.page+20;
    // Car_Launch_InfoCollection.skip(page).get().then(res=>{
    //   let new_data=res.data
    //   let old_data=this.data.Car_Launch_Info
    //   this.setData({
    //     Car_Launch_Info:old_data.concat(new_data),
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