// pages/plan/plan.js
const app = getApp();
Page({
  data: {
      taskList: []
  },
  fininsh(e) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.URL + 'completeTask', data = {
      openId: wx.getStorageSync('openId'),
      taskId: e.currentTarget.dataset.id
    };
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        that.getList();
      }
    }, (err) => {
      console.log(err)
    })
  },
  onShow: function () {
  
    this.getList();
  },  
  getList() {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    let url = app.globalData.URL + 'xcxTaskList', data = {
      openId: wx.getStorageSync('openId')
    };
    app.wxRequest(url, data, (res) => {
      that.setData({
        taskList: res.data.data
      })
    }, (err) => {
      console.log(err)
    })  
  }
})