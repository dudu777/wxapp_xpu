// pages/goods/publish/ch_contact/ch_contact.js
var app = getApp()
var base = require("../../../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con_list:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
   var that = this
     // 获取用户的联系方式
    base.postRq('/getContactById', {
      openID: app.globalData.userKey.openid,  
    }).then(function (res) {
      that.setData({
        con_list:res.data.data
      })        
    })
  },

  navToAdd: function(){
    wx.navigateTo({
      url: "/pages/user/user_contact/add_contact/add_add_contact",
    })
  },

  radioBindtap(e) {
    setTimeout(function(){
      var pages = getCurrentPages();
       pages[pages.length - 2].setData({
         con_type : e.currentTarget.dataset.data.con_type,
         con_num : e.currentTarget.dataset.data.con_num,
       })
     wx.navigateBack({
     delta:1
    })
    },500)  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) { 
    var that = this
    //获取用户的联系方式
    base.postRq('/getContactById', {
      openID: app.globalData.userKey.openid
    }).then(function (res) {
      console.log('地址', res)
      that.setData({
        con_list: res.data.data
      })
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