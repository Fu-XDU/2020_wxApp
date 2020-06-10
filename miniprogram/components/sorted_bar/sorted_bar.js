// components/sorted_bar/sorted_bar.js
Component({
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
    handleTap:function(e){
      // console.log(e.currentTarget.id)
      let cid=e.currentTarget.id
      this.setData({
        current_index:cid
      })
      //触发一个自定义事件，并把数据传出去
      this.triggerEvent("selectChange",{current_index:cid},{})
    },
    setCurrentIdx:function(index){
      this.setData({
        current_index:index
      })
    }
  }
})
