Page({
  data: {
   menu:[]
  },
  onLoad: function () {
    this.getData();
  },
  getData:function(){
    var that = this;
    wx.request({
      url: 'https://flxdu.cn/api/db?sql=SELECT * FROM menu order by id limit 4,7',//请求地址
      header:{
        "Content-Type": "applciation/json"
      },
      method:'GET',
      success:function(res){
        console.log(res.data)
        that.setData({
          menu:res.data
        })
      },
      fail:function(err){

      }
    })
  }
})