
let app = getApp()
Page({
  data: {
    currentTab: 0,
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
    }
    }
  },
  onLoad: function (option) {
    
  },
  onshow: function(){
  }
})
