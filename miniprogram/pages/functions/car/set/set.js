// const DB = wx.cloud.database()
// const Car_Launch_InfoCollection=DB.collection("Car_Launch_Info")
const util = require('../../../../utils/util.js')
const app = getApp()
var days = [];
var hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
var minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
Page({
  getPhoneNumber(e) {
    console.log(e)
  },
  data: {
    gender: '',
    // 出发地
    start: '',
    // 目的地
    end: '',
    time: '',
    user_name: '',
    tips: '',
    multiArray: [],
    multiIndex: [],
    choose_year: '',
    //判断输入人数是否正确
    isOK: false,
    people_num: "",
    //判断约车能否成功
    can_reserve: false,
  },

  submit: function(e) {
    util.httpsGet("/api/db?sql=" + 'INSERT INTO Car_Launch_Info(openid,start,end,time,user_name,sex,tel,people_num,tips)VALUES("' + app.globalData.openid + '","' + e.detail.value.start + '","' + e.detail.value.end + '","' + e.detail.value.time + '","' + e.detail.value.user_name + '","' + e.detail.value.sex + '","' + e.detail.value.tel + '","' + e.detail.value.people_num + '","' + e.detail.value.tips + '")').then((res) => {
      console.log(res)
      if (res.data == '1') {
        wx.showToast({
          title: '提交成功！！！', //这里打印出登录成功  
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '/pages/functions/car/car'
        })
      }
      else{
        util.networkError();
      }
    }).catch((err)=>{
      console.log(err)
      util.networkError();
    })
  },
  handle_people_num: function(e) {
    let people_num = e.detail.value
    this.setData({
      people_num: e.detail.value,
      isOK: people_num >= 1
    })
  },
  //选择性别
  handleChange: function(e) {
    // console.log(e)
    let gender = e.detail.value;

    this.setData({
      gender: gender,
      can_reserve: (this.data.start && this.data.end && gender) != ''
    })
  },
  handle_user_name: function(e) {
    // console.log(e)
    this.setData({
      user_name: e.detail.value
    })
  },
  handle_tips: function(e) {
    // console.log(e)
    this.setData({
      tips: e.detail.value
    })
  },
  getLocation: function() {
    var _this = this;
    wx.chooseLocation({
      success: function(res) {
        var start = res.name
        var end = res.end
        _this.setData({
          start: start,
          can_reserve: (start && _this.data.end && _this.data.gender) != ''
        })
      }
    })
  },
  getLocation1: function() {
    var _this = this;
    wx.chooseLocation({
      success: function(res) {
        var start = res.name
        var end = res.end
        _this.setData({
          end: start,
          can_reserve: (_this.data.start && end && _this.data.gender) != ''
        })
      }
    })
  },
  /*
   * 获取下一天时间
   */
  getNextDate: function(date, day) {　　
    var date = new Date(date);
    date.setDate(date.getDate() + day);
    var m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var week = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];　　
    return m + '月' + d + '日 周' + week;
  },
  /*
   * 获取数据存入日期选择器中
   */
  getDate: function() {
    var date = new Date();
    var add = (date.getHours() == 23 && date.getMinutes() >= 55) ? 1 : 0
    //获取接下来3天日期
    for (var i = add; i < add + 3; ++i)
      days.push(this.getNextDate(new Date(), i))
    this.setData({
      multiArray: [days, hours, minutes],
      multiIndex: [0, date.getMinutes() >= 55 ? (date.getHours() + 1) % 24 : date.getHours(), (5 + date.getMinutes() - date.getMinutes() % 5) / 5]
    })
  },
  /*
   * 处理日期选择器确定
   */
  bindMultiPickerChange: function(e) {
    var _this = this;
    if (e.detail.value[0] == 0) {
      util.getHttpTime("HH:mm").then((res) => {
        var httpstime = res.split(":");
        httpstime = parseInt(httpstime[0]) * 100 + parseInt(httpstime[1])
        console.log(httpstime);
        var chosentime = parseInt(hours[e.detail.value[1]]) * 100 + parseInt(minutes[e.detail.value[2]])
        console.log(chosentime)
        if (httpstime >= chosentime) {
          //不可设置过去的时间
          wx.showToast({
            title: '不可设置过去的时间！',
            icon: 'none',
            duration: 1000 //持续的时间
          })
        } else {
          _this.setData({
            time: days[e.detail.value[0]] + ' ' + hours[e.detail.value[1]] + ':' + minutes[e.detail.value[2]]
          })
          console.log('用户选择出发时间:', _this.data.time)
        }
      })
    }
    else{
      _this.setData({
        time: days[e.detail.value[0]] + ' ' + hours[e.detail.value[1]] + ':' + minutes[e.detail.value[2]]
      })
      console.log('用户选择出发时间:', _this.data.time)
    }
    
  },
  onLoad: function() {
    this.getDate(); //触发获取日期选择器数据
  }
})