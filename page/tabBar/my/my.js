// my.js
const app = getApp();
Page({
  data:{
    phone: false,
    phoneNum: '',
    avatarUrl: '',
    nickName: ''
  },
  onShow() {
      this.setData({
        phone: wx.getStorageSync('phone'),
        phoneNum: wx.getStorageSync('phoneNum'),
        avatarUrl: wx.getStorageSync('avatarUrl'),
        nickName: wx.getStorageSync('nickName')
      })
  },
  gotoQian() {
    if(wx.getStorageSync('phone')) {
      if (wx.getStorageSync('time')) {
         this.OneMoreGet();
      } else {
        this.getJiFen();
      }
    }else {
      this.gotoLogin();
    }
  },
  OneMoreGet() {
    let data = { openId: wx.getStorageSync('openId') };
    let url = app.globalData.URL + 'signin';
    app.wxRequest(url, data, (res) => {
      wx.showModal({
        title: '本日已签到',
        content: '若要获取更多积分，完成爱眼计划',
        showCancel: true,//是否显示取消按钮
        cancelText: "以后再说",//默认是“取消”
        // cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "现在就去",//默认是“确定”
        // confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            wx.setStorageSync('time', 1)
            wx.navigateTo({
              url: '/page/myCollection/pages/plan/plan',
            })
          }
        }
      })
    }, (err) => {
      console.log(err)
    })
  },
  getJiFen() {
    let data = { openId: wx.getStorageSync('openId') };
    let url = app.globalData.URL + 'signin';
    app.wxRequest(url, data, (res) => {
      wx.showModal({
        title: '签到成功',
        content: '若要获取更多积分，完成爱眼计划',
        showCancel: true,//是否显示取消按钮
        cancelText: "以后再说",//默认是“取消”
        // cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "现在就去",//默认是“确定”
        // confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            wx.setStorageSync('time', 1)
            wx.navigateTo({
              url: '/page/myCollection/pages/plan/plan',
            })
          }
        }
      })
    }, (err) => {
      console.log(err)
    })
  },
  gotoLogin() {
    wx.navigateTo({
      url: '/nicheng/nicheng'
    })
  },
  gotMyChild() {
    if(this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/childrenManage/childrenManage'
      })
    }else {
     this.gotoLogin()
    }
  },
  goToBao() {
    // wx.showToast({
    //   title: '开发中...',
    //   icon: 'none'
    // })
    if (wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '/page/myCollection/pages/reportList/reportList'
      })
    }
  },
  gotoPlan() {
    if(this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/plan/plan'
      })
    }else {
      this.gotoLogin();
    }
    
  },
  gotoJiFen() {
    if(this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/jifen/jifen'
      })
    }else {
     this.gotoLogin()
    }
 
  },
  gotoshare() {
    wx.navigateTo({
      url: '/page/myCollection/pages/corparation/corparation'
    })
  },
  onShareAppMessage() {
    return {
      title: '视力筛查助手',
      path: '/page/tabBar/screen/screen',
      imageUrl: "/image/logo.png",
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  }
})