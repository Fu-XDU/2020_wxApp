// pages/functions/express/exp_order/exp_order.js
var util = require('../../../../utils/util.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //下单有四种状态:0已下单，1已接单，2已完成，3已取消
    name: "",
    phone: "",
    dormitory_index: 0,
    dormitory: "海棠1",
    dormitoryid: "",
    dormitories_list: ['海棠1', '海棠2', '海棠3', '海棠4', '海棠5', '海棠6', '海棠7', '海棠8', '海棠9', '海棠10', '海棠11', '海棠12', '海棠13', '海棠14', '海棠15', '海棠16'],
    size_index: 0,
    size_list: ['超小件', '普通件', '大件'],
    size: "超小件",
    delivery_station: "",
    delivery_code: "",
    weight_index: 0,
    weight: "<2kg",
    weight_list: ['<2kg', '2-5kg', '>5kg'],
    remarks: "",
    state: "0",
    order_time: "",
    order_number: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*
    this.data.size = this.data.size_list[this.data.size_index]
    this.data.dormitory = this.data.dormitories_list[this.data.dormitory_index]
    this.data.weight = this.data.weight_list[this.data.weight_index]
     */
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
  check_form: function() {
    var _this = this
    return new Promise((resolve, reject) => {
      if (!!!_this.data.name || !!!_this.data.phone || !!!_this.data.delivery_station || !!!_this.data.delivery_code) {
        wx.showModal({
          title: '提示',
          content: '内容未填写完整',
          showCancel: false
        })
        //TODO:可以对手机号进行检验
        reject();
      }
      else {
        resolve();
      }
    })
  },
  //提交表单
  handle_submit_Button: function() {
    var _this = this
    this.check_form().then((res)=>{
      if (!!!app.globalData.openid) {
        console.log("提交时无openid，尝试登录")
        new Promise((resolve, reject) => {
          util.login().then((res) => {
            console.log("用户登录成功", res)
            app.globalData.openid = res.result.openid
            resolve(res)
          }).catch((err) => {
            console.error("用户登录失败", err)
            util.networkError();
            reject(err)
          })
        }).then((res) => {
          this.submit_form();
        })
      } else this.submit_form();
    })
  },
  submit_form: function() {
    var _this = this
    //获取当前网络时间
    util.getHttpTime().then((res) => {
      _this.data.order_time = res
      //生成订单号
      this.getOrderNumber().then((res) => {
        util.httpsGet("/api/db?sql=INSERT INTO Exp_Orders(name, phone, dormitory, dormitoryid, delivery_station, delivery_code, size, weight, remarks, state, order_time, order_number, openid)VALUES(\"" + this.data.name + '","' + this.data.phone + '","' + this.data.dormitory + '","' +
          this.data.dormitoryid + '","' + this.data.delivery_station + '","' + this.data.delivery_code + '","' + this.data.size + '","' + this.data.weight + '","' + this.data.remarks + '","' + this.data.state + '","' + this.data.order_time + '","' + this.data.order_number + '","' + app.globalData.openid + '")').then((res) => {
          console.log("订单提交成功", res)
            wx.redirectTo({
            url: '../exp_orderSuccess/exp_orderSuccess'
          })
        }).catch((err) => {
          console.error("订单提交失败", err)
          util.networkError();
        })
      })
    }).catch((err) => {
      console.error("获取网络时间失败", err)
      util.networkError();
    })
  },
  //获取订单号
  getOrderNumber: function() {
    return new Promise((resolve, reject) => {
      var orderNumber = this.getHashCode(this.data.name + this.data.delivery_code + this.data.order_time + Math.ceil(Math.random() * 10) + "", true) + "";
      if (orderNumber.length == 10) {
        this.data.order_number = orderNumber;
        resolve(this.data.order_number);
      } else if (orderNumber.length > 10) {
        this.data.order_number = orderNumber.substring(0, 10);
        resolve(this.data.order_number);
      } else if (orderNumber.length < 10) {
        this.data.order_number = (orderNumber + this.getHashCode(Math.ceil(Math.random() * 10) + "", true)).substring(0, 10);
        resolve(this.data.order_number);
      }
    })
  },
  /**
   * 获取字符串的哈希值
   * @param {String} str
   * @param {Boolean} caseSensitive 是否区分大小写
   * @return {Number} hashCode
   */
  getHashCode: function(str, caseSensitive) {
    if (!caseSensitive) {
      str = str.toLowerCase();
    }
    // 1315423911=b'1001110011001111100011010100111'
    var hash = 1315423911,
      i, ch;
    for (i = str.length - 1; i >= 0; i--) {
      ch = str.charCodeAt(i);
      hash ^= ((hash << 5) + ch + (hash >> 2));
    }
    return (hash & 0x7FFFFFFF);
  },
  //处理姓名输入失去焦点事件
  handle_name_input: function(e) {
    this.data.name = e.detail.value
  },
  //处理电话输入失去焦点事件
  handle_phone_input: function(e) {
    this.data.phone = e.detail.value
  },
  //处理宿舍号输入失去焦点事件
  handle_dormitoryid_input: function(e) {
    this.data.dormitoryid = e.detail.value
  },
  //处理快递站点输入失去焦点事件
  handle_delivery_station_input: function(e) {
    this.data.delivery_station = e.detail.value
  },
  //处理取件码输入失去焦点事件
  handle_delivery_code_input: function(e) {
    this.data.delivery_code = e.detail.value
  },
  //处理备注输入失去焦点事件
  handle_remarks_input: function(e) {
    this.data.remarks = e.detail.value
  },
  //处理宿舍楼选择器事件
  bindDormitoriesPickerChange: function(e) {
    var _this = this;
    this.setData({
      dormitory_index: e.detail.value,
      dormitory: _this.data.dormitories_list[_this.data.dormitory_index]
    })
  },
  //处理大小选择器事件
  bindSizePickerChange: function(e) {
    var _this = this;
    this.setData({
      size_index: e.detail.value,
      size: _this.data.size_list[_this.data.size_index]
    })
  },
  //处理重量选择器事件
  bindWeightPickerChange: function(e) {
    var _this = this;
    this.setData({
      weight_index: e.detail.value,
      weight: _this.data.weight_list[_this.data.weight_index]
    })
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