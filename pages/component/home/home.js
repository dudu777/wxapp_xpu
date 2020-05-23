var app = getApp();
var base = require("../../../utils/base.js")
var util = require('../../../utils/util.js');
Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Home'
    }
  },

  /* 组件的初始数据 */
  data: {
    CustomBar: app.globalData.CustomBar,
    tabList: [ "报失", "拾遗", "闲置"], // 菜单列表
    categoryList: [], //闲置商品列表
    dataList: [], // 数据列表
    TabCur: 1, // 当前菜单id
    curCate: '全部',// 当前闲置菜单
    loading: false ,// 加载动画
    ColorList: ['red','orange','yellow','olive', 'green','cyan','blue','purple','mauve','pink','brown', 'grey','gray','black', ], //颜色数组
  

  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function(e) {
    },
    moved: function() {

    },
    detached: function() {

    },
  },

  /* 组件的方法列表 */
  methods: {
    // 选择菜单
    tabSelect(e) {
      let tab_id = e.currentTarget.dataset.id
      this.setData({
        TabCur: tab_id,
        dataList: [],
      })
      if (tab_id == 2) { // 报失
        // 获取闲置商品类别
        this.getCategoryList()
      } else { // 拾遗
        // 根据类型获取 0 报失 1拾遗 物品
        this.getGleaningByType(tab_id)
      }
    },
    // 选择闲置分类
    cateSele(e){
      this.setData({
        dataList:[],
        loading:true,
        curCate:e.currentTarget.dataset.cate
      })
      // 根据类别获取闲置物品
      this.getGoodByCate()

    },
    // 根据类型获取 0 报失 1拾遗 物品
    getGleaningByType(tab_id){
      let that = this
      that.setData({
        loading: true
      })
      let para = {
        type: tab_id
      }
      base.getRq('/gleaning',para).then(function (res) {
        console.log('获取报失/拾遗物品', res)
        let data = res.data.data
        that.setData({
          dataList: that.deal_ResData(data) ,// 处理图片和日期 
          loading: false
        })

      })
    },
   
    // 获取闲置商品类别
    getCategoryList() {
      let that = this
      base.getRq('/category').then(function(res) {
        //console.log('获取类别', res)
        that.setData({
          categoryList: res.data.data
        })
        // 获取所有商品
        that.getAllGood()
      })
    },
    // 获取所有商品
    getAllGood(){
      let that = this
      that.setData({
        loading: true,
        curCate:"全部"
      })
      base.getRq('/good').then(function (res) {
        console.log('获取所有闲置物品', res)
        let data = res.data.data

        that.setData({
          dataList: that.deal_ResData(data), // 处理图片 将字符串转化为数组
          loading:false
        })

      })
    },
    // 将图片字符串转化为数组 将日期字符串格式化输出
    deal_ResData(data){
      for (let i = 0; i < data.length; i++) {
        let dateStr = data[i].create_time
        data[i].create_time = util.dateStrFormat(dateStr)
        if (data[i].image) {
          data[i].image = data[i].image.split("*")
        }
      }
      return data
    },
    
    
    // 根据类别获取闲置物品
    getGoodByCate() {
      let that = this
      base.getRq('/good/'+that.data.curCate).then(function (res) {
        //console.log('根据分类获取闲置物品', res)
        let data = res.data.data
        that.setData({
          dataList: that.deal_ResData(data), // 处理图片 将字符串转化为数组
          loading: false
        })
      })
     

    },
   
    navToDetail(e) {
      var list = e.currentTarget.dataset.list
      if (this.data.tab_id == 2  && list.tag){
        list = list.tag.split('*')
      }
      
      list['tab_id'] = this.data.TabCur
      wx.navigateTo({
        url: '/pages/good_detail/detail?data=' + JSON.stringify(list),
      })
    }
  },




})