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
    height: app.globalData.height * 2 + 20,
    wz: app.globalData.wz,
    navTop: app.globalData.navTop
  },
  methods: {
    goback() {
      wx.navigateBack()
    }
  }

})