// pages/user/user_auth/form/form.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var base = require("../../../../utils/base.js")
    base.postRq('/auth', {
      openID: '999',
      name: '杜萍萍',
      stuID: '41603030130',
      academy: '电信',
      stuClass: '通1',

      date:new Date()
    }).then(function (res) {
      console.log(res)
    })

  },
  submit(){
    var base = require("../../../../utils/base.js")
    base.postRq('/auth', {
      openid: '7777',
      name: '杜萍萍',
      stuID: '41603030130',
      academy: '电信',
      stuClass: '通1'
    }).then(function (res) {
      console.log(res)
      wx.setStorageSync(auth, 0)
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