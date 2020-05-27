// pages/mychildren/mychildren.js
const app = getApp();
Page({
  data: {
    name: '',
    schoolName: '',
    classesName: '',
    birthday: '',
    gender: 0,
    sittingHeight: '',
    height: '',
    chairHeight: '',
    displayInfo: true,
    date: '',
    show: true
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    let studentId = options.id;
    let url = app.globalData.URL + 'findStudent', data = {
      studentId: 617
    };
    app.wxRequest(url, data, (res) => {
      console.log(res)
      that.setData({
        name: res.data.data.name,
        schoolName: res.data.data.schoolName,
        classesName: res.data.data.classesName,
        birthday: res.data.data.birthday,
        gender:  res.data.data.gender,
        sittingHeight: res.data.data.sittingHeight,
        height: res.data.data.height,
        chairHeight: res.data.data.chairHeight
      })
    }, (err) => {
      console.log(err)
    })
  },
  showModify() {
    let that = this;
    this.setData({
      displayInfo: !that.data.displayInfo
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      show: false
    })
  },
  //修改性别
  selectSex(e) {
    this.setData({
      gender: e.currentTarget.dataset.type
    })
  },
  fininshModify() {
    let that = this;
    let url = app.globalData.URL + "perfectStudent",
      data = {
        name: this.data.name,
        birthday: this.data.date,
        gender: this.data.gender,
        height: this.data.height,
        weight: this.data.weight,	
        chairHeight: this.data.chairHeight,
        sittingHeight: this.data.sittingHeight
      };
    app.wxRequest(url, data, (res) => {
      console.log(res)
      if (res.data.status == 200) {
        wx.switchTab({
          url: '/page/tabBar/screen/screen'
        })
      }
    })
  }
})