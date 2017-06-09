# BGCalendar
微信小程序，选择酒店入住离店时间的控件

### 效果图

![image](https://github.com/huangxiongbiao12/BGCalendar/blob/master/BGCalendar/display.gif)

### 使用方法

```
//事件处理函数
  bindViewTap: function() {
    var that = this;
    //传递入住离店时间
    var startDate = that.data.date;
    var endDate = that.data.tomorrow;
    console.log(startDate);
    console.log(endDate);
    wx.navigateTo({
      url: '../calender/index?startDate=' + startDate + "&endDate=" + endDate
    })
  },
 onShow:function() {
 //接收入住离店时间
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
```
