// pages/publish/publish.js
var base = require("../../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    searchList: [],
    searchResult: false,
noResults:true,
loading: true



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  inputBlur: function(e) {
    console.log(e)
    this.setData({
      key: e.detail.value
    })

  },
  search: function(e) {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    if (that.data.key !== ""){
    base.getRq('/search', {
      key: that.data.key,
    }).then(function(res) {

      if (res.data.data.length == 0) {
        console.log('无搜索结果')
        wx.hideLoading();
        that.setData({
          noResults: false,
          searchList: null
        })
      } else {
        console.log('搜索', res)
        wx.hideLoading();
        that.setData({
          searchResult: true,
          noResults: true,
          searchList: res.data.data
        })
      }

    })
    }

  },
  cancel(){
  this.setData({
    key: '',
    searchList: [],
    searchResult: false,
    noResults: true
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