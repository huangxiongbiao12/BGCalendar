var Data = require("../../utils/data.js");

Page({
  data: {
  },
  //==================加载数据================
  onLoad: function(options) {
    console.log(options.startDate);
    console.log(options.endDate);
    if(options.startDate&&options.endDate) {
       console.log(options.startDate);
      console.log(options.endDate);
        // var startDate = Data.formatDate(options.startDate,"yyyy-MM-dd");
        // var endDate =  Data.formatDate(options.endDate,"yyyy-MM-dd");
        this.data.startDate = options.startDate;
        this.data.endDate = options.endDate;
    }
    var date = new Date();
    //获取当前的年月
    var cur_year = date.getFullYear();
    var cur_month = date.getMonth() + 1;
    var cur_day = date.getDate();
    console.log(cur_year);
    console.log(cur_month);
    console.log(cur_day);
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    //设置数据
    this.setData({
      org_year:date.getFullYear(),//现在时间的年月日
      org_month:date.getMonth(),
      org_day:cur_day,
      weeks_ch
    })
    this.initData(cur_year,cur_month);
  },
  //初始化数据
  initData:function(cur_year,cur_month) {
      // 计算最近三个月的对象
    var mObject0 = this.calculateDays(cur_year, cur_month);
    if(cur_month+1>12) {
      cur_year = cur_year+1;
      cur_month = 1;
    }else {
      cur_month = cur_month+1;
    }
    var mObject1 = this.calculateDays(cur_year, cur_month);
    if(cur_month+1>12) {//月不能大于12
      cur_year = cur_year+1;
      cur_month = 1;
    }else {
      cur_month = cur_month+1;
    }
    var mObject2 = this.calculateDays(cur_year, cur_month);
    this.setData({
      allDays:[mObject0,mObject1,mObject2]
    });
  },
  // =============获取当月有多少天（下个月月初是多少）==========
  getThisMonthDays: function(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // =============获取当月第一周第一天是周几===========
  getFirstDayOfWeek: function(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  //====================计算当前年月空的几天 =============
  calculateEmptyGrids: function(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
    }
    return empytGrids;
  },
   // =====================计算当前年月有哪些天===========
   /**
    * 根据年月计算当前月的天对象状态返回对象
    * mObject 年月对象
    * year  年
    * month 月
    * hasEmptyGrid  是都有空调
    * empytGrids  空天数字
    * days 所有日对象【】
    */
  calculateDays: function(year, month) {
    var mObject = {};//月对象
    mObject["year"] = year;
    mObject["month"] = month;
    //计算当前年月空的几天
    var empytGrids = this.calculateEmptyGrids(year, month);
    if(empytGrids.length>0) {
      mObject["hasEmptyGrid"] = true;
      mObject["empytGrids"] = empytGrids;
    }else {
      mObject["hasEmptyGrid"] = false;
      mObject["empytGrids"] = [];
    }
    var days = [];
    var thisMonthDays = this.getThisMonthDays(year, month);//这个月有多少天
    //现在的时间
     var cusDate = new Date(this.data.org_year, this.data.org_month,this.data.org_day);
     var startDate;
     var endDate;
     if(this.data.startDate&&this.data.endDate) {
        startDate = Data.stringToDate(this.data.startDate);
        endDate = Data.stringToDate(this.data.endDate);
     }
     if(this.data.startDate){
       startDate = Data.stringToDate(this.data.startDate);
     }
    for (let i = 1; i <= thisMonthDays; i++) {
      var day = {};
      //加入的时间
      var date = new Date(year, month-1,i);
      // console.log(date)
      //status 0-不可选择 1-当前时间 2-可选择 3-被选中
      day["day"] = i;
      //比现在的时间比较是大于还是小于，小于则不可点击
      var time = parseInt(Data.calculateTime(date,cusDate)); 
      if(time<0) {
          day["status"] = 0;
      }else if(time==0) {
          day["status"] = 1;
      }else {
          day["status"] = 2;
      }
      if(this.data.startDate&&this.data.endDate) {
        var stime = parseInt(Data.calculateTime(date,startDate)); 
        var etime = parseInt(Data.calculateTime(date,endDate));
        if(stime>=0&&etime<=0) {
            day["status"] = 3;
        }
      }else if(this.data.startDate){
         var stime = parseInt(Data.calculateTime(date,startDate)); 
        if(stime==0) {
            day["status"] = 3;
        }
      }
      days.push(day);
    }
    mObject["days"] = days;
    return mObject;
  },
// 选择时间
  selectAction: function(e) {
      console.log(e.currentTarget.dataset.object);
      var year = e.currentTarget.dataset.object.year;
      var month = e.currentTarget.dataset.object.month;
      var day = e.currentTarget.dataset.idx+1;
      console.log(year);
      console.log(month);
      console.log(day);
      var selectDate = new Date(year,month-1,day);
      //现在的时间
     var cusDate = new Date(this.data.org_year, this.data.org_month,this.data.org_day);
      var time = parseInt(Data.calculateTime(selectDate,cusDate));
      console.log(time);
      if(time<0) {
        console.log("请选择合理的时间");
         wx.showToast({
                  title: '请选择合理的时间',
                  icon: 'error',
                  duration: 2000
          })
          return;
      }
      if(this.data.startDate&&this.data.endDate) {
          this.data.startDate = Data.formatDate(selectDate,"yyyy-MM-dd");
          this.data.endDate = null;
      }else if(this.data.startDate) {
          this.data.endDate = Data.formatDate(selectDate,"yyyy-MM-dd");
      }else {
           this.data.startDate = Data.formatDate(selectDate,"yyyy-MM-dd");
      } 
      this.initData(this.data.org_year, this.data.org_month+1);
      //返回选择的时间（有起止时间的时候返回）
       if(this.data.startDate&&this.data.endDate) {
         console.log(this.data.startDate);
         console.log(this.data.endDate);
         var sDate = this.data.startDate;
         var eDate = this.data.endDate;
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面
          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
            startDate:sDate,
            endDate:eDate
          })
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function(res){
              // success
            },
            fail: function(res) {
              // fail
            },
            complete: function(res) {
              // complete
            }
          })
       }
  }

});

/**
 * //切换年月操作
  handleCalendar: function(e) {
    var handle = e.currentTarget.dataset.handle;
    var cur_year = this.data.cur_year;
    var cur_month = this.data.cur_month;
    console.log(cur_year);
    console.log(cur_month);
    if (handle === 'prev') {
      cur_month = cur_month - 1;
      if (cur_month < 1) {
        cur_year = cur_year - 1;
        cur_month = 12;
      }
    } else {
      cur_month = cur_month + 1;
      if (cur_month > 12) {
        cur_year = cur_year + 1;
        cur_month = 1;
      }
    }
    console.log(cur_year);
    console.log(cur_month);
    var curDate =  new Date(cur_year, cur_month-1, 1)
    var oriDate = new Date(this.data.org_year, this.data.org_month, 1)
    console.log(curDate);
    console.log(oriDate);
    var time = Data.calculateTime(curDate,oriDate);
    console.log(time);
    if(time<0||time>90) {
        wx.showToast({
                title: '选择时间需在当前时间30天内',
                icon: 'error',
                // mask: true,
                duration: 2000
            });
        return;
    }
    this.calculateDays(cur_year, cur_month);
    this.calculateEmptyGrids(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month
    })
  },
 */