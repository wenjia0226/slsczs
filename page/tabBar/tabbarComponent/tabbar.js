// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "page/tabBar/index/index",
            "text": "首页",
            "iconPath": "/page/tabBar/tabbarComponent/icon/index.png",
            "selectedIconPath": "/page/tabBar/tabbarComponent/icon/indexactive.png",
            "usingComponents": {
              "tabbar": "page/tabBar/tabbarComponent/tabbar"
            }
          },
          {
            "pagePath": "page/tabBar/eyeShow/eyeShow",
            "text": "秀一秀",
            "iconPath": "/page/tabBar/tabbarComponent/icon/quan.png",
            "selectedIconPath": "/page/tabBar/tabbarComponent/icon/quanactive.png",
            "usingComponents": {
              "nav-bar": "/page/tabBar/navbar/navbar",
              "tabbar": "/page/tabBar/tabbarComponent/tabbar"
            }
          },
          {
            "pagePath": "/page/tabBar/screen/screen",
            "text": "筛查",
            "iconPath": "/page/tabBar/tabbarComponent/icon/sc.png",
            "isSpecial": true,
          },
          {
            "pagePath": "page/tabBar/exchange/exchange",
            "text": "护眼城",
            "iconPath": "/page/tabBar/tabbarComponent/icon/mail.png",
            "selectedIconPath": "/page/tabBar/tabbarComponent/icon/mailactive.png",
            "usingComponents": {
              "tabbar": "/page/tabBar/tabbarComponent/tabbar"
            }
          },
          {
            "pagePath": "page/tabBar/my/my",
            "text": "我的",
            "iconPath": "/page/tabBar/tabbarComponent/icon/myactive.png",
            "selectedIconPath": "/page/tabBar/tabbarComponent/icon/myactive.png",
            "usingComponents": {
              "tabbar": "/page/tabBar/tabbarComponent/tabbar"
            }
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  methods: {

  }
})
