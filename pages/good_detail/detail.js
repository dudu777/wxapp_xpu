// pages/good_detail/detail.js
var imageUtil = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_id:0,// 0报失 1拾遗 2闲置
    goodInfo: { 
    },
    glnInfo:{},
    modalName:'',// 卖家联系方式弹框
    is_copy:false,// 是否复制联系方式
    ColorList: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve', 'pink', 'brown', 'grey', 'gray', 'black',], //颜色数组
    imgHeight: [], //所有图片的高度  
    imgwidth: 750,//图片宽度
current: 0,// 轮播图当前播放的id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options)
let list = JSON.parse(options.data)
that.setData({
  tab_id: list.tab_id
})
    if(that.data.tab_id == 2){
      that.setData({
        goodInfo: JSON.parse(options.data)
      })

    }else{
      that.setData({
        glnInfo: JSON.parse(options.data)
      })
     

    }
  },
// 查看联系方式
  getContact(e) {
    if (this.data.goodInfo.is_public == 1) { // 联系方式仅校友查看
      //判断是否认证
      if (wx.getStorageSync("user").auth == 0) { // 未认证
        console.log('未认证')
        wx.showModal({
          content: '卖家将联系方式设置为仅校友查看',
          cancelText: '取消',
          confirmText: '去认证',
          success: res => {
            wx.navigateTo({
              url: "/pages/auth/auth",
            })
          }
        })
      } else {
        this.setData({
          modalName: 'contactModal',
        })
        wx.setClipboardData({
          data: e.currentTarget.dataset.contact,
          success: res => {
            this.setData({
              is_copy: true
            })
          }
        })
      }
    } else {
      this.setData({
        modalName: 'contactModal',
      })
      wx.setClipboardData({
        data: e.currentTarget.dataset.contact,
        success: res => {
         this.setData({
           is_copy : true
         })
        }
      })
    }

  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 图片预加载
  imageLoad: function(e) {
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
  swp_bindchange: function(e) {
    this.setData({
      current: e.detail.current
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