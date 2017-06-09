
//提供接口
module.exports = {
    getUserKey : getUserKey,//保存登录的用户信息
    getOpenPwKey : getOpenPwKey,//保存开门的钥匙
    getUrl:getUrl,//host接口
    postData:postData,
    getData:getData,
    getUserId:getUserId,
    getUser:getUser,
    formatDate:formatDate,//格式化日期
    stringToDate:stringToDate,//字符串转日期
    calculateTime:calculateTime//比较时间差
}

//post===============
//url==网址 ,param===参数,back===返回的函数
function postData(data) {
    var url = data.url;
    var param = data.param;
    var back = data.back;
    wx.showLoading({
        title: '加载中',
        mask: true
      });
    console.log(url);
    console.log(param)
    wx.request({
      url: getUrl()+url,
      data: param,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
     complete: function(res) {
             wx.hideLoading();
    },
     fail: function(res) {
         wx.showToast({
                title: '请求错误',
                icon: 'error',
                mask: true,
                duration: 2000
            });
        back(false);
    },
    success: function(res) {
        console.log(res);
        wx.hideLoading();
        if(res.data.status==500){
            wx.showToast({
                title: '请求成功',
                icon: 'success',
                mask: true,
                duration: 2000
            });
            back(res.data.data);
            return;
        }else if(res.data.length>0){
            wx.showToast({
                title: res.data.data,
                icon: 'error',
                mask: true,
                duration: 2000
            });
        }
        back(false);
    }
 })
}
//get===============
//url==网址 ,param===参数,back===返回的函数
function getData(data) {
    var url = data.url;
    var param = data.param;
    var back = data.back;
    console.log(url+'++++'+param);
    wx.request({
      url: getUrl()+url,
      data: param,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        if(res.data.status==500){
            wx.showToast({
                title: '请求成功',
                icon: 'success',
                mask: true,
            });
            back(res.data.data);
        }else {
            wx.showToast({
                title: res.data.data,
                icon: 'error',
                mask: true,
            });
        }
        // return res.data.data;
        back(false);
    },
      fail: function(res) {
        // fail
        back(false);
      },
      complete: function(res) {
        // complete
         wx.hideLoading();
      }
    })
}


//接口URL==============
function getUrl(){
  return "https://xcx.uzhizhu.com";
}

// 获取常用信息==================
//获取userid
function getUserId(data) {
    wx.getStorage({
        key: getUserKey(),//'userInfo',
        fail:function(res) {
            data.back(false);
        //    return false;
        },
        success: function(res) {
            var userData = res.data;
            console.log(userData);
            data.back(userData.usrid);
            // return userData.usrid;
          } 
    });
}
//获取user的登录信息
function getUser(data) {
    wx.getStorage({
        key: getUserKey(),//'userInfo',
        fail:function(res) {
             data.back(false);
        //    return false;
        },
        success: function(res) {
            var userData = res.data;
            console.log(userData);
             data.back(userData);
            // return userData;
          } 
    });
}


//本地保存数据的key==============
//保存登录的用户信息
function getUserKey(){
    return "userInfo";
}
//保存开门的钥匙
function getOpenPwKey() {
    return "openpw";
}



/** 
   * 字符串转时间（yyyy-MM-dd HH:mm:ss） 
   * result （分钟） 
   */ 
  function stringToDate(fDate){  
    var fullDate = fDate.split("-");  
    return new Date(fullDate[0], fullDate[1]-1, fullDate[2], 0, 0, 0);  
  } 
  
  
/** 
     * 格式化日期 
     * @param date 日期 
     * @param format 格式化样式,例如yyyy-MM-dd HH:mm:ss E 
     * @return 格式化后的金额 
     */
    function formatDate(date, format) { 
      var v = ""; 
      if (typeof date == "string" || typeof date != "object") { 
        return; 
      } 
      var year  = date.getFullYear(); 
      var month  = date.getMonth()+1; 
      var day   = date.getDate(); 
      var hour  = date.getHours(); 
      var minute = date.getMinutes(); 
      var second = date.getSeconds(); 
      var weekDay = date.getDay(); 
      var ms   = date.getMilliseconds(); 
      var weekDayString = ""; 
        
      if (weekDay == 1) { 
        weekDayString = "星期一"; 
      } else if (weekDay == 2) { 
        weekDayString = "星期二"; 
      } else if (weekDay == 3) { 
        weekDayString = "星期三"; 
      } else if (weekDay == 4) { 
        weekDayString = "星期四"; 
      } else if (weekDay == 5) { 
        weekDayString = "星期五"; 
      } else if (weekDay == 6) { 
        weekDayString = "星期六"; 
      } else if (weekDay == 7) { 
        weekDayString = "星期日"; 
      } 
  
      v = format; 
      //Year 
      v = v.replace(/yyyy/g, year); 
      v = v.replace(/YYYY/g, year); 
      v = v.replace(/yy/g, (year+"").substring(2,4)); 
      v = v.replace(/YY/g, (year+"").substring(2,4)); 
  
      //Month 
      var monthStr = ("0"+month); 
      v = v.replace(/MM/g, monthStr.substring(monthStr.length-2)); 
  
      //Day 
      var dayStr = ("0"+day); 
      v = v.replace(/dd/g, dayStr.substring(dayStr.length-2)); 
  
      //hour 
      var hourStr = ("0"+hour); 
      v = v.replace(/HH/g, hourStr.substring(hourStr.length-2)); 
      v = v.replace(/hh/g, hourStr.substring(hourStr.length-2)); 
  
      //minute 
      var minuteStr = ("0"+minute); 
      v = v.replace(/mm/g, minuteStr.substring(minuteStr.length-2)); 
  
      //Millisecond 
      v = v.replace(/sss/g, ms); 
      v = v.replace(/SSS/g, ms); 
        
      //second 
      var secondStr = ("0"+second); 
      v = v.replace(/ss/g, secondStr.substring(secondStr.length-2)); 
      v = v.replace(/SS/g, secondStr.substring(secondStr.length-2)); 
        
      //weekDay 
      v = v.replace(/E/g, weekDayString); 
      return v; 
    }
    /**
     * 计算两个日期相差几天
     * cusDate 当前时间
     * oriDate  比较时间
     * 返回 正数为cusDate>oriDate
     */
    function calculateTime(cusDate,oriDate) {
      var cusTime = cusDate.getTime();
      var oriTime = oriDate.getTime();
      return (cusTime-oriTime)/(1000*60*60*24)
    }
