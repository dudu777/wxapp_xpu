// pages/auth/auth.js
var base = require("../../utils/base.js")
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: null,
    auth:0,
    authInfo:null,
    loading:false,// 加载中动画
    auth_sucess: false// 认证成功提示

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loading:true,
      user_id: wx.getStorageSync('user').user_id,
      auth: wx.getStorageSync('user').auth
    })
    if(this.data.auth == 1){
      this.getAlumni()
    }else{
      this.setData({
        loading:false
      })
    }

  },
  // 查询认证信息
  getAlumni(){
    let that = this
    base.getRq('/alumni/'+that.data.user_id).then(res =>{
      console.log('认证信息',res)
      let data = res.data.data
      data.create_time = util.dateStrFormat(data.create_time)
 
      that.setData({
        authInfo: data,
        loading:false
      })
    })


  },
  // 提交认证表单
  formSubmit(e) {
    let form = e.detail.value
    let that = this
    console.log(form)
    if (form.alm_name == "") {
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      })
    } else if (form.number == "") {
      wx.showToast({
        title: '请填写您的学号',
        icon: 'none'
      })

    } else if (form.faculty == '') {
      wx.showToast({
        title: '请填写您的学院',
        icon: 'none'
      })
    } else if (form.major == '') {
      wx.showToast({
        title: '请填写您的班级',
        icon: 'none'
      })
    } else {// 校验通过
      that.setData({
        loading: true
      })
      form["user_id"] = this.data.user_id
      form['create_time'] = util.dateToString(new Date())
      console.log('闲置表单数据为：', form)
      base.postRq('/alumni', form).then(res => {
        console.log('校友认证返回', res)
        wx.setStorage({
          key: 'user',
          data: { user_id: this.data.user_id, auth: 1 },
        })

        that.setData({
          loading: false,
          auth_sucess: true
        })
        setTimeout(function () {
          that.setData({
            auth_sucess: false
          })
          wx.navigateBack({

          })
        }, 1000)

      })


    }
    
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
    return {
      title: '生活帮',
      desc: '为西安工程大学校友提供生活便利！',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})