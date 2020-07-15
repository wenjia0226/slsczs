// index.js
const app = getApp();
Page({
  data: {
    tabbar: {},
    height: app.globalData.navHeight
  },
  onLoad() {
    app.editTabbar();
  },
})
