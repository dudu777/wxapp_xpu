// pages/user/user_auth/form/form.js
var app = getApp();
var util = require("../../../../utils/util.js")
var base = require("../../../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    stuID:'',
    academy:'',
    stuClass:'',
    stuCard:'',
    cardInfo:null




  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var stuInfo = JSON.parse(options.stuInfo)
    this.setData({
      cardInfo : stuInfo.data.ret,
      stuCard: stuInfo.url

    })
    

  },
  submit(){
    var base = require("../../../../utils/base.js")
    for(var i=0;i<this.data.cardInfo.length;i++){
      switch (this.data.cardInfo[i].word_name){
        case "姓名": var name = this.data.cardInfo[i].word; break;
        case "班级": var stuClass = this.data.cardInfo[i].word; break;
        case "学院": var academy = this.data.cardInfo[i].word; break;
        case "学号": var stuID = this.data.cardInfo[i].word; break;
      }
     
    }
    var para ={
      openID: app.globalData.userKey.openid,
      name :name,
      stuClass: stuClass,
      academy: academy,
      stuID:stuID,
      stuCard: this.data.stuCard,
    
      date: util.formatTime(new Date())
    }
    base.postRq('/auth', para).then(function (res) {
      console.log(res)
      if(res.data.code == 200){
        wx.showToast({
          title: '认证成功！',
        })
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
      wx.setStorageSync("auth", 1)
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