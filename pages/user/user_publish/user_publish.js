// pages/user/user_publish/user_publish.js
var base = require("../../../utils/base.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      
     
    ],
    isUserPublish:true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    base.postRq('/getPublishById', { openID: app.globalData.userKey.openid}).then(function (res) {
      console.log('我的发布列表', res)
      that.setData({
        goodsList: res.data.data
      })
      console.log(that.data.goodsList)
    })
  },
  nav_detail(e) {
    let data = JSON.stringify(e.currentTarget.dataset.list)

    wx.navigateTo({
      url: '/pages/goods/good_detail/good_detail?data=' + data,
    })
  },

  cancelPublish(e){
    var that = this
    console.log(e)
    base.postRq('/cancelPublish', {goodID:e.currentTarget.dataset.goodid, openID: app.globalData.userKey.openid }).then(function (res) {
      console.log( res)
     
      base.postRq('/getPublishById', { openID: app.globalData.userKey.openid }).then(function (res) {
        console.log('我的发布列表', res)
        that.setData({
          goodsList: res.data.data
        })
        console.log(that.data.goodsList)
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
    var that = this
    base.postRq('/getPublishById', { openID: app.globalData.userKey.openid }).then(function (res) {
      console.log('我的发布列表', res)
      that.setData({
        goodsList: res.data.data
      })
      console.log(that.data.goodsList)
    })

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

  }
})