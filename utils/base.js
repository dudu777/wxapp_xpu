function postRq (url,data){
  return new Promise((resolve,reject) =>{
    wx.request({
      url: 'https://xpu.duduer.top'+url,
      //url: 'http://localhost:5000' + url,
      data:data,
      
      method: "POST",
      success :function(res){
        resolve(res)
      }
    })
  })
}
function getRq(url,data){
  return new Promise((resolve, reject) => {
    wx.request({
       url: 'https://xpu.duduer.top' + url,
      //url: 'http://localhost:5000' + url,
      data: data,
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      success: function (res) {
        resolve(res)
      }
    })
  })
}
module.exports = {postRq,getRq}