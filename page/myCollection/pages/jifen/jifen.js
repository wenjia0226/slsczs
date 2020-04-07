// pages/jifen/jifen.js
const app = getApp();
Page({
  data: {
    jifenList: [],
    balance: '',
    expenditure: '',
    income: '',
    state: '',
  },
  onShow: function (options) {
    if(wx.getStorageSync('phone')) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
      let url = app.globalData.URL + 'integralList', data = {
        openId: wx.getStorageSync('openId')
      };
      app.wxRequest(url, data, (res) => {
        that.setData({
          jifenList: res.data.data.data,
          balance: res.data.data.balance,
          income: res.data.data.income,
          expenditure: res.data.data.expenditure
        })
      }, (err) => {
        console.log(err)
      })
  }
  },
  gotoGongLve() {
    wx.showToast({
      title: '正在开发，敬请期待',
      icon: 'none',
      duration: 2000
    })
  }

})