// reportList/reportList.js
const app = getApp();
Page({
  data: {
    reportList: []
  },
  onShow() {
    wx.showLoading({
      title: '加载中...'
    })
    let that = this;
    let openId = wx.getStorageSync('openId');
    let url = app.globalData.URL + "queryStudentWord", data = { openId: openId };
    app.wxRequest(url, data, (res) => {
      if(res.data.status == 200) {
        console.log(res.data.data)
        if(res.data.data) {
        that.setData({
          reportList: res.data.data
        })
        }
      }
    })
  },
  gotoDetailReport(e) {
      let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/myCollection/pages/reportDetail/reportDetail?id='+ id,
    })
  }
})