var app = getApp();

Component({
  
  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Car'
    }
  },

  /* 组件的初始数据 */
  data: {
    tabList:[
      '最新发布','图书','生活小物'
    ],
      
    
    TabCur: 0,
    scrollLeft: 0
  },
  

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
   
    },
    moved: function () { 

    },
    detached: function () { 

    },
  },

  /* 组件的方法列表 */
  methods: {
    
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },
    nav_detail(e){
      wx.navigateTo({
        url: '/pages/goods/good_detail/good_detail',
      })
    }

  }
  
})