// page/myCollection//pages/teacherLogin/teacherLogin.js
const app = getApp();
Page({
  data: {
    phone: 19931372308,
    password1: 123456,
    success: false,
    text: '',
    isLogin: false
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password1: e.detail.value
    })
  },
  teacherLogin() {
    let that = this;
    let url = app.globalData.URL + 'teacherLogin';
    let data = {
      phone: this.data.phone,
      password: this.data.password1,
      openId: wx.getStorageSync('openId')
    }
    wx.showLoading({
      title: '加载中...',
    })
    console.log(url, data)
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        console.log(res)
        wx.switchTab({
          url: '/page/tabBar/screen/screen'
        })
      }
    }, (err) => {
      console.log(err)
    })
  }
})