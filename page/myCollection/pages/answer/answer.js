// answer/answer.js
const app = getApp();

Page({
  data: {
    details: '',
    pic: '',
    introduction: '',
    title: '',
    subtitle: ''
  },
  gotoStart() {
    wx.navigateTo({
      url: '/page/myCollection/pages/startanswer/startanswer',
    })
  },
  onLoad() {
    let that = this;
    let url = app.globalData.URL + 'answerConfig';
    let data = {
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        // console.log(res)
        that.setData({
          details: res.data.data.details,
          introduction: res.data.data.introduction,
          title: res.data.data.title,
          pic: res.data.data.pic,
          subtitle: res.data.data.subtitle
        })
      }
    }) 
  }

})