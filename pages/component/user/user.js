var app = getApp();
var base = require("../../../utils/base.js")
Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'User',
    }
  },

  /* 组件的初始数据 */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    modalName: null,
    user_id:'',
    auth:0,//未认证
    loading: false,
    good_num: 0,// 发布过的闲置物品的数量
    gln0_num: 0, //发布过的报失物品的数量
    gln1_num: 0//发布过的拾遗物品的数量
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function (e) {
      var that = this
      that.setData({
         user_id : wx.getStorageSync('user').user_id,
        auth: wx.getStorageSync('user').auth
      })
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          if (res.data.avatarUrl) {
            that.setData({
              userInfo: res.data,
              hasUserInfo: true,
              loading:false
            })
          } else {
            that.setData({
              modalName: "bottomModal"
            })
          }
        },
        fail: function (res) {
          that.setData({
            modalName: "bottomModal"
          })
        }
      })
    },

    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    // 获取统计数据
    getCount(){
      var that = this 
      if (that.data.user_id){
        that.setData({
          loading: true
        })
        base.getRq('/count/' + that.data.user_id).then(function (res) {
          //console.log('统计数据',res)
          let data = res.data.data[0]
          that.setData({
            good_num: data.good_num,
            gln0_num: data.gln0_num,
            gln1_num: data.gln1_num,
            loading: false
          })
        })


      }
      
    },
    navToUser_rele(e){
      console.log(e)
      wx.navigateTo({
        url: '/pages/user_rele/user_rele?type='+e.currentTarget.dataset.type,
      })

    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
  

    // 清楚微信缓存
    clearStorage: function () {
      wx.showModal({
        title: '提示',
        content: '缓存清除后将重新登录，确认清除？',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: '加载中',
            })
            wx.login({
              success: res => {
                console.log('applogin')
                if (res.code) {
                  base.postRq('/login', { js_code: res.code }).then(res => {
                    
                    wx.setStorage({
                      key: 'user',
                      data: res.data.data,
                    })
                    wx.hideLoading()
                    wx.showToast({
                      title: '清除成功',
                    })

                  })

                } else {
                  console.log('登录失败！' + res.errMsg)
                  wx.hideLoading()
                }
              }
            })
            
          } else if (res.cancel) {

          }
        }
      })
    },

   // 获取用户信息
    getUserInfo: function (e) {
      this.hideModal()
      let info = e.detail.userInfo
      wx.setStorageSync('userInfo',info)
      let para = {
        wx_name: info.nickName,
        avatar: info.avatarUrl,
        gender: info.gender,
        city: info.city,
        province: info.province,
        country: info.country,
        language: info.language
      }
      var that = this
      let user_id = wx.getStorageSync('user').user_id
      base.putRq('/user/'+user_id, para).then(function (res) {
        console.log('存储信息',res)
          if (e.detail.userInfo) {
            that.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true
            })
          } else {
            that.setData({
              hasUserInfo: false
            })
          }
        
       

      })


    },
  }
})