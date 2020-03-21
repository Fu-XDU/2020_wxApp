// components/sorted_pane/sorted_pane.js
Component({
  options:{
    multipleSlots:true  //在组件定义时的选项中启用多slot支持
  },
  externalClasses:["title_cls"],
  /**
   * 组件的属性列表
   */
  properties: {
    titleItems:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current_index:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle_selectChange:function(e){
    let index=parseInt(e.detail.current_index)
    this.setData({
        current_index:index
      })
    },
    handle_change:function(e){
      console.log(e.detail.current)
      //1. 获取分段选择器组件对象本身
      let Bar=this.selectComponent("#sp-sb")
      //2. 调用对应的方法
      Bar.setCurrentIdx(e.detail.current)
    }
    
  }
})
