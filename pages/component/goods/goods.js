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
    scrollLeft: 0,
    loading: true,
    none_warn: true
  
  },
  
  /* 组件声明周期函数 */
  lifetimes: {
    attached: function (e) {
     var that = this
     that.setData({
       loading: false
     })
      base.getRq('/getTaglist').then(function (res) {
        
        that.setData({
          tabList: res.data.data
        })
      
      })
      that.getGoodsList(1);
   
    },
    moved: function () { 

    },
    detached: function () { 

    },
  },
  
  /* 组件的方法列表 */
  methods: {
  
    getGoodsList:function(page){
      var that = this
      console.log(page)
      base.getRq('/getGoodsBytype', {
        type: that.data.type,
        page: page
      }).then(function (res) {
        console.log(res.data)
        that.setData({
          loading: true
        })
        if (res.data.data.rows.length > 0) {
          console.log('you 返回数据')
          that.setData({
            goodsList:
              that.data.goodsList.concat(res.data.data.rows)
          })
          that.data.goodsList.push(res.data.data.rows)
          console.log('/getGoodsBytype商品列表', res.data.data)
         
        } else { 
          console.log('无返回数据 returnfalse')
          that.setData({
            none_warn: false
          })

          return true    
         
        }
      })

    },
    tabSelect(e) {
      var that = this
      console.log(e)
      
      that.setData({
        loading: false,
        none_warn: true,
          goodsList:[],
        TabCur: e.currentTarget.dataset.typeobj.id,
        type: e.currentTarget.dataset.typeobj.type,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
      base.getRq('/getGoodsBytype', {
        type: that.data.type,
        page: 1
      }).then(function (res) {

        that.setData({
          loading: false
        })
        if (res.data.data.rows.length > 0) {
          setTimeout(function () {
            that.setData({
              loading: true,
              goodsList:
                that.data.goodsList.concat(res.data.data.rows)
            })
          }, 1000)
          
          
        } else {
          console.log('无返回数据')
          setTimeout(function () {
            that.setData({
              goodsList: [],
              loading: true,
              none_warn: false
            })
          }, 1000)
          
        }
      })
      
    },
    nav_detail(e){
      console.log(e)
      let data = JSON.stringify(e.currentTarget.dataset.list)
      wx.navigateTo({
        url: '/pages/goods/good_detail/good_detail?data='+data,
      })
    }
  },

  

  
})