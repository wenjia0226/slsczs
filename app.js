//app.js
App({
  onLaunch:  function () {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            updateManager.applyUpdate() //自动更新
            // wx.showModal({
            //   title: '更新提示',
            //   content: '新版本已经准备好，是否重启应用？',
            //   success: function (res) {
            //     console.log('success====', res)
            //     // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
            //     if (res.confirm) {
            //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            //       updateManager.applyUpdate()
            //     }
            //   }
            // })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    // wx.setStorageSync('show', this.globalData.isShow)
    let that = this;
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        var appId = 'wx6992c25f5c91f13c'
        var secret = 'f31ee1679f8d2b452fa961437d996f9e';
        wx.setStorageSync('code', code);
      }
     })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
              wx.setStorageSync("nickName", res.userInfo.nickName);
              wx.setStorageSync("encryptedData", res.encryptedData);
              wx.setStorageSync("iv", res.iv);
              // 可以将 res 发送给后台解码出 unionId
        
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    let jnHight = menuButtonObject.height;
    wx.setStorageSync('jnHight', jnHight/ 2)
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight,
            navTop = menuButtonObject.top,//胶囊按钮与顶部的距离            
            navHeight = statusBarHeight + menuButtonObject.height;//导航高度
          this.globalData.wz =  menuButtonObject.height / 2;
          this.globalData.navHeight = navHeight;
          this.globalData.navTop = navTop;
          this.globalData.windowHeight = res.windowHeight;
          this.globalData.height = res.statusBarHeight;
          this.globalData.menuHeight = menuButtonObject.height;
          // console.log(statusBarHeight, navTop, navHeight);
        },
        fail(err) {
          console.log(err);
        }
      })
  },
  globalData: {
    userInfo: null,
    navHeight: '', 
    navTop: '',
    windowHeight: '',
    height: '',
    wz:'',
    menuHeight: '',
  //  URL: 'https://www.guangliangkongjian.com/lightspace/xcx/'
    URL: 'http://192.168.100.199:8080/lightspace/xcx/'
  },
  wxRequest(url, data, callback, errFun) {
    wx.request({
      url: url,
      method: 'post',
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        callback(res)
      },
      fail: function(err) {
        errFun(err)
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  }
})