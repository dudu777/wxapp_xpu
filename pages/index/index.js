
let app = getApp()
Page({
  data: {
    currentTab: 0,
    page:1
  },
  
  swichNav: function (e) {
    console.log(e)
    let that = this;
    if (e.currentTarget.dataset.current==2){
      wx.navigateTo({
        url: '/pages/goods/publish/publish'       
      })

    }else{
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      if(this.data.currentTab ==1){
        console.log('请求数量')
        this.selectComponent("#my").getPublishCount();
        this.selectComponent("#my").getFavorCount();
        this.selectComponent("#my").getTradeCount();
       
        

      }
     
    }
    }
  },
  onReachBottom: function (e) {
    var result = false   //不是true
   this.setData({
     page:this.data.page + 1
   })
    if (result) {
      console.log('触底 returnfalse ')
   
    
    }else{
      console.log('不能调用')
    result = this.selectComponent("#goods").getGoodsList(this.data.page)
      this.setData({
        none_loading: true
      })
    }
   
  },
  onLoad: function (option) {
   
    
  },
  onshow: function(){
  
  },


  onShareAppMessage: function () {
    return {
      title: '优淘集',
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
