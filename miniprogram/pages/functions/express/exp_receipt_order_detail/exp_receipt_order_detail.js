// miniprogram/pages/functions/express/exp_receipt_order_detail/exp_receipt_order_detail.js
const util = require('../../../../utils/util.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      tabs: ["新订单", "已接单", "已完成", "已取消"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0
    },
    receipt_time: null,
    id: null,
    order: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.id = options.id;
    util.httpsGet("/api/db?sql=select * from Exp_Orders where id='" + this.data.id + "'" + " limit 1").then((res) => {
      //console.log(res.data[0]);
      this.setData({
        order: res.data[0]
      })
    }).catch((err) => { util.networkError();})
  },
  call: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.order.phone
    });
  },
  receiveOrder: function() {
    var _this = this
    wx.showModal({
      content: "确认接单?",
      confirmColor: "#f66",
      success: function(res) {
        //console.log("用户点击确认接单");
        if (!!!app.globalData.openid) {
          //console.log("提交时无openid，尝试登录")
          new Promise((resolve, reject) => {
            util.login().then((res) => {
              //console.log("用户登录成功", res)
              app.globalData.openid = res.result.openid
              resolve(res)
            }).catch((err) => {
              //console.error("用户登录失败", err)
              util.networkError();
              reject(err)
            })
          }).then((res) => {
            _this.submitForm();
          })
        } else _this.submitForm();
      }
    });
  },
  submitForm: function() {
    var _this = this
    //不准接自己的单
    if (this.data.order.openid == app.globalData.openid) {
      wx.showModal({
        title: '接单失败',
        content: '不能接自己的单哦',
        showCancel: false,
      })
      return;
    }
    //获取当前网络时间
    util.getHttpTime("yyyy-MM-dd HH:mm:ss").then((res) => {
      _this.data.receipt_time = res;
      util.httpsGet("/api/db?sql=update Exp_Orders set state='1',receipt_time='" + _this.data.receipt_time + "',receipt_openid='" + app.globalData.openid + "' where state='0' and id='" + this.data.id + "'").then((res) => {
        if (res.data == "1") {
          //console.log("接单成功");
          wx.showModal({
            title: '接单成功',
            content: '请在当天完成本单哦',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          //console.log("接单失败");
          wx.showModal({
            title: '接单失败',
            content: '本单已经被别人接走啦',
            showCancel: false,
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }).catch((err) => {
        //console.log("接单请求失败");
        util.networkError();
        console.error(err);
      })
    }).catch((err) => {
      //console.log("时间请求失败");
      util.networkError();
      console.error(err);
    })
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