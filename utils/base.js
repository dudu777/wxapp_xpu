// let baseUrl  = 'http://localhost:5000'
 let baseUrl = 'https://xpu.duduer.top'
function postRq (url,data){
  return new Promise((resolve,reject) =>{
    wx.request({
      url: baseUrl  + url,
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
      url: baseUrl + url,
      data: data,
      method: "GET",
      success: function (res) {
        resolve(res)
      }
    })
  })
}
// PUT请求
function putRq(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      data: data,
      method: "PUT",
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        console.log(err)
        setTimeout(function () {
          putRq(url, data)
        }, 3000)
        wx.showToast({
          title: '网络连接断开，请检查网络设置',
          icon: 'none'
        })
      }
    })
  })
}

function uploadImg(imgList) {
  return new Promise((resolve, reject) => {
    let length = imgList.length
    let serverImgList = [] // 图片上传后服务器地址

    for(let i =0;i<length;i++){
      wx.uploadFile({
         url:baseUrl+'/upload',
        
        filePath: imgList[i],
        name: 'file',
        formData: {
        },
        method: 'POST',
        success: (res) => {
          let data = res.data.replace(/ /g, "")
          serverImgList.push(JSON.parse(data).url)
          // 图片以 字符串形式储存在数据库，多张图片储存以 * 分隔
          if(i == length-1){
            resolve(serverImgList.join("*"))
          }
        },
        fail: function (e) {
          console.log('上传错误', e)

        }
      })

    }
   

  })
}
module.exports = { postRq, getRq, putRq,uploadImg}