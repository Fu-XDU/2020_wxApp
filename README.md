# 微信小程序，名字待定

appid: "wxbae8c6ab08f04022"

## 目录详解

+ cloudfunctions 云函数文件目录，部署在云端

+ miniprogram 小程序文件目录

   + app.js 定义小程序全局函数和全局变量

   + app.json 小程序全局配置文件

   + app.wxss 小程序全局样式文件

   + images 图片存放目录

   + pages 页面文件目录

      + functions 四大功能文件目录

         + car 拼车页面

         + express 快递代取页面

         + menu 菜单页面

         + mind 心理咨询页面

      + logs 日志页面

      + sitemap.json  配置小程序及其页面是否允许被微信索引，用不到

   + style 样式文件定义，用不到

   + utils 中间件定义，用不到

+ project.config.json 小程序项目总配置

+ README.md 部分说明   

## 开发说明

+ 规范变量名，遵从[骆驼命名法](https://blog.csdn.net/jerry11112/article/details/84985026)，不可用拼音

+ 写出必要注释,如

  ```javascript
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  		//函数内部必要也写注释
    }
  ```


+menu