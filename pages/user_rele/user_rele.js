// pages/user_rele/user_rele.js
var base = require("../../utils/base.js")
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curType: '', // 当前数据列表类型
    dataList: [], // 闲置数据
    glnList: [], //报失。拾遗数据
    ColorList: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve', 'pink', 'brown', 'grey', 'gray', 'black', ], //颜色数组
    typeList: [{
      type: 0,
      name: '报失'
    }, {
      type: 1,
      name: '拾遗'
    }, {
      type: 2,
      name: '闲置'
    }],
    dataList: [{
      good_name: '11111',
    }],
    user_id: null,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      curType: options.type,
      user_id: wx.getStorageSync('user').user_id,
      loading: true
    })
    if (this.data.curType == 2) {
      // 查询闲置数据
      this.getGoodList()
    }else{
      // 查询报失数
      this.getGlnList()
    }
  },
  // 将图片字符串转化为数组 将日期字符串格式化输出
  deal_ResData(data) {
    for (let i = 0; i < data.length; i++) {
      let dateStr = data[i].create_time
      data[i].create_time = util.dateStrFormat(dateStr)
      if (data[i].image) {
        data[i].image = data[i].image.split("*")
      }
    }
    return data
  },
  // 选择查询类型
  updateCurType(e) {
    this.setData({
      dataList:[],
      curType: e.currentTarget.dataset.type,
      loading:true
    })
    if (this.data.curType == 2) {
      // 查询闲置数据
      this.getGoodList()
    } else {
      // 查询报失数
      this.getGlnList()
    }
  },
  // 取消发布闲置
  cancelGood(e) {
    let that = this
    let good_id = e.currentTarget.dataset.goodid
    wx.showModal({
      title: '提示',
      content: '是否取消发布此闲置物品？',
      confirmText: '确认',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            loading: true
          })
          that.updateGoodStatu(good_id,0)
        } else if (res.cancel) {
        }
      }
    })
  },
  // 重新发布闲置
  releaseGood(e) {
    let that = this
    let good_id = e.currentTarget.dataset.goodid
    wx.showModal({
      title: '提示',
      content: '是否发布此闲置物品？',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            loading: true
          })
          that.updateGoodStatu(good_id,1)
        } else if (res.cancel) {
        }
      }
    })
  },
  // 修改商品状态接口
  updateGoodStatu(good_id,statu){
    let that = this
    base.putRq('/goodstatu/' + good_id, { status:statu}).then(res => {
      that.getGoodList()
    })
  },
  // 查询闲置数据
  getGoodList() {
    var that = this
    base.getRq('/goodlist/' + that.data.user_id).then(res => {
     // console.log('闲置数据列表', res)
      let data = res.data.data
      that.setData({
        loading: false,
        dataList: that.deal_ResData(data)
      })
    })

  },
  // 查询报失 拾遗数据
  getGlnList() {
    var that = this
    base.getRq('/glnlist/' + that.data.user_id).then(res => {
     
     // console.log('报失数据列表', res)
      let data = res.data.data
      that.setData({
        loading: false,
        dataList: that.deal_ResData(data)
      })
    })
  },
  // 取消发布失物
  cancelGln(e) {
    let that = this
    let gln_id = e.currentTarget.dataset.glnid
    wx.showModal({
      title: '提示',
      content: '是否取消发布物品？',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            loading: true
          })
          that.updateGlnStatu(gln_id, 0)
        } else if (res.cancel) {
        }
      }
    })
  },
  // 重新发布失物
  releaseGln(e) {
    let that = this
    let gln_id = e.currentTarget.dataset.glnid
    wx.showModal({
      title: '提示',
      content: '是否发布此物品？',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            loading: true
          })
          that.updateGlnStatu(gln_id, 1)
        } else if (res.cancel) {
        }
      }
    })
  },
  // 修改失物状态接口
  updateGlnStatu(gln_id, statu) {
    let that = this
    base.putRq('/glnstatu/' + gln_id, { status: statu }).then(res => {
      that.getGlnList()
    })
  },
  // 跳转到商品详情
  navToDetail(e) {
    var list = e.currentTarget.dataset.data
    if (this.data.curType == 2 && list.tag) {
      list = list.tag.split('*')
    }
    list['tab_id'] = this.data.curType
    wx.navigateTo({
      url: '/pages/user_rele/detail?data=' + JSON.stringify(list),
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})