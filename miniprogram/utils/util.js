const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getHttpTime = fmt => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://flxdu.cn/api/' + 'time' + (!!fmt ? "?fmt=" + fmt : "stamp"),
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
const httpsGet = function(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://flxdu.cn/api/' + url,
      data: {},
      success: function(res) {
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
}
const networkError = function() {
  wx.showModal({
    title: '网络连接失败',
    content: '请检查网络设置',
    showCancel: false
  })
}
const login = function() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
        networkError;
      }
    })
  })
}
const toFix = function(value) {
  return value.toFixed(2) //保留两位小数
}

module.exports = {
  formatTime: formatTime,
  getHttpTime: getHttpTime,
  httpsGet: httpsGet,
  networkError: networkError,
  login: login,
  toFix: toFix,
}