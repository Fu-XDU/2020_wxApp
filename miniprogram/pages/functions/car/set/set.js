const DB = wx.cloud.database()
const Car_Launch_InfoCollection=DB.collection("Car_Launch_Info")
  const app = getApp() 
 const date = new Date();
  const years = [];
  const months = [];
  const days = [];
  const hours = [];
  const minutes = [];
  //获取年
  for (let i = 2020; i <= date.getFullYear() + 5; i++) {
    years.push("" + i);
  }
  //获取月份
  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    months.push("" + i);
  }
  //获取日期
  for (let i = 1; i <= 31; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    days.push("" + i);
  }
  //获取小时
  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    hours.push("" + i);
  }
  //获取分钟
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    minutes.push("" + i);
  }
Page({
  getPhoneNumber(e){
    console.log(e)
  },
  data:{
    gender:"",
    // 出发地
    start: '',
    // 目的地
    end:'',
    time: '',
    user_name:'',
    tips:"无备注！",
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: '',
    //判断输入人数是否正确
    isOK:false,
    //判断约车能否成功
    can_reserve:false,
  },
  handle_submit:function(e){
    console.log(e)
  },
  handle_people_num:function(e)
  {
    let people_num=e.detail.value
    this.setData({
      isOK:people_num>=1
    })
  },
  //选择性别
  handleChange:function(e){
    // console.log(e)
    let gender=e.detail.value;

    this.setData({
      gender:gender,
      can_reserve: (this.data.start && this.data.end && gender)!=''
    })
  },
  handle_user_name:function(e){
    // console.log(e)
    this.setData({
      user_name:e.detail.value
    })
  },
  handle_tips:function(e){
    // console.log(e)
    this.setData({
      tips:e.detail.value
    })
  },
  getLocation: function () {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var start = res.name
        var end = res.end
        _this.setData({
          start: start,
          can_reserve: (start && _this.data.end && _this.data.gender)!=''
        })
      }
    })
  },
  getLocation1: function () {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var start = res.name
        var end = res.end
        _this.setData({
          end:start,
          can_reserve: (_this.data.start && end && _this.data.gender)!=''
        })
      }
    })
  },
  reserved_to_car: function(e) {
    wx.navigateTo({
      url: '/pages/functions/car/car'
    })
    // console.log('用户进入拼车界面')
  },
    onLoad: function() {
      //设置默认的年份
      this.setData({
        choose_year: this.data.multiArray[0][0]
      })
    },
    //获取时间日期
    bindMultiPickerChange: function(e) {
      // console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        multiIndex: e.detail.value
      })
      const index = this.data.multiIndex;
      const year = this.data.multiArray[0][index[0]];
      const month = this.data.multiArray[1][index[1]];
      const day = this.data.multiArray[2][index[2]];
      const hour = this.data.multiArray[3][index[3]];
      const minute = this.data.multiArray[4][index[4]];
      // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
      this.setData({
        time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
      })
      // console.log(this.data.time);
    },
    //监听picker的滚动事件
    bindMultiPickerColumnChange: function(e) {
      //获取年份
      if (e.detail.column == 0) {
        let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
        console.log(choose_year);
        this.setData({
          choose_year
        })
      }
      //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
      if (e.detail.column == 1) {
        let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
        let temp = [];
        if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
          for (let i = 1; i <= 31; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
          for (let i = 1; i <= 30; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else if (num == 2) { //判断2月份天数
          let year = parseInt(this.data.choose_year);
          console.log(year);
          if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
            for (let i = 1; i <= 29; i++) {
              if (i < 10) {
                i = "0" + i;
              }
              temp.push("" + i);
            }
            this.setData({
              ['multiArray[2]']: temp
            });
          } else {
            for (let i = 1; i <= 28; i++) {
              if (i < 10) {
                i = "0" + i;
              }
              temp.push("" + i);
            }
            this.setData({
              ['multiArray[2]']: temp
            });
          }
        }
        console.log(this.data.multiArray[2]);
      }
      var data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;
      this.setData(data);
    },
    //发布约车
    addData:function(event){
      console.log(event)
      Car_Launch_InfoCollection.add({
      data:{
        // 出发地
        start: this.data.start,
        // 目的地
        end:this.data.end,
        user_name:this.data.user_name,
        time: this.data.time,
        gender:this.data.gender,
        tel:this.data.tel,
        people_num:this.data.people_num,
        tips:this.data.tips
        }, 
        success:res=>{
          console.log(res)
        }
     }),
     wx.navigateTo({
      url: '../car/car'
    })
     
    }
   
  
})
  
 