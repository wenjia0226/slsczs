// answerResult/answerResult.js
Page({

  data: {
    avatarUrl:'',
    nickName: '',
    rightAnswer: 0
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      nickName: wx.getStorageSync('nickName'),
      rightAnswer: wx.getStorageSync('rightAnswer')
    })
  }

  
})