// assessmentResult/assessmentResult.js
Page({
  data: {
    num: 0,
    result: '',
    sub: false
  },
  onLoad: function (options) {
    this.setData({
      num: options.num
    })
    if(this.data.num <= 10) {
      this.setData({
        result: '较差'
      })
    }else if(this.data.num >10 && this.data.num <=20) {
      this.setData({
        result: '正常'
      })
    }else {
      this.setData({
        result: '良好'
      })
    }
  },
  gotoShai() {
    if(!this.data.sub) {
      this.setData({
        sub: true
      })
      wx.switchTab({
        url: '/page/tabBar/screen/screen',
      })
    }
   
  }
})