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
      value: 'My',

    }
  },

  /* 组件的初始数据 */
  data: {
    tradeTotal: 0,
    favorTotal: 0,
    publishTotal: 0,
    auth:wx.getStorage({
      key: 'auth'
    }),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /* 组件声明周期函数 */
  lifetimes:{
    
    attached: function () {

      console.log(app.globalData.userKey.openid)
      var that = this
      base.postRq('/getPublishById', { openID: app.globalData.userKey.openid }).then(function (res) {
       
        that.setData({
          publishTotal: res.data.data.length
        })
      })
      
    
     
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          auth:wx.getStorageSync("auth")
        })
        console.log(that.data.auth)
      } else if (that.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            console.log(res.userInfo)
            app.globalData.userInfo = res.userInfo
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            
          }
        })
      }
      


    },
    moved: function () {
      console.log('moved')
    },
    detached: function () {
      console.log('datached')
    },
  },
  

  /* 组件的方法列表 */
  methods: {
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
       
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      base.postRq('/login', {
      
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        openID: app.globalData.userKey.openid,
        gender: app.globalData.userInfo.gender,
        
      }).then(function (res) {
        console.log('登录',res)
        wx.setStorageSync('auth', res.data.data.auth)
        
      })
    
    },
    getPublishCount(){
      var that = this
      base.postRq('/getPublishById', { openID: app.globalData.userKey.openid }).then(function (res) {
        console.log('我的发布列表', res)
        that.setData({
          publishTotal: res.data.data.length
        })
      })

    },
    getTradeCount() {
      var that = this
      base.postRq('/getTradeById', { openID: app.globalData.userKey.openid }).then(function (res) {
        console.log('我的交易列表', res)
        that.setData({
         tradeTotal: res.data.data.length
        })
      })

    },
    getFavorCount() {
      var that = this
      base.postRq('/getUserfavor', { openID: app.globalData.userKey.openid }).then(function (res) {
        console.log('我的收藏列表', res)
        that.setData({
          favorTotal: res.data.data.length
        })
      })

    },
    

  }

})