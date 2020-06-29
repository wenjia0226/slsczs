// page/assembly/pages/navbar/navbar.js
const app = getApp();
Component({

  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { },
    }
  },
  data: {
    height: app.globalData.height * 2 + 20,
    wz: app.globalData.wz,
    navTop: app.globalData.navTop
  },
  methods: {
    // 照相打卡
    gotoCamera() {
      if (wx.getStorageSync('phone')) {
        wx.navigateTo({
        url: '/page/myCollection/pages/addContent/addContent',
      })
      } else {
        wx.showToast({
          title: '请先登录',
        })
        wx.navigateTo({
          url: '/nicheng/nicheng'
        })
        
      }
     
    },
  }
  
})