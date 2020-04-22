
Page({
  data: {
    flag: false
  },
  onShow() {
    this.setData({
      flag: false
    })
  },
  startTest() {
    // console.log(this.data.flag)
    if (!this.data.flag) {
      this.setData({
          flag: true
      })
      wx.navigateTo({
        url: '/page/component/pages/test/test',
      })
    }
  },
  gotocheck() {
      let scale = wx.getStorageSync('scale');
      wx.setStorageSync('resetscale', 1);
      wx.navigateTo({
        url: '/page/component/pages/check/check'
      })
    }
})