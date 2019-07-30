// pages/publish/publish.js
var app = getApp()
var base = require("../../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo: [],
    imglist: [],
    isWatch: true,
    isCopy: false,
    favorStatus: 0,
    favor: true,
    loading:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
wx.showLoading({
  title: '加载中',
})
    console.log(typeof JSON.parse(options.data).img)
    var that = this
    
      that.setData({
        
        goodInfo: JSON.parse(options.data),
        
        imglist: JSON.parse(options.data).img.split(",")

      })

    
    base.postRq('/getUserfavor', {
      openID: app.globalData.userKey.openid
    }).then(function(res) {
      wx.hideLoading()
      console.log('我的收藏列表', res)
      for (let i = 0; i < res.data.data.length; i++) {
        if (res.data.data[i].goodID == that.data.goodInfo.goodID) {
          console.log(res.data.data[i],'在里面')
          that.setData({
            favorStatus: 1,
            favor: false,

          })
         
        }
      }
    })
  },

  getContact() {
    console.log("点击")
    if (this.data.goodInfo.isWatch == 1) { // 联系方式仅校友查看
    console.log('仅校友')
    //判断是否认证
      if (wx.getStorageSync("auth") == 0) { // 未认证
      console.log('未认证')
        wx.showModal({
          content: '卖家将联系方式设置为仅校友查看',
          cancelText: '取消',
          confirmText: '去认证',
          success: res => {
            wx.navigateTo({
              url: "/pages/user/user_auth/user_auth",
            })
          }
        })
      }else{
        console.log("已认证")
        this.setData({
          isWatch: false,
          isCopy: true
        })
      }
    }else{
      console.log('都可以查看')
      this.setData({
        isWatch: false,
        isCopy: true
      })
    }
  
  },
  CopyContact(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.contact,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  share: function() {
    console.log('分享')
    this.onShareAppMessage();
  },
  shareImg: function() {
    console.log('生成图片')
  },

  favor: function() {
    let that = this
    if (app.globalData.userInfo) {
      console.log('denglu ')
      base.postRq('/favor', {
        openID: app.globalData.userKey.openid,
        goodID: this.data.goodInfo.goodID,
        favorTime: new Date(),
        type: that.data.favorStatus
      }).then(function(res) {
        console.log(res.data)
        if (that.data.favorStatus == 0) {
          wx.showToast({
            title: '收藏成功',
            duration: 1000
          })
          that.setData({
            favorStatus: 1,
            favor: false,
          })
        } else {
          wx.showToast({
            title: '取消收藏',
            duration: 1000
          })
          that.setData({
            favorStatus: 0,
            favor: true
          })
        }
      })
    } else {
      console.log('meidenlu ')
      wx.showModal({
        title: '提示',
        content: '登录之后，才可享用此功能！',
        confirmText: '去登陆',
        success: function(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })


    }


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
    return {
      title:'11',
      path
    }

  }
})