// answerResult/answerResult.js
const app = getApp();
Page({

  data: {
    avatarUrl:'',
    nickName: '',
    rightAnswer: 0
  },
  onLoad(options) {
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      nickName: wx.getStorageSync('nickName'),
      rightAnswer: wx.getStorageSync('rightAnswer')
    })
    let that = this;
    let url = app.globalData.URL + 'answerSubmit';
    let data = {
      studentId: wx.getStorageSync('studentId'),
      number: this.data.rightAnswer
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        console.log(res)
      }
    }) 
  },
  gotoShopping() {
    wx.switchTab({
      url: '/page/tabBar/exchange/exchange',
    })
  },
  gotoIndex() {
    wx.switchTab({
      url: '/page/tabBar/screen/screen',
    })
  }

  
})