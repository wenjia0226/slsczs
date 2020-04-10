// my.js
const app = getApp();
Page({
  data:{
    phone: false,
    phoneNum: '',
    avatarUrl: '',
    nickName: '',
    code: ''
  },
  onShow() {
    this.getPhone();
    wx.login({
      success: (res) => {
        this.setData({
          code: res.code
        })
      }
    })
      this.setData({
        phone: wx.getStorageSync('phone'),
        avatarUrl: wx.getStorageSync('avatarUrl'),
        nickName: wx.getStorageSync('nickName')
      })
  },
  getPhone() {
    let that = this;
    let openId = wx.getStorageSync('openId');
    let url = app.globalData.URL + 'mine', data = {
      openId: wx.getStorageSync('openId')
    };
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      if(res.data.data) {
        that.setData({
          phoneNum: res.data.data.phone
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  gotoQian() {
    if(wx.getStorageSync('phone')) {
      this.OneMoreGet();
    }else {
      this.gotoLogin();
    }
  },
  OneMoreGet() {
    let data = { openId: wx.getStorageSync('openId') };
    let url = app.globalData.URL + 'signin';
    app.wxRequest(url, data, (res) => {
      if(res.data.status == 10200) {
      wx.showModal({
        title: res.data.msg,
        content: '若要获取更多积分，完成爱眼计划',
        showCancel: true,//是否显示取消按钮
        cancelText: "以后再说",//默认是“取消”
        // cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "现在就去",//默认是“确定”
        // confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          }else {
            //点击确定
            wx.navigateTo({
              url: '/page/myCollection/pages/plan/plan',
            })
          }
        }
      })
      }else if(res.data.status == 200) {
        wx.showModal({
          title: res.data.msg,
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
              wx.navigateTo({
                url: '/page/myCollection/pages/plan/plan',
              })
            }
          }
        })
      }
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
    if (wx.getStorageSync('phone')) {
      wx.navigateTo({
        url: '/page/myCollection/pages/reportList/reportList'
      })
    }else {
      this.gotoLogin()
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
  },
  getPhoneNumber(e) {
    var msg = e.detail.errMsg, that = this;
    var that = this;
    
    // var sessionID = wx.getStorageSync('session_key'),
    let encryptedData = e.detail.encryptedData,
     code = that.data.code,
      iv = e.detail.iv;

    if (msg == 'getPhoneNumber:ok') {
      wx.checkSession({
        success: function () {
          //调用自己的登录接口
         
          // that.getPhone(code, encryptedDataStr, iv);
          let url = app.globalData.URL + 'bindingPhone';
          let data = {
            encryptedData: encryptedData,
            iv: iv,
            code: code,
            openId: wx.getStorageSync('openId')
          };
          wx.showLoading({
            title: '加载中...',
          })
          app.wxRequest(url, data, (res) => {
            if (res.data.status == 200) {
              console.log(res)
              that.setData({
                phoneNum: res.data.data
              })
              wx.switchTab({
                url: '/page/tabBar/my/my'
              })
            }
          }, (err) => {
            console.log(err)
          })
        },
        fail: function (err) {
          console.log(err)
          // wx.login({
          //   success: res => {
          //     console.log(res, 'sessionkey过期')
          //   }
          // })
        }
      })
    } else {
      wx.showModal({
        title: '',
        content: '请先授权',
      })
    }
  },
  //登录
  // getPhone(code, encryptedData, iv) {
  //   console.log(that.data.code, 999)
  //   let that = this;
  //   let url = app.globalData.URL + 'bindingPhone';
  //   let data = {
  //     encryptedData: encryptedData,
  //     iv: iv,
  //     code: code,
  //     openId: wx.getStorageSync('openId')
  //   };
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   app.wxRequest(url, data, (res) => {
  //     if (res.data.status == 200) {
  //     //  console.log(res)
  //      that.setData({
  //        phoneNum: res.data.data
  //      })
  //       wx.switchTab({
  //         url: '/page/tabBar/my/my'
  //       })
  //     }
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }
})