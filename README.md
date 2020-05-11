# 记账类微信小程序

名称：（待定）

appid: "wxbae8c6ab08f04022"

## 目录详解

+ cloudfunctions 云函数文件目录，部署在云端
+ miniprogram 小程序文件目录

   + app.js 定义小程序全局函数和全局变量

   + app.json 小程序全局配置文件

   + app.wxss 小程序全局样式文件

   + images 图片存放目录

   + pages 页面文件目录

      + functions 没用
+ myBudgets 我的所有预算
  + newBudget 新建预算
   + newBudgetSucceed 新建预算成功
      + income 收入添加
+ expenditure 支出添加
  +  transaction 转账添加
+ history 历史记录
  + logs 日志页面
+ sitemap.json  配置小程序及其页面是否允许被微信索引，用不到
+ style 样式文件定义，用不到
+ utils 中间件定义，用不到
+ project.config.json 小程序项目总配置
+ README.md 说明   

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