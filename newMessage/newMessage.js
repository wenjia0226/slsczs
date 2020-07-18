// page/myCollection//pages/newMessage/mewMessage.js
const app = getApp();
Page({
  data: {
    list: [],
    content: '',
    str: ''
  },
  onLoad: function (options) {
    app.editTabbar();
  },
 onShow() {
   let that = this;
   let url = app.globalData.URL + "allFabulousMsg",
     data = {
       openId: wx.getStorageSync('openId')
     };
   //如果已经授权
   app.wxRequest(url, data, (res) => {
     
     var list = res.data.data;
     list.forEach((item, index) => {
       let str = item.content;
       if(item.content.substring(item.content.length - 3) == 'jpg') {
         item.img = 1;
       }else {
        item.img = 0
       }
     })
     console.log(list)
     that.setData({
       list: list
     })
   })
  
 }

})