// miniprogram/pages/myBudgets/myBudgets.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    budgets: null,
    leftplain: true,
    rightplain: true,
    leftdata: [],
    rightdata: [],
    todayleft: [],
    totalleft: [],
    todayspent: [],
    totalspent: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.budgets = app.globalData.userData
    for (var key in this.data.budgets) {
      this.data.leftdata.push(key)
      this.data.todayleft.push(this.data.budgets[key].todayleft)
      this.data.totalleft.push(this.data.budgets[key].balance)
      this.data.todayspent.push(1234)
      this.data.totalspent.push(this.data.budgets[key].total - this.data.budgets[key].balance)
    }
    this.setData({
      leftdata: this.data.leftdata
    })
    this.showData()
    //console.log(this.data.budgets)
  },
  showData: function () {
    var temp;
    if (this.data.leftplain && this.data.rightplain) temp = this.data.todayleft
    else if (!this.data.leftplain && this.data.rightplain) temp = this.data.todayspent
    else if (this.data.leftplain && !this.data.rightplain) temp = this.data.totalleft
    else if (!this.data.leftplain && !this.data.rightplain) temp = this.data.totalspent
    this.setData({
      rightdata: temp
    })
  },
  newBudget: function () {
    wx.navigateTo({
      url: '../newBudget/newBudget'
    })
  },
  buttonTap: function (e) {
    if (e.target.id == "left") {
      if (!this.data.leftplain) {
        this.setData({
          leftplain: !this.data.leftplain,
        })
        //更改显示的数据
      }
    } else if (e.target.id == "spent") {
      if (this.data.leftplain) {
        this.setData({
          leftplain: !this.data.leftplain,
        })
        //更改显示的数据
      }
    } else if (e.target.id == "today") {
      if (!this.data.rightplain) {
        this.setData({
          rightplain: !this.data.rightplain,
        })
        //更改显示的数据
      }
    } else if (e.target.id == "total") {
      if (this.data.rightplain) {
        this.setData({
          rightplain: !this.data.rightplain,
        })
        //更改显示的数据
      }
    }
    this.showData()
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