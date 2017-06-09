//index.js

var Data = require("../../utils/data.js");

//获取应用实例
var app = getApp()
Page({
  data: {
    tips: '选择日期',
    date:'',
    tomorrow:'',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    var that = this;
    var startDate = that.data.date;
    var endDate = that.data.tomorrow;
    console.log(startDate);
    console.log(endDate);
    wx.navigateTo({
      url: '../calender/index?startDate=' + startDate + "&endDate=" + endDate
    })
  },
 onShow:function() {
   var startDate = this.data.startDate;
   var endDate = this.data.endDate;
   console.log(startDate);
   console.log(endDate);
   var date = Data.formatDate(new Date(), "yyyy-MM-dd");
   var tomorrow1 = new Date();
   tomorrow1.setDate((new Date()).getDate() + 1);
   var tomorrow = Data.formatDate(new Date(tomorrow1), "yyyy-MM-dd");
   if (startDate == null) {
     startDate = date;
     endDate = tomorrow;
   }
   this.setData({
     date: startDate,
     tomorrow: endDate
   });
 }
})
