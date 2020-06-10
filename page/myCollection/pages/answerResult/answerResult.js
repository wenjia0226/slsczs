// answerResult/answerResult.js
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