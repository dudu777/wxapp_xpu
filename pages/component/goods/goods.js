var app = getApp();
var base = require("../../../utils/base.js")
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
    tabList:[],
    goodsList:[],
    isUserPublish:false,
    type:'图书',
    TabCur: 0,
    scrollLeft: 0
  },
  
  /* 组件声明周期函数 */
  lifetimes: {
    attached: function (e) {
     var that = this
      base.getRq('/getTaglist').then(function (res) {
        that.setData({
          tabList: res.data.data
        })
        base.getRq('/getGoodsBytype', {
          type: that.data.type,
        }).then(function (res) {
          if (res.data.data.length == 0) {
            console.log('无返回数据')
            that.setData({
              goodsList: null
            })
          } else {
            that.setData({
              goodsList: res.data.data,
            })
            console.log('/getGoodsBytype商品列表', res.data.data)
          }
        })
      })
   
    },
    moved: function () { 

    },
    detached: function () { 

    },
  },

  /* 组件的方法列表 */
  methods: {
    
    tabSelect(e) {
      var that = this
      that.setData({
        TabCur: e.currentTarget.dataset.typeobj.id,
        type: e.currentTarget.dataset.typeobj.type,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
      base.getRq('/getGoodsBytype', {
        type:that.data.type,
      }).then(function (res) {
        if (res.data.data.length ==0) {
          console.log('无返回数据')
          that.setData({
            goodsList: null
          })
        } else {
          console.log('/getGoodsBytype商品列表', res.data.data)
          that.setData({
          goodsList: res.data.data   
         })
        }
      })
    },
    nav_detail(e){
      let data = JSON.stringify(e.currentTarget.dataset.list)
      wx.navigateTo({
        url: '/pages/goods/good_detail/good_detail?data='+data,
      })
    }
  }
  
})