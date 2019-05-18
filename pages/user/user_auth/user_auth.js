// pages/user/user_auth/user_auth.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    imgUrl: '/images/imgAdd.png',
    test:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://localhost:5000/user/login',
    //   data:{
    //     username:'1',
    //     password:'2',

    //   },
    //   method:'POST',
    //   success: res => {
    //     console.log(res)
    //     const _token = res.data.data
    //     wx.setStorageSync('_token', _token)
    //   }
    // })
    var base = require("../../../utils/base.js")
    console.log(base)
    base.postRq('user/list', {
        username: '1',
        password: '2'
    }).then(function(res){
      console.log(res)
    })
    
    // wx.request({
    //   url: 'http://localhost:5000/user/list',
    //   data: {
    //     username: '1',
    //     password: '2',

    //   },
    //   method: 'POST',
    //   header:{
    //     'Authorization': 'Bearer '+ '7899999998'
    //   },
    //   success: res => {
    //     console.log(res)
    //     const _token = res.data.data
    //     wx.setStorageSync('_token', _token)
    //   }
    // })

  },

  /**
    *
    * json转字符串
    */
   stringToJson(data){
    return JSON.parse(data);
  },
  /**
  *字符串转json
  */
  jsonToString(data) {
    return JSON.stringify(data);
  },
  navToForm() {
wx.navigateTo({
  url: '/pages/user/user_auth/form/form',
})
  },
  ChooseImage() {
    console.log('choose')
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], //从相册选择
      success: (res) => {
        console.log(res)
          this.setData({
            imgUrl: res.tempFilePaths
          })
        console.log(app.globalData.userKey.access_token)
        wx.uploadFile({
          url: 'http://localhost:5000/upload', // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'dudu'
          },
          method:'POST',
          success: (res) =>  {
            console.log(res)
            let data = res.data.replace(/ /g,"")
            data = JSON.parse(data)
            console.log(data)
            this.setData({
              test: data.url
            })
          }
        })
      }
    });
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