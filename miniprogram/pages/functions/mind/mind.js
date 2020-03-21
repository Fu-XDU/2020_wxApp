const DB = wx.cloud.database().collection("Mind_Reserve_Info")
Page({
  
  data: {
    array: ['请选择专业','计算机科学与技术', '软件工程', '物联网'],
    objectArray: [
      {
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
    isOK:false,
    // 信息是否输入完整（能否预约）
    can_reserve:false,
    // 学号姓名
    accountValue:"",
    nameValue:"",
    questionValue:"",
    items:[]
  },
  submit:function(e){
    console.log(e)
  },
  // 判断学号是否输入有误
  handleaccountinput:function(e){
    let accountValue = e.detail.value;
    this.setData({
      accountValue:accountValue,
      isOK: accountValue.length === 11,
      //判断能否正常预约
      can_reserve:this.data.accountValue.length === 11 && this.data.nameValue.length>0 && this.data.questionValue.length>0
    })
  },

  handlenameinput:function(e){
    let nameValue=e.detail.value;
    this.setData({
      // 更改姓名初始值
      nameValue:nameValue,
      //判断能否正常预约
      can_reserve:nameValue.length >0 && this.data.isOK && this.data.questionValue.length>0
    })
  },
  
  handle_Question_input:function(e){
    let questionValue=e.detail.value;
    this.setData({
      // 更改初始值
      questionValue:questionValue,
      //判断能否正常预约
      can_reserve:this.data.nameValue.length >0 && this.data.isOK && questionValue.length>0
    })
  },
  // 预约时选择专业
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
  ToTalk(){
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
  Talk:function(e){
    wx.navigateTo({
      url: '../mind/talk/talk'
    })
    console.log('用户进入论坛页面')
  },
  
  reserved_to_talk: function(e) {
    wx.navigateTo({
      url: '../mind/talk/talk'
    }),
     //预约
    DB.add({
      data:{
        accountValue:this.data.accountValue,
        nameValue:this.data.nameValue,
        questionValue:this.data.questionValue
      },
    success(res){
      console.log("suc",res)
    },
    fail(res){
      console.log("fail",res)
    }
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      
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