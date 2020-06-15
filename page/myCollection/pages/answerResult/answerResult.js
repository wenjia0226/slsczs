// answerResult/answerResult.js
const app = getApp();
Page({

  data: {
    avatarUrl:'',
    nickName: '',
    rightAnswer: 0,
    msg: '',
    showCongratulation: false
  },
  voidRight() {
    const rightContext = wx.createInnerAudioContext();
    rightContext.autoplay = true
    rightContext.src = '/image/win.mp3'
    rightContext.onPlay(() => {
    })
    rightContext.onError((res) => {
      console.log(res.errMsg)
    })
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
      // console.log(res)
      if (res.data.status == 200) {
        that.voidRight();
       that.setData({
         msg: '恭喜您获得' + that.data.rightAnswer + '个爱眼币',
         showCongratulation: true
       })
      }else {
        that.setData({
          msg: res.data.msg
        })
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
  },
  gotobi() {
    wx.navigateTo({
      url: '/page/myCollection/pages/jifen/jifen'
    })
    this.setData({
      showCongratulation: false
    })
  },
  hideview() {
    this.setData({
      showCongratulation: false
    })
  },

  
})