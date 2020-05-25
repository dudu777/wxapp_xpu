// pages/release/release.js
var base = require("../../utils/base.js")
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,// 发布类型
    categoryList:[],// 商品类别列表
    imgList: [],// 图片上传列表
    sele_cate: '必填 请选择商品类别',
    user_id:null,
    release_sucess:false,// 发布成功
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type,
      user_id: wx.getStorageSync('user').user_id
    })
    if(this.data.type == 2){
      // 获取闲置商品类别
      this.getCategoryList()
    }

  },
  
  // 获取闲置商品类别
  getCategoryList() {
    let that = this
    base.getRq('/category').then(function (res) {
      // console.log('获取类别', res)
      that.setData({
        categoryList: res.data.data
      })
    })
  },
  // 选择商品类别
  PickerChange(e) {
    this.setData({
      sele_cate: this.data.categoryList[e.detail.value].cate_name
    })
  },
// 选择上传图片
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册和拍照选择
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
// 查看大图
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
// 删除选择的图片
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
  // 提交闲置表单
  goodFormSubmit(e) {
    let form = e.detail.value
    if (form.good_name ==""){
      wx.showToast({
        title: '请填写商品标题',
        icon:'none'
      })
    } else if (form.category == null){
      wx.showToast({
        title: '请选择商品类别',
        icon:'none'
      })

    } else if (form.sell_price == ''){
      wx.showToast({
        title: '请填写商品出手价',
        icon: 'none'
      })
    } else if (form.contact == '') {
      wx.showToast({
        title: '请填写您的联系方式',
        icon: 'none'
      })
    }else{// 校验通过
      let that = this
      form["category"] = this.data.categoryList[form.category].cate_name;
      form["user_id"] = this.data.user_id
      form['create_time'] = util.dateToString(new Date())
      console.log('闲置表单数据为：', form)
      // 判断是否上传图片
      if (that.data.imgList.length > 0) {
        base.uploadImg(that.data.imgList).then(function (res) {
          console.log('上传图片返回', res)
          form["image"] = res
          that.addGood(form)
        })
      } else {
        that.addGood(form)
      }

    }
    
  },
  // 请求发布闲置接口
  addGood(form){
    var that = this
    // 闲置发布接口
    base.postRq('/good', form).then(function (res) {
      console.log('闲置发布接口',res)
      setTimeout(function () {
        that.setData({
          release_sucess: true
        })
        wx.navigateBack({

        })
      }, 1000)
      

    })
  },
  // 提交报失/拾遗表单
  glnFormSubmit(e) {
    let form = e.detail.value
    if (form.gln_name == "") {
      wx.showToast({
        title: '请填写物品名称',
        icon: 'none'
      })
    }  else if (form.contact == '') {
      wx.showToast({
        title: '请填写您的联系方式',
        icon: 'none'
      })
    } else {// 校验通过

    }
    console.log(form)
    let that = this
    console.log('报失/拾遗表单数据为：', form)
    form['type'] = that.data.type
    form["user_id"] = that.data.user_id
    form['create_time'] = util.dateToString(new Date())
    // 判断是否上传图片
    if (that.data.imgList.length > 0) {
      base.uploadImg(that.data.imgList).then(function (res) {
        console.log('上传图片返回', res)
        form["image"] = res
        that.addGleaning(form)
      })
    } else {
      that.addGleaning(form)
    }
  },
  // 请求报失/拾遗闲置接口
  addGleaning(form) {
    let that = this
    // 闲置发布接口
    base.postRq('/gleaning', form).then(function (res) {
      console.log('闲置/拾遗发布接口', res)
      setTimeout(function () {
        that.setData({
          release_sucess: true
        })
        wx.navigateBack({

        })
      }, 1000)
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