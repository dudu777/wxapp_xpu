
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
    }
   
  },
  onLoad: function (option) {
    if (this.data.currentTab == 1) {
      console.log('111111')

    }
    
  },
  onshow: function(){
    if (this.data.currentTab == 1) {
      console.log('111111')

    }
  }
})
