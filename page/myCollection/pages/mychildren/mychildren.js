// pages/mychildren/mychildren.js
const app = getApp();
Page({
  data: {
    name: [],
    schoolName: '',
    classesName: '',
    birthday: '',
    gender: 0
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    let studentId = options.id;
    let url = app.globalData.URL + 'findStudent', data = {
      studentId
    };
    app.wxRequest(url, data, (res) => {
      console.log(res)
      that.setData({
        name: res.data.data.name,
        schoolName: res.data.data.schoolName,
        classesName: res.data.data.classesName,
        birthday: res.data.data.birthday,
        gender:  res.data.data.gender
      })
    }, (err) => {
      console.log(err)
    })
    // wx.request({
    //   url: 'http://192.168.2.201:8080/lightspace/xcx/findStudent',
    //   method: 'post',
    //   data:{
    //     studentId
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   success(res) {
    //     that.setData({
    //       name: res.data.data.name,
    //       schoolName: res.data.data.schoolName,
    //       classesName: res.data.data.classesName,
    //       birthday: res.data.data.birthday
    //     })
    //   },
    //   fail(err) {
    //     console.log(err)
    //   }
    // })
  }
})