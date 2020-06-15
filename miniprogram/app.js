//app.js
const util = require("./utils/util.js")
App({
  onLaunch: function() {
    const _this = this;
    wx.cloud.init({
      env: 'flg-xdu'
    })
  },
  globalData: {
    userInfo: null,
    apiUrl: 'https://flxdu.cn/api/',
    openid: "",
    registered: null,
    dataType: ["每月", "每周", "一次性"],
    historyType: ["收入", "支出"],
    currencyType: ["RMB","USD"],
    currencyTypeSignal: ["¥", "$"],
    remarks: ['手动输入', '书籍和杂志', '衣服', '化妆品', '偿还债务', '饮料和小吃', '外出就餐', '娱乐', '食品', '燃油', '一般', '礼物', '假期！', '家庭用品', '儿童', '药物', '音乐', '房租', '购物', '体育运动', '交通', '公共设施账单'],
    //如果用户没注册 就用这个
    unregisteredData: {
      "未注册": {
        "name": "未注册",
        "balance": 10,
        "total": 100,
        "dataType": 0,
        "currency": 0,
        "beginTime": "", //预算设置时的开始时间
        "endTime": "", //如果是一次性，会有结束时间。每月和每周和工资单自动计算，不存入数据库。
        "todayLeft": 0,
        "history": [],
        "rollover": 0,
        "remaindays": 10,
        "todayleft": 20,
        "totalpay": 10,
        "todaypay": 10
      }
    },
    userData: {},
    refreshdata:false
  }
})