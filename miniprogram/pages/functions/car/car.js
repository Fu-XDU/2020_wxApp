const app = getApp()
Page({
  data: {
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
    // wx.request({
    //   url: app.globalData.apiUrl + '/api/db',
    //   // data: { sql:"DROP TABLE Car_Launch_Info"},
    //   data: { 
    //     sql:"CREATE TABLE Car_Launch_Info(start char(20),end char(20), time char(10),user_name char(20),sex char(5),tel int(5),people_num int,tips char(50))"
    //   },
    //   success(res) {
    //     if (res.data == '操作成功！')
    //       console.log('Create successfully', app.globalData.apiUrl + '/api/db', res.statusCode, res.data)
    //     else console.log(res.data);
    //   }
    //  })
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