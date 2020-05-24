// pages/user_rele/detail.js
var base = require("../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_id: 0,// 0报失 1拾遗 2闲置
    goodInfo: {
    },
    glnInfo: {},
    imgHeight: [], //所有图片的高度  
    imgwidth: 750,//图片宽度
    current: 0,// 轮播图当前播放的id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list = JSON.parse(options.data)
    this.setData({
      tab_id: list.tab_id
    })
    if (this.data.tab_id == 2) {
      this.setData({
        goodInfo: JSON.parse(options.data)
      })

    } else {
      this.setData({
        glnInfo: JSON.parse(options.data)
      })
    }

  },
  // 图片预加载
  imageLoad: function (e) {
    //获取图片真实宽度   
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比       
      ratio = imgwidth / imgheight;
    //计算的高度值    
    var viewHeight = 750 / ratio;
    var imgHeight = this.data.imgHeight;
    //把每一张图片的对应的高度记录到数组里    
    imgHeight[e.target.dataset.id] = viewHeight;
    this.setData({
      imgHeight
    })
  },
  // 轮播图滚动监听
  swp_bindchange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 取消发布闲置
  cancelGood(e) {
    let that = this
    let good_id = e.currentTarget.dataset.goodid
    wx.showModal({
      title: '提示',
      content: '是否取消发布此闲置物品？',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            loading: true
          })
          that.updateGoodStatu(good_id, 0)
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
          that.updateGoodStatu(good_id, 1)
        } else if (res.cancel) {
        }
      }
    })
  },
  // 修改商品状态接口
  updateGoodStatu(good_id, statu) {
    let that = this
    base.putRq('/goodstatu/' + good_id, { status: statu }).then(res => {
    wx.showToast({
      title: '操作成功',
      icon:'success'
    })
    wx.navigateTo({
      url: '/pages/user_rele/user_rele?type=2',
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
      wx.showToast({
        title: '操作成功',
        icon: 'success'
      })
      wx.navigateTo({
        url: '/pages/user_rele/user_rele?type='+that.data.tab_id,
      })
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '生活帮',
      desc: '为西安工程大学校友提供生活便利！',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})