const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width; //图片原始宽 
  var originalHeight = e.detail.height; //图片原始高 
  var originalScale = originalHeight / originalWidth; //图片高宽比 
  wx.getSystemInfo({
    success: function(res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth; //屏幕高宽比    
      if (originalScale < windowscale) { //图片高宽比小于屏幕高宽比      
        //图片缩放后的宽为屏幕宽        
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else { //图片高宽比大于屏幕高宽比    
        //图片缩放后的高为屏幕高       
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }
    }
  })
  return imageSize;
}
// 日期转化为字符串
function dateToString(nowDate){
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
    : nowDate.getMonth() + 1;
  var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
    .getDate();
  var hour = nowDate.getHours();
  var minutes = nowDate.getMinutes();
  var seconds = nowDate.getSeconds();
  var dateStr = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  return dateStr

}
// 将日期字符串 转化为 今天 刚刚...
function dateStrFormat(dateStr) {
  var date = new Date(dateStr.replace(/-/g, '/'));  //转为日期对想
  var timestamp = date.getTime() / 1000;
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }
  var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
  var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象

  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

  if (timestampDiff < 60) { // 一分钟以内
    return "刚刚";
  } else if (timestampDiff < 3600) { // 一小时前之内
    return Math.floor(timestampDiff / 60) + "分钟前";
  } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
    return '今天' + zeroize(H) + ':' + zeroize(i);
  } else {
    var newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
    if (newDate.getFullYear() == Y && newDate.getMonth() + 1 == m && newDate.getDate() == d) {
      return '昨天' + zeroize(H) + ':' + zeroize(i);
    } else if (curDate.getFullYear() == Y) {
      return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
    } else {
      return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
    }
  }
}

module.exports = { imageUtil, dateToString, dateStrFormat  }
// module.exports = {
//   formatTime: formatTime,
//   imageUtil: imageUtil,
//   dateToString: dateToString,
//   dateStrFormat: dateStrFormat,
// }