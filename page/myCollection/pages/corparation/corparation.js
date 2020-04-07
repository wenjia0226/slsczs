// pages/corparation/corparation.js
const app = getApp();
Page({
  data: {
    companyList: []
  },
  onShow: function (options) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.URL + 'partnershipList', data = {};
    app.wxRequest(url, data, (res) => {
      that.setData({
        companyList: res.data.data
      })
    }, (err) => {
      console.log(err)
    })
  }
})