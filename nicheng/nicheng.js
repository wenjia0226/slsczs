//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
  
    })
    wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
    wx.setStorageSync("nickName", e.detail.userInfo.nickName);
    let encryptedData = e.detail.encryptedData, iv = e.detail.iv;
    this.deciyption(encryptedData, iv);
  },
  //登录
  deciyption( encryptedData, iv) {
    let that = this;
    let url = app.globalData.URL + 'loginXcx';
    let data = {
      encryptedData: encryptedData,
      iv: iv,
      code: wx.getStorageSync('code')
    };
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url,data, (res) => {
      if (res.data.status == 200) {
          wx.setStorageSync('phone', true);  //授权登录后
          wx.setStorageSync('openId', res.data.data.openId);
          wx.navigateTo({
            url: '/page/tabBar/screen/screen'
          })
        }
    }, (err) => {
      console.log(err)
    })
  }
})
