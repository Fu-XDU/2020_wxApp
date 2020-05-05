//app.js
const util = require("./utils/util.js")
App({
  onLaunch: function() {
    const _this = this;
    wx.cloud.init({
      env: 'flg-xdu'
    })
    new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "login",
        data: {},
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    }).then((res) => {
      //console.log("用户登录成功", res)
      _this.globalData.openid = res.result.openid
      //处理openid,我服了
      _this.globalData.openid=_this.globalData.openid.replace(/-/g, '_');
      util.httpsGet('ping').then((res) => {
        if (res.statusCode == 200) {
          //console.log("服务器连接成功", res)
          /* 下面这句不要删 测试用 发布时必删 不删不能用 */
          //_this.globalData.openid = "oSyGb5UnRscPC1eVlm32isfX__OY"
          /* 上面这句不要删 测试用 发布时必删 不删不能用 */
          util.httpsGet('db?sql=SHOW TABLES LIKE "' + _this.globalData.openid + '"').then((res) => {
            _this.globalData.registered = res.data.length != 0
            if (_this.globalData.registered) {
              util.httpsGet('db?sql=select * from ' + _this.globalData.openid).then((res) => {
                _this.globalData.userData = {}
                //将远程数据存入本地全局变量
                for (var i = 0; i < res.data.length; ++i) {
                  _this.globalData.userData[res.data[i].name] = res.data[i]
                  _this.globalData.userData[res.data[i].name].history = []
                }
                this.tableCallback(_this.globalData.registered);
                util.httpsGet('db?sql=select * from ' + _this.globalData.openid + 'history').then((res) => {
                  //获取本用户所有预算历史并将其放入合适的预算中
                  for (var i = 0; i < res.data.length; ++i) {
                    _this.globalData.userData[res.data[i].name].history.push(res.data[i])
                    if (res.data[i].peer != null)
                      _this.globalData.userData[res.data[i].peer].history.push(res.data[i])
                  }
                  //console.log(_this.globalData.userData)
                }).catch((err) => {
                  console.error(err)
                  util.networkError();
                })
              })
            } else {
              _this.globalData.userData = _this.globalData.unregisteredData
              this.tableCallback(_this.globalData.registered);
            }
          }).catch((err) => {
            console.error(err)
            util.networkError(err);
            this.tableCallback(null);
          })
        } else {
          console.error(err)
          util.networkError(err);
          this.tableCallback(null);
        }
      }).catch((err) => {
        console.error("服务器连接失败", err)
        util.networkError(err);
        this.tableCallback(null);
      })
    }).catch((err) => {
      console.error("用户登录失败", err)
      util.networkError(err);
      this.tableCallback(null);
    })
  },
  globalData: {
    userInfo: null,
    apiUrl: 'https://flxdu.cn/api/',
    openid: "",
    registered: null,
    dataType: ["每月", "每周", "一次性"],
    historyType: ["收入", "支出"],
    currencyType: ["RMB"],
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