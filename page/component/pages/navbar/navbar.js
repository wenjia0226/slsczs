// page/assembly/pages/navbar/navbar.js
const app = getApp();
Component({

  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: app.globalData.height * 2 + 20
  },
  methods: {
    goback() {
      wx.navigateBack()
    }
  }
  
})