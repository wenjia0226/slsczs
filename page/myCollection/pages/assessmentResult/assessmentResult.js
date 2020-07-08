// assessmentResult/assessmentResult.js
Page({
  data: {
    num: 0,
    result: ''
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
    wx.navigateTo({
      url: '/page/tabBar/screen/screen',
    })
  }
})