// reportList/reportList.js
const app = getApp();
Page({
  data: {
    reportList: []
  },
  onShow() {  
    let that = this;
    let studentId = wx.getStorageSync('studentId')
    let openId = wx.getStorageSync('openId');
    if(studentId) {
      wx.showLoading({
        title: '加载中...'
      })
    let url = app.globalData.URL + "queryStudentWord", data = { studentId: studentId };
    app.wxRequest(url, data, (res) => {
      if(res.data.status == 200) {
        if(res.data.data) {
        that.setData({
          reportList: res.data.data
        })
        }
      }
    })
    }
  },
  gotoDetailReport(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/myCollection/pages/reportDetail/reportDetail?id='+ id,
    })
  }
})