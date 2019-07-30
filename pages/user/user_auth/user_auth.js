// pages/user/user_auth/user_auth.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    imgUrl: '/images/imgAdd.png',
    stuInfo:{},
    imgAuth: true
  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   if(wx.getStorageSync('auth')){
     wx.navigateTo({
       url: '/pages/user/user_auth/info/info',
       
          
     })
   }
   
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
    var auth = JSON.stringify(this.data.stuInfo)
wx.navigateTo({
  url: '/pages/user/user_auth/form/form?stuInfo='+auth,
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
        wx.showLoading({
          title: '识别中',
        })
        wx.uploadFile({
          url: 'https://xpu.duduer.top/stuAuth', // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          method:'POST',
          success: (res) =>  {
            console.log(res)
            
            let data = res.data.replace(/ /g, "")
            data = JSON.parse(data)
            console.log(data)
            console.log(data.data.ret)
            if (data.data.ret == undefined) {
              wx.hideLoading();
              wx.showModal({
                title: '识别错误',
                content: '请拍摄或上传清晰的学生证照片!',
              })
              
              return
            }
            this.setData({
              imgAuth: false,
              stuInfo : data
            })
            wx.hideLoading();
            wx.showToast({
              title: '识别成功',
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