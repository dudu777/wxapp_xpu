var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'My'
    }
  },

  /* 组件的初始数据 */
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    auth:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
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
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }


    },
    moved: function () {

    },
    detached: function () {

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
      wx.request({
        url: 'http://localhost:5000/login',
        data: {
          nickname: this.data.userInfo.nickName,
          avatarurl: this.data.userInfo.avatarUrl,
         openid: app.globalData.userKey.openid,
          gender:this.data.userInfo.gender,
          auth:0
        },
        method:'POST',
        success: res => {
          console.log(res)
        }
      })
    }
  }

})