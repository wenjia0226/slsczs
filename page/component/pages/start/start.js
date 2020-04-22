// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    swiperImg: ['swiper1', 'swiper2', 'swiper3', 'swiper4']
  },
  startTest() {
    wx.navigateTo({
      url: '/page/component/pages/testR/testR',
    })
  },
  gotocheck() {
    let scale = wx.getStorageSync('scale');
    wx.setStorageSync('resetscale', 1);
    wx.navigateBack()
    // wx.navigateTo({
    //   url: '/page/component/pages/check/check'
    // })
  }
})