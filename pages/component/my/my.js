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
    starCount: 0,
    forksCount: 0,
    publishTotal: 0,
    auth:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /* 组件声明周期函数 */
  lifetimes:{
    
    attached: function () {
      console.log('attache')
      var that = this
      base.postRq('/getPublishById', { openID: '123' }).then(function (res) {
       
        that.setData({
          publishTotal: res.data.data.length
        })
      })
      
    
      //验证接口 通过
      // base.postRq('/login', {
      //   // nickname: this.data.userInfo.nickName,
      //   // avatarurl: this.data.userInfo.avatarUrl,
      //   // openid: app.globalData.userKey.openid,
      //   // gender:this.data.userInfo.gender,
      //   // auth:0
      //   nickName: 'test8',
      //  avatarUrl: 'test8',
      //   openID: 'test8',
      //   gender: 'test8',
      //   auth: 0
      // }).then(function (res) {
      //   console.log('登录', res)
      // })
      if (app.globalData.userInfo) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
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
        // nickname: this.data.userInfo.nickName,
        // avatarurl: this.data.userInfo.avatarUrl,
        // openid: app.globalData.userKey.openid,
        // gender:this.data.userInfo.gender,
        // auth:0
        nickName: app.globalData.userInfo.nickname,
        avatarUrl: app.globalData.avatarurl,
        openID: app.globalData.userKey.openid,
        gender: app.globalData.gender,
        auth: 0
      }).then(function (res) {
        console.log('登录',res)
      })
    
    }
  }

})