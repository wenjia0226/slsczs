// pages/detail/detail.js
const app = getApp();
Page({
  data: {
    myIntegral: 0,
    birthday: '',
    gender: '',
    date: '',
    diopter: {},
    isSelect: 1,
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '屈光度详情'
    }
  },
  goBakck() {
    wx.navigateBack()
  },
  onLoad: function (option) {
    let that = this;
    let id = option.id;
    let url = app.globalData.URL + 'diopterById'
    let  data = {
      id: id
    };
    wx.showLoading({
      title: '加载中..',
    })

    app.wxRequest(url, data, (res) => {
      res.data.data ? res = res.data.data : '';
      that.setData({
        studentName: res.studentName,
        diopter: res,
        date: res.genTime,
        gender: res.gender,
        birthday: res.birthday,
        myIntegral: res.myIntegral
      })
    }, (err) => {
      console.log(err)
    })
  },
  changeTab(e) {
    this.setData({
      isSelect: e.currentTarget.dataset.type
    })

  }
})