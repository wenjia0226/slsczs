// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  startTest() {
    wx.navigateTo({
      url: '/page/component/pages/testR/testR',
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