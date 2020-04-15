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
 
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '检测结果'
    }  
  }, 
  onShow() {
    let that = this;
    that.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      globalTop: app.globalData.top,
      detectType: wx.getStorageSync('detectType')
    })
    let min;
    this.setData({
      visionLeft: wx.getStorageSync('visionLeft'),
      visionRight: wx.getStorageSync('visionRight'),
      number: wx.getStorageSync('numLeft') + wx.getStorageSync('numRight'),
      levelName5Left: wx.getStorageSync('levelName5Left'),
      levelName5Right: wx.getStorageSync('levelName5Right')
    })
    let  beginEnd = that.data.visionLeft + "-" + that.data.visionRight;
    //左右眼逻辑判断
    if(that.data.visionLeft > that.data.visionRight) {
      min = that.data.visionRight
    }else {
      min = that.data.visionLeft
    }
    if(min == 1.0 || min == 1.2 ||  min==1.5 || min == 2.0) {
      that.setData({
        result: '良好'
      })
    }else if(min == 0.8) {
      that.setData({
        result: '轻度'
      })
    }else if( min == 0.6) {
      that.setData({
        result: '中度' 
      })
    }else if(min ==0.5 || min == 0.4 || min == 0.3 || min == 0.25 || min == 0.2 || min == 0.15 || min == 0.12 || min == 0.1) {
      that.setData({
        result: '重度'
      })
    } 
  },
  addResult(e) {
    wx.showLoading({
      title: '加载中...',
    })
    let type = e.currentTarget.dataset.type;
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
      // number: wx.getStorageSync('numLeft') + wx.getStorageSync('numRight'),
      processLeft: JSON.stringify(wx.getStorageSync('left')),
      processRight: JSON.stringify(wx.getStorageSync('right'))
    };
    app.wxRequest(url, data, (res) => {
      // console.log(res);
      if(res.data.status == 200) {
        // console.log(res)
        if(type == 'home') {
          wx.switchTab({
            url: '/page/tabBar/screen/screen'
          })
        } else if (type == 'archives'){
          let studentId = wx.getStorageSync('studentId');
          wx.switchTab({
            url: '/page/tabBar/archives/archives?studentId=' + studentId
          })
        }
        
      }
    }, (err) => {
      console.log(err)
    })
  },
  gotoHome() {
   
    
     

  },
  gotoArchives() {
    this.addResult();
  
    let studentId = wx.getStorageSync('studentId');
    wx.switchTab({
      url: '/page/tabBar/archives/archives?studentId=' + studentId
    })

  }
})