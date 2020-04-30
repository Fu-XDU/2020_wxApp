// miniprogram/pages/functions/express/exp_courier_apply/exp_courier_apply.js
const util = require('../../../../utils/util.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    school: '西安电子科技大学',
    school_index: 0,
    schools_list: ['西安电子科技大学'],
    sex_index: 0,
    sex_list: ['男', '女'],
    sex: '男',
    phone: '',
    QQ: '',
    grade: '2019级',
    grade_index: 0,
    grade_list: ['2019级', '2018级', '2017级', '2016级'],
    college: '',
    major: '',
    remarks: '',
    apply_number: '',
    applytime: '',
  },
  //提交表单
  handle_submit_Button: function() {
    var _this = this
    this.check_form().then((res) => {
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
          this.submit_form();
        })
      } else this.submit_form();
    })
  },
  submit_form: function() {
    var _this = this
    //获取当前网络时间
    util.getHttpTime("yyyy-MM-dd HH:mm:ss").then((res) => {
      _this.data.applytime = res
      //生成申请单号
      this.getOrderNumber().then((res) => {
        util.httpsGet("/api/db?sql=INSERT INTO Exp_Courier_Apply(name, phone, school, sex, QQ, grade, college, major, remarks, applytime, applynumber, openid)VALUES(\"" + this.data.name + '","' + this.data.phone + '","' + this.data.school + '","' +
          this.data.sex + '","' + this.data.QQ + '","' + this.data.grade + '","' + this.data.college + '","' + this.data.major + '","' + this.data.remarks + '","' + this.data.applytime + '","' + this.data.apply_number + '","' + app.globalData.openid + '")').then((res) => {
          if (res.data == '1') {
            //console.log("申请提交成功", res)
            wx.reLaunch({
              url: '../exp_courier_apply_success/exp_courier_apply_success'
            })
          }
          else{
            //console.error("申请提交失败", res)
            wx.showModal({
              title: '申请提交失败',
              content: '出现未知错误',
              showCancel: false
            })
          }
        }).catch((err) => {
          //console.error("申请提交失败", err)
          util.networkError();
        })
      })
    }).catch((err) => {
      //console.error("获取网络时间失败", err)
      util.networkError();
    })
  },
  //获取申请单号
  getOrderNumber: function() {
    return new Promise((resolve, reject) => {
      var orderNumber = this.getHashCode(this.data.name + this.data.delivery_code + this.data.applytime + Math.ceil(Math.random() * 10) + "", true) + "";
      if (orderNumber.length == 10) {
        this.data.apply_number = orderNumber;
        resolve(this.data.apply_number);
      } else if (orderNumber.length > 10) {
        this.data.apply_number = orderNumber.substring(0, 10);
        resolve(this.data.apply_number);
      } else if (orderNumber.length < 10) {
        this.data.apply_number = (orderNumber + this.getHashCode(Math.ceil(Math.random() * 10) + "", true)).substring(0, 10);
        resolve(this.data.apply_number);
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
  handle_name_input: function(e) {
    this.data.name = e.detail.value
  },
  handle_phone_input: function(e) {
    this.data.phone = e.detail.value
  },
  handle_QQ_input: function(e) {
    this.data.QQ = e.detail.value
  },
  handle_college_input: function(e) {
    this.data.college = e.detail.value
  },
  handle_major_input: function(e) {
    this.data.major = e.detail.value
  },
  handle_remarks_input: function(e) {
    this.data.remarks = e.detail.value
  },
  bindSchoolsPickerChange: function(e) {
    var _this = this;
    this.setData({
      school_index: e.detail.value,
      school: _this.data.schools_list[_this.data.school_index]
    })
  },
  bindSexPickerChange: function(e) {
    var _this = this;
    this.setData({
      sex_index: e.detail.value,
      sex: _this.data.sex_list[_this.data.sex_index]
    })
  },
  bindGradePickerChange: function(e) {
    var _this = this;
    this.setData({
      grade_index: e.detail.value,
      grade: _this.data.grade_list[_this.data.grade_index]
    })
  },
  check_form: function() {
    var _this = this
    return new Promise((resolve, reject) => {
      if (!!!_this.data.name || !!!_this.data.phone || !!!_this.data.school || !!!_this.data.QQ || !!!_this.data.college || !!!_this.data.major || !!!_this.data.remarks) {
        wx.showModal({
          title: '提示',
          content: '内容未填写完整',
          showCancel: false
        })
        //TODO:可以对手机号进行检验
        reject();
      } else {
        resolve();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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