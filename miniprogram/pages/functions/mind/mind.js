const app = getApp()
Page({

  data: {
    array: ['请选择专业', '计算机科学与技术', '软件工程', '物联网'],
    objectArray: [{
        id: 0,
        name: '请选择专业'
      },
      {
        id: 1,
        name: '计算机科学与技术'
      },
      {
        id: 2,
        name: '软件工程'
      },
      {
        id: 3,
        name: '物联网'
      },
    ],
    index: 0,
    // 学号是否输入正确
    isOK: false,
    // 信息是否输入完整（能否预约）
    can_reserve: false,
    // 学号姓名
    accountValue: "",
    nameValue: "",
    questionValue: "",
    major: ""
  },
  // 判断学号是否输入有误
  handleaccountinput: function(e) {
    this.data.accountValue = e.detail.value
    this.setData({
      isOK : e.detail.value.length === 11
    })
    this.checkCanReserve();
  },

  handlenameinput: function(e) {
    // 更改姓名初始值
    this.data.nameValue = e.detail.value
    this.checkCanReserve();
  },

  handle_Question_input: function(e) {
    // 更改初始值
    this.data.questionValue = e.detail.value
    this.checkCanReserve();
  },
  //检查是否可以预约
  checkCanReserve: function() {
    if (this.data.isOK && !!this.data.nameValue && !!this.data.questionValue && !!this.data.index) {
      if (!this.data.can_reserve) {
        this.setData({
          can_reserve: !this.data.can_reserve
        })
      }
    } else {
      if (this.data.can_reserve) {
        this.setData({
          can_reserve: !this.data.can_reserve
        })
      }
    }
  },
  // 预约时选择专业
  bindPickerChange: function(e) {
    // console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      major: this.data.array[e.detail.value]
    })
    this.checkCanReserve();
    // console.log(this.data.array[this.data.index])
  },
  ToHome: function(e) {
    wx.navigateTo({
      url: '../mind/mind'
    })
    console.log('用户进入首页')
  },

  ToMy: function(e) {
    wx.navigateTo({
      url: '../mind/my/my'
    })
    console.log('用户进入我的界面')
  },
  ToTalk() {
    wx.navigateTo({
      url: '../mind/talk/talk',
    })
  },
  introductions: function(e) {
    wx.navigateTo({
      url: '../mind/introductions/introductions'
    })
    console.log('用户进入分类模块界面')
  },
  guide: function(e) {
    wx.navigateTo({
      url: '../mind/guide/guide'
    })
    console.log('用户进入咨询指南界面')
  },
  Talk: function(e) {
    wx.navigateTo({
      url: '../mind/talk/talk'
    })
    console.log('用户进入论坛页面')
  },

  submit: function(e) {
    console.log(e.detail.value)
    console.log('INSERT INTO Mind_Reserve_Info(openid,stu_id,name,major,problem)VALUES("oSyGb5UnRscPC1eVlm32isfX-_OY","' + e.detail.value.accountValue + '","' + e.detail.value.nameValue + '","' + e.detail.value.pickerValue + '","' + e.detail.value.questionValue + '")')
    wx.request({
      url: app.globalData.apiUrl + '/api/db',
      data: {
        sql: 'INSERT INTO Mind_Reserve_Info(openid,stu_id,name,major,problem)VALUES("oSyGb5UnRscPC1eVlm32isfX-_OY","' + e.detail.value.accountValue + '","' + e.detail.value.nameValue + '","' + e.detail.value.pickerValue + '","' + e.detail.value.questionValue + '")'
      },
      success(res) {
        console.log(res);
        if (res.data == '1') {
          wx.showToast({
            title: '提交成功！！！', //这里打印出登录成功  
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '提交失败！！！',
            icon: 'none',
            duration: 1500,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.request({
    //   url: app.globalData.apiUrl + '/api/db',
    //   data: { sql:"DROP TABLE Mind_Reserve_Info"},
    // data: { 
    //   sql:"CREATE TABLE Mind_Reserve_Info(Stu_id varchar(15),name varchar(20),major varchar(10),problem varchar(50))"
    // },
    // success(res) {
    //   if (res.data == '1')
    //     // console.log('suc')
    //     console.log('Create successfully', app.globalData.apiUrl + '/api/db', res.statusCode, res.data)
    //   else console.log(res.data);
    // }
    //  })
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