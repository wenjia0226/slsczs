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
    swiperImg: ['https://www.guangliangkongjian.com/images/step1.jpg', 'https://www.guangliangkongjian.com/images/step2.jpg', 'https://www.guangliangkongjian.com/images/step3.jpg', 'https://www.guangliangkongjian.com/images/step4.jpg']
  },
  startTest() {
    wx.navigateTo({
      url: '/page/mainFunction/pages/testR/testR',
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