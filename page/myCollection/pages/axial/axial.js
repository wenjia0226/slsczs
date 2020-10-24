// page/myCollection//pages/axial/axial.js
const app = getApp();
Page({
  data: {
    studentId: ''
  },

  onLoad: function (options) {
    let studentId = options.studentId;
    this.setData({
      studentId: studentId
    })
    this.getArchivesList()
  },
  getArchivesList() {
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...',
      })
      let that = this;
      let url = app.globalData.URL + 'axisLengthShow', data = {
        studentId: that.data.studentId
      };
      app.wxRequest(url, data, (res) => {
        console.log(res)
        this.setData({
          axiosList: res.data.data
        })
      })
    }
        //如果孩子不为空
  }
})