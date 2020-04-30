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

+ README.md 说明   

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
+ 每个页面的子页面都在相应子文件夹下建立页面文件夹

+ 使用版本管理功能进行协同

## 开发原则
+ 每个页面的字页面都在相应子文件夹下建立页面文件夹
+ 尝试使用版本管理功能进行协同

## 开发原则

+ 每人编写各自负责的页面，遇到BUG要及时求助不能死磕，数据库命名集合命名均以car_ express_等开头
+ 先按照目前最终敲定的样式做，做的过程中有需要改动的我们再讨论

+ 每人编写各自负责的页面，遇到BUG要及时求助不能死磕，数据库命名集合命名均以car_ express_等开头
+ 先按照目前最终敲定的样式做，做的过程中有需要改动的我们再讨论

## 微信开发者工具协同GitHub实现代码托管

1.注册GitHub账号，将用户名交给管理员。

2.在微信开发者工具-版本管理-设置-网络和认证-认证方式中选择“使用用户名和密码”，表单中填入你的GitHub用户名和密码。

3.在微信开发者工具-版本管理-设置-远程中点击“添加”，名称填写“2020小程序大赛”，URL填写https://github.com/Fu-XDU/2020_wxApp.git

4.点击版本管理页面左上角抓取，选择抓取全部。抓取完成之后在版本管理页面左侧远程一栏名为“2020小程序大赛”下可看到抓取到的所有远程分支。

5.远程分支中，”原始模版框架”为框架，是群文件中Program1.zip文件。以后我们所编写的代码都需要合并入名为"合并结果"的分支。

6.如果要使用原始模版框架进行开发，点击版本管理页面左上角拉取，拉取“2020小程序大赛/原始模版框架”，合并方式为“合并”，确定即可。

7.如果你的开发工具已经进行了一些开发，点击版本管理-工作区，先在本地选择你要推送到远程仓库的文件，然后点击左上角推送，要推送的分支为“master（当前HEAD）”，选择“推送到以下远程仓库分支”，仓库选择“合并结果”，推送即可。

### emoji 指南

| emoji                                   | emoji 代码                    | commit 说明           |
| :-------------------------------------- | :---------------------------- | :-------------------- |
| :tada: (庆祝)                           | `:tada:`                      | 初次提交              |
| :new: (全新)                            | `:new:`                       | 引入新功能            |
| :bookmark: (书签)                       | `:bookmark:`                  | 发行/版本标签         |
| :bug: (bug)                             | `:bug:`                       | 修复 bug              |
| :ambulance: (急救车)                    | `:ambulance:`                 | 重要补丁              |
| :globe_with_meridians: (地球)           | `:globe_with_meridians:`      | 国际化与本地化        |
| :lipstick: (口红)                       | `:lipstick:`                  | 更新 UI 和样式文件    |
| :clapper: (场记板)                      | `:clapper:`                   | 更新演示/示例         |
| :rotating_light: (警车灯)               | `:rotating_light:`            | 移除 linter 警告      |
| :wrench: (扳手)                         | `:wrench:`                    | 修改配置文件          |
| :heavy_plus_sign: (加号)                | `:heavy_plus_sign:`           | 增加一个依赖          |
| :heavy_minus_sign: (减号)               | `:heavy_minus_sign:`          | 减少一个依赖          |
| :arrow_up: (上升箭头)                   | `:arrow_up:`                  | 升级依赖              |
| :arrow_down: (下降箭头)                 | `:arrow_down:`                | 降级依赖              |
| :zap: (闪电)<br>:racehorse: (赛马)      | `:zap:`<br>`:racehorse:`      | 提升性能              |
| :chart_with_upwards_trend: (上升趋势图) | `:chart_with_upwards_trend:`  | 添加分析或跟踪代码    |
| :rocket: (火箭)                         | `:rocket:`                    | 部署功能              |
| :white_check_mark: (白色复选框)         | `:white_check_mark:`          | 增加测试              |
| :memo: (备忘录)<br>:book: (书)          | `:memo:`<br>`:book:`          | 撰写文档              |
| :hammer: (锤子)                         | `:hammer:`                    | 重大重构              |
| :art: (调色板)                          | `:art:`                       | 改进代码结构/代码格式 |
| :fire: (火焰)                           | `:fire:`                      | 移除代码或文件        |
| :pencil2: (铅笔)                        | `:pencil2:`                   | 修复 typo             |
| :construction: (施工)                   | `:construction:`              | 工作进行中            |
| :wastebasket: (垃圾桶)                  | `:wastebasket:`               | 废弃或删除            |
| :wheelchair: (轮椅)                     | `:wheelchair:`                | 可访问性              |
| :construction_worker: (工人)            | `:construction_worker:`       | 添加 CI 构建系统      |
| :green_heart: (绿心)                    | `:green_heart:`               | 修复 CI 构建问题      |
| :lock: (锁)                             | `:lock:`                      | 修复安全问题          |
| :whale: (鲸鱼)                          | `:whale:`                     | Docker 相关工作       |
| :apple: (苹果)                          | `:apple:`                     | 修复 macOS 下的问题   |
| :penguin: (企鹅)                        | `:penguin:`                   | 修复 Linux 下的问题   |
| :checkered_flag: (旗帜)                 | `:checkered_flag:`            | 修复 Windows 下的问题 |
| :twisted_rightwards_arrows: (交叉箭头)  | `:twisted_rightwards_arrows:` | 分支合并              |