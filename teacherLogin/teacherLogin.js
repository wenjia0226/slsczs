// page/myCollection//pages/teacherLogin/teacherLogin.js
const app = getApp();
Page({
  data: {
    phone: '',
    password1: '',
    success: false,
    text: '',
    isLogin: false,
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '教师登录'
    }
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
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        console.log(res)
        wx.navigateTo({
          url: '/page/myCollection/pages/survey/survey'
        })
      }
    }, (err) => {
      console.log(err)
    })
  }
})