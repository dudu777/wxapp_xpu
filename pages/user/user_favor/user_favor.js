// pages/user/user_favor/user_favor.js
var base = require("../../../utils/base.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [


    ],
    isUserPublish: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    base.postRq('/getTradeById', { openID: app.globalData.userKey.openid }).then(function (res) {
      console.log('我的收藏列表', res)
      that.setData({
        goodsList: res.data.data
      })
    })

  },
  nav_detail(e) {
    let data = JSON.stringify(e.currentTarget.dataset.list)

    wx.navigateTo({
      url: '/pages/goods/good_detail/good_detail?data=' + data,
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

  }
})