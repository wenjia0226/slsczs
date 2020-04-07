
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  startTest() {
    wx.navigateTo({
      url: '/page/component/pages/test/test',
    })
  },
  gotocheck() {
    let scale = wx.getStorageSync('scale');
    wx.setStorageSync('resetscale', 1);
    wx.navigateTo({
      url: '/page/component/pages/check/check'
    })
  }
})