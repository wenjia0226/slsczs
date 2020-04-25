const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: app.globalData.navTop,
    height: app.globalData.menuHeight
  },
  gotoSearch() {
    wx.navigateTo({
      url: '/page/exchange/pages/shopSearch/shopSearch'
    })
  }
})
