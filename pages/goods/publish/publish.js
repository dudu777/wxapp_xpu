// pages/publish/publish.js
var base = require("../../../utils/base.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    serverImg: [],
    picker: ['图书', '生活小物'],
    i:0,
    hasContact:true,//默认有联系方式
    con_num:'',
    con_type:'',
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    

  },

  ChooseImage() {
    console.log('选择图片')
    wx.chooseImage({

      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        console.log(res)
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
    });
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
    console.log(e)
  },
  PickerChange: function(e) {
    console.log(e)
  },
  navToCantact(){
    wx.navigateTo({
      url: "/pages/goods/publish/ch_contact/ch_contact",
    })

  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formData = e.detail.value
    var that = this
    if (that.data.i == that.data.imgList) {
      that.setData({
        i: 0,
        imgList: [],
        serverImg: []
      })
      return
    }
    var imagecount = that.data.imgList.length
    wx.uploadFile({
      url: 'http://localhost:5000/upload', // 仅为示例，非真实的接口地址
      filePath: that.data.imgList[that.data.i],
      name: 'file',
      formData: {
        user: 'dudu'
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        let data = res.data.replace(/ /g, "")
        data = JSON.parse(data)
        console.log(data)
        that.data.serverImg.push(data.url)
        if (imagecount == that.data.serverImg.length) {
          var para = {
            openID:'123',
            img:that.data.serverImg,
            publishTime: new Date(),
            ...formData


          }
          //请求上传接口
          base.postRq('/goods_publish',para).then(function (res) {
            console.log(res)
            wx.showToast({
              title: '发布成功',
            })
          })
        } else {
          that.data.i++;
          that.formSubmit();
        }

      },
      fail: function (e) {
        console.log(e)
        wx.showToast({
          title: '重新发',
        })
      }
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
  onShow: function(e) {
    
    console.log(e)
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