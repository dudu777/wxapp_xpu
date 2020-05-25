// pages/feedback/feedback.js
var base = require("../../utils/base.js")
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sub_success: false,
    user_id: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user_id: wx.getStorageSync('user').user_id
    })

  },
  formSubmit(e) {
    console.log(e)
    wx.showLoading({
      title: '提交中',
    })
    let that = this
    let form = e.detail.value
    form["user_id"] = this.data.user_id
    form['create_time'] = util.dateToString(new Date())
    console.log(form)
    base.postRq('/feedback', form).then(function(res) {
      console.log('意见反馈返回', res)
      wx.hideLoading()
      that.setData({
        sub_success: true
      })
      setTimeout(function() {
        wx.navigateBack({

        })
      }, 1500)

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