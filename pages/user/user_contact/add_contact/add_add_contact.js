// pages/user/user_contact/add_contact/add_add_contact.js
var app = getApp()
var base = require("../../../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['手机', '微信', 'QQ'],
    index: null,
    con_type:'',
    con_num:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value,
      con_type: this.data.picker[e.detail.value]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  inputbindblur: function(e){
    console.log(e)
    this.setData({
      con_num: e.detail.value
    })
  },
  addContact(){
    //请求联系方式添加
    base.postRq('/addContactById', {
      openID: app.globalData.userKey.openid,
      con_type:this.data.con_type,
      con_num:this.data.con_num
    }).then(function (res) {
      wx.navigateBack({
        
      })
    })
   

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