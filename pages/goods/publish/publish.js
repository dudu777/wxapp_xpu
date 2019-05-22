// pages/publish/publish.js
var app = getApp()
var base = require("../../../utils/base.js")
Page({

  /**
   * 页面的初始数据
   */

  data: {
    imgList: [],
    serverImg: [],
    picker: ['图书', '生活小物'],
    i: 0,
    hasContact: true, //默认有联系方式
    type: null,
    formData: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    })
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      content: '确定要删除图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  textareaAInput: function(e) {
    
  },

  PickerChange: function(e) {
    
  },


  PickerChange(e) {
    this.setData({
      index: e.detail.value,
      type: this.data.picker[e.detail.value]
    })
  },

  uploadImg() {
    var that = this
    if (that.data.i == that.data.imgList.length) {
      that.setData({
        i: 0,
        imgList: [],
        serverImg: [],
      })
      return
    }
    var imagecount = that.data.imgList.length
    wx.uploadFile({
      url: 'http://localhost:5000/upload',
     // url: 'http://47.106.139.243:5000/upload', // 仅为示例，非真实的接口地址
      filePath: that.data.imgList[that.data.i],
      name: 'file',
      formData: {
        user: 'test'
      },
      method: 'POST',
      success: (res) => {
        console.log('4444444')
        let data = res.data.replace(/ /g, "")
        data = JSON.parse(data)
        that.data.serverImg.push(data.url)
        var str_SerImg = that.data.serverImg
        if (imagecount == that.data.serverImg.length) {
          var para = {
            openID: app.globalData.userKey.openid,
            img: str_SerImg.join(","),
            type: that.data.type,
            publishTime: new Date(),
            ...that.data.formData
          }
          // 发布接口
          base.postRq('/goods_publish', para).then(function(res) {
            console.log(res.data.code)
            wx.showToast({
              title: '发布成功',
            })
            wx.navigateTo({
              url: "/pages/index/index",
            })
          })
        } else {
          that.data.i++;
          console.log('i++')
          that.uploadImg();
        }
      },
      fail: function(e) {
        console.log('发布错误',e)
        wx.showToast({
          title: '重新发布',
        })
      }
    })
  },

  formSubmit(e) {
   console.log('form携带数据为：', e.detail.value)
    var form = e.detail.value
    this.setData({
      formData:form
    })
    if (this.data.type == null || form.title == "" || form.cellPrice == "" || form.contact == "" || this.data.imgList.length == 0) {
        wx.showModal({
          title: '提交失败',
          content: '请完善商品信息！',
        })
      } else {
        console.log('diaoyong')
        this.uploadImg();
      }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {

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