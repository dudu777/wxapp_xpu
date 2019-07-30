// pages/user/user_auth/info/info.js
var app = getApp();
var base = require("../../../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    academy: '',
    date: '',
    name: '',
    stuClass: '',
    stuID: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    base.postRq('/getAuth', {
      openID: app.globalData.userKey.openid,
    }).then(function(res) {
      console.log(res)
      that.setData({
        imgUrl: res.data.data.stuCard,
        academy: res.data.data.academy,
        date: res.data.data.date,
        name: res.data.data.name,
        stuClass: res.data.data.stuClass,
        stuID: res.data.data.stuID
      })
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