
let app = getApp()
Page({
  data: {
    currentTab: 0, // 当前底部菜单id
    modalName: null,//弹框
    tabList: [{ icon: "/icon/gleaning0.png", name: "报失" }, { icon: "/icon/gleaning1.png", name: "拾遗" }, { icon: "/icon/good.png", name: "闲置" }], // 菜单列表
  },
  
  swichNav: function (e) {
    let tab_id = e.target.dataset.current
    if (this.data.currentTab === tab_id) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
      if(tab_id){
   

        this.selectComponent("#user").getCount()
      }

    }
  },
  onReachBottom: function (e) {
   
  },
  onLoad: function (option) {
    console.log('onload')
    // 获取拾遗商品
    this.selectComponent("#home").getGleaningByType(1)
  },
  // 选择发布类型
  showTypeModel(){
    this.setData({
      modalName: "typeModel"

    })
  },
  // 跳转至发布页面
  navToRelease(e){
    let type = e.currentTarget.dataset.type
    this.hideModal()
    wx.navigateTo({
      url: '/pages/release/release?type='+type,
    })
  },
  // 隐藏弹框
  hideModal(){
    this.setData({
      modalName:null
    })

  },
  onshow: function(){
    console.log('onshow')
    let myView = this.selectComponent('#user')    //选择组件
    myView.setData({
      auth:1        //改变值
    })
    console.log(myView.auth)
  },


  onShareAppMessage: function () {
    return {
      title: '生活帮',
      desc: '为西安工程大学校友提供生活便利！',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})
