// answerResult/answerResult.js
Page({

  data: {
    avatarUrl:'',
    nickName: ''
  },
  onLoad(options) {
    console.log(options)
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      nickName: wx.getStorageSync('nickName')
    })
  }

  
})