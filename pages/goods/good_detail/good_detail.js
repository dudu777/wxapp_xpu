// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goodInfo: JSON.parse(options.data)
    })

  },
  getContact() {
    if (this.data.goodInfo.isWatch = 0) { // 联系方式不给非校友查看

      if (this.data.goodInfo.isWatch = 0) { // 联系方式不给非校友查看
        if (wx.getStorageSync("auth")) { // 未认证
          wx.showModal({
            content: '卖家将联系方式设置为仅校友查看',
            cancelText: '取消',
            confirmText: '去认证',
            success: res => {
              wx.navigateTo({
                url: "/pages/user/user_auth/user_auth",
              })
            }
          })
        }

      }

    }
  },
  share: function(){
    console.log('分享')
  },
  shareImg:function(){
    console.log('生成图片')
  },
  favor:function(){
    console.log('收藏')
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