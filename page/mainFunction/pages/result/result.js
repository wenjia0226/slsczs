// pages/save/save.js
const app = getApp();
Page({
  data: {
    visionLeft: '',
    visionRight: '',
    number: '',
    levelName5Left: '',
    levelName5Right: '',
    result: '',
    statusBarHeight: 0,
    gobalTop: 0,
    detectTye: 0,
    showCongratulation: false,
    flag: false,
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '检测结果'
    },
    leftEyeRightNum: 0,
    leftEyeWrongNum: 0,
    rightEyeRightNum: 0,
    rightEyeWrongNum: 0,
    noUpdate: false
  },
  gotobi() {
    wx.navigateTo({
      url: '/page/myCollection/pages/jifen/jifen'
    })
    this.setData({
      showCongratulation: false
    })
  },
  hideview() {
    this.setData({
      showCongratulation: false
    })
  },
  voidRight() {
    const rightContext = wx.createInnerAudioContext();
    rightContext.autoplay = true
    rightContext.src = '/image/win.mp3'
    rightContext.onPlay(() => {
    })
    rightContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  onShow() {
    let that = this;
    that.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      globalTop: app.globalData.top,
    })
    let min;
    this.setData({
      visionLeft: wx.getStorageSync('visionLeft'),
      visionRight: wx.getStorageSync('visionRight'),
      levelName5Left: wx.getStorageSync('levelName5Left'),
      levelName5Right: wx.getStorageSync('levelName5Right'),
      leftEyeRightNum: wx.getStorageSync('LeftEyeRightNum'),
      leftEyeWrongNum: wx.getStorageSync('LeftEyeWrongNum'),
      rightEyeRightNum: wx.getStorageSync('RightEyeRightNum'),
      rightEyeWrongNum: wx.getStorageSync('RightEyeWrongNum'),
    })
    if (this.data.rightEyeWrongNum == 45 || this.data.leftEyeWrongNum == 45) {
      this.setData({
        result: '检测无效',
        noUpdate: true
      })
    }
    //左右眼逻辑判断
    if (that.data.visionLeft > that.data.visionRight) {
      min = that.data.visionRight
    } else {
      min = that.data.visionLeft
    }
    if (min == 1.0 || min == 1.2 || min == 1.5 || min == 2.0) {
      that.setData({
        result: '良好'
      })
    } else if (min == 0.8) {
      that.setData({
        result: '轻度'
      })
    } else if (min == 0.6) {
      that.setData({
        result: '中度'
      })
    } else if (min == 0.5 || min == 0.4 || min == 0.3 || min == 0.25 || min == 0.2 || min == 0.15 || min == 0.12 || (min == 0.1 && this.data.rightEyeWrongNum !== 45 && this.data.leftEyeWrongNum !== 45)) {
      that.setData({
        result: '重度'
      })
    }
  },
  onLoad() {
    if (wx.getStorageSync('reuploadFlag')) {
      this.setData({
        detectType: wx.getStorageSync('detectType')
      })
        wx.showLoading({
          title: '加载中...',
        })
        let url;
        let that = this;
        if (that.data.detectType == 0) {
          url = app.globalData.URL + 'addScreening';
        } else if (that.data.detectType == 1) {
          url = app.globalData.URL + 'addWearScreening';
        }
        let data = {
          studentId: wx.getStorageSync('studentId'),
          visionLeft: wx.getStorageSync('visionLeft'),
          visionRight: wx.getStorageSync('visionRight'),
          processLeft: JSON.stringify(wx.getStorageSync('left')),
          processRight: JSON.stringify(wx.getStorageSync('right')),
          openId: wx.getStorageSync('openId')
        };
        app.wxRequest(url, data, (res) => {
          wx.setStorageSync('reuploadFlag', false)
          if(res.data.status == 10224) {
            wx.showLoading({
              title: res.data.msg,
            })
          }
          if (res.data.status == 200) {
            this.voidRight();
            this.setData({
              showCongratulation: true
            })
          
          }
        }, (err) => {
          console.log(err)
        })
      }
  },
   go(e) {
     let type = e.currentTarget.dataset.type;
       //清空存储
      // wx.setStorageSync('right', '');
      // wx.setStorageSync('left', '');
      // wx.setStorageSync('visionLeft', '');
      // wx.setStorageSync('visionRight', '');
      // wx.setStorageSync('levelName5Left', '');
      // wx.setStorageSync('levelName5Right', '');
      // wx.setStorageSync('RightEyeRightNum', 0);
      // wx.setStorageSync('RightEyeWrongNum', 0);
      // wx.setStorageSync('LeftEyeRightNum', 0);
      // wx.setStorageSync('LeftEyeWrongNum', 0);
     if (type == 'home') {
       wx.navigateTo({
         url: '/page/tabBar/screen/screen'
       })
     } else if (type == 'archives') {
       let studentId = wx.getStorageSync('studentId');
       wx.navigateTo({
         url: '/page/myCollection/pages/archives/archives?studentId=' + studentId
       })
     }
   }
})