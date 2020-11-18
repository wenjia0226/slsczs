// my.js
const app = getApp();
Page({
  data:{
    phone: false,
    phoneNum: '',
    avatarUrl: '',
    nickName: '',
    code: '',
    tabbar: {},
    height: app.globalData.navHeight,
    selectArray:[],
    studentName: '无',
    gender: 2,
    balance: '',
    show: false,
    tempFlag: 2
  },
  onLoad() {
    app.hidetabbar();
    app.editTabbar();
    this.getChildrenList();
    this.setData({
      phone: wx.getStorageSync('phone')
    })
  
  },
  gotoCode() {
    wx.navigateTo({
      url: '/page/myCollection/pages/studentCode/studentCode?studentId=' + this.data.studentId,
    })
  },
  gotoAdd() {
    if (this.data.phone) {
      this.hideview()
    } else {

      wx.navigateTo({
        url: '/nicheng/nicheng',
      })
    }
  },
  
  onShow() {
    this.setData({
      phone: wx.getStorageSync('phone'),
      tempFlag: wx.getStorageSync('tempFlag')
    })
    if(this.data.tempFlag == 2) {
  //  app.hidetabbar();
      this.setData({
        studentId: wx.getStorageSync('studentId')
      })
      if (this.data.studentId) {
        this.setData({
          studentName: wx.getStorageSync('studentName'),
          gender: wx.getStorageSync('gender'),
          balance: wx.getStorageSync('balance')
        })
      } else {
        this.setData({
          studentName: "暂无绑定",
          gender: 2
        })
      }
      this.getPhone();
      wx.login({
        success: (res) => {
          this.setData({
            code: res.code
          })
        }
      })
      this.setData({
        avatarUrl: wx.getStorageSync('avatarUrl'),
        nickName: wx.getStorageSync('nickName')
      })
      this.getChildrenList()
  }else if (this.data.tempFlag == 1) {
    this.setData({ //如果是3 ，说明临时没测，直接跳到我的页面了
      tempFlag: 3
    })
    wx.setStorageSync('studentName', '');
    wx.setStorageSync('studentId', '');
    wx.setStorageSync('selectRankStu', '');
    wx.setStorageSync('gender', '');
    wx.setStorageSync('tempFlag', 2);
    this.getChildrenList()
  }
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenIntegral", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (this.data.phone) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        
        if (res.data.data) {
          res.data.data.push({
            name: '添加孩子'
          })
        }
        if (res.data.status == 200) {
          that.setData({
            selectArray: res.data.data
          })
          if(that.data.tempFlag == 3) {
            wx.setStorageSync('studentName', that.data.selectArray[0].name);
            wx.setStorageSync('studentId', that.data.selectArray[0].id);
            wx.setStorageSync('gender', that.data.selectArray[0].gender)
          }
        }else if(res.data.status == 10220) {
          let arr = [];
          arr.push({
            name: '添加孩子' 
          })
          that.setData({
            selectArray:arr
          })
        }
      })
    }
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params,
      gender: e.detail.gender
    })
  },
  newchildrenlist(e) {
    let curStudent = e.detail.newChildrenList;
    this.setData({
      selectArray: e.detail.newChildrenList
    })
    this.setData({
      studentId: curStudent[0].id,
      studentName: curStudent[0].name,
      birthday: curStudent[0].birthday,
      gender: curStudent[0].gender,
      balance: curStudent[0].balance,
      ranking: curStudent[0].rankings

    })
    wx.setStorageSync('studentName', curStudent[0].name);
    wx.setStorageSync('studentId', curStudent[0].id);
    wx.setStorageSync('selectRankStu', curStudent[0].id);
    wx.setStorageSync('gender', curStudent[0].gender);
    wx.setStorageSync('birthday', curStudent[0].birthday);
    wx.setStorageSync('balance', curStudent[0].balance);
    wx.setStorageSync('ranking', curStudent[0].ranking)
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
    if(this.data.phone) {
      this.OneMoreGet();
    }else {
      this.gotoLogin();
    }
  },
  goToQu() {
    if (this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/diopter/diopter'
      })
    } else {
      this.gotoLogin();
    }
  },
  goToShai() {
    if (this.data.phone) {
      
      wx.navigateTo({
        url: '/page/myCollection/pages/archives/archives'
      })
    } else {
      this.gotoLogin();
    }
  },
  gotoAnswer() {
    if (this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/answer/answer'
      })
    } else {
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
  gotoMyChild() {
    if(this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/childrenManage/childrenManage'
      })
    }else {
     this.gotoLogin()
    }
  },
  gotoRank() {
    if (this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/ranking/ranking'
      })
    } else {
      this.gotoLogin()
    }
  },
  goToBao() {
    if (this.data.phone) {
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
  gotoPing() {
    if (this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/assessment/assessment'
      })
    } else {
      this.gotoLogin()
    }
  },
  gotoshare() {
    wx.navigateTo({
      url: '/page/myCollection/pages/corparation/corparation'
    })
  },
  checkLogin() {
    let that = this;
    let url = app.globalData.URL + 'chkState';
    let data = {
      openId: wx.getStorageSync('openId')
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      console.log(res)
      if (res.data.status == 200) {
        wx.switchTab({
          url: '/survey/survey'
        })
        that.setData({
          isLogin: true
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  goTeacher() {
    if (this.data.phone) {
    let that = this;
    let url = app.globalData.URL + 'chkState';
    let data = {
      openId: wx.getStorageSync('openId')
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        wx.navigateTo({
          url: '/page/myCollection/pages/survey/survey'
        })
      }else if(res.data.status == 10227) {
        wx.navigateTo({
          url: '/page/myCollection/pages/teacherLogin/teacherLogin'
        })
      }
    }, (err) => {
      console.log(err)
    })
    } else {
      this.gotoLogin();
    }
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
              //console.log(res)
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
  goClert() {
    if (this.data.phone) {
      let that = this;
      let url = app.globalData.URL + 'chkClert';
      let data = {
        openId: wx.getStorageSync('openId')
      }
      wx.showLoading({
        title: '加载中...',
      })
      app.wxRequest(url, data, (res) => {
        if (res.data.status == 200) {
          wx.navigateTo({
            url: '/page/myCollection/pages/clertMain/clertMain'
          })
        } else if (res.data.status == 10227) {
          wx.navigateTo({
            url: '/page/myCollection/pages/clertLogin/clertLogin'
          })
        }
      }, (err) => {
        console.log(err)
      })
    } else {
      this.gotoLogin();
    }
  },
  hideview() {
    this.setData({
      show: true
    })
  },
  hide() {
    this.setData({
      show: false
    })
  },
  // 手动添加
  gotoManu() {
    wx.showToast({
      title: '暂未开启该功能',
    })
    // wx.navigateTo({
    //   url: '/manual/manual'
    // })
    //this.hide();
  },
  //扫码添加
  gotoScan() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        var str = res.path;
        let stuId = str.split('=')[1];
        //获取到学生id后添加孩子
        wx.setStorageSync('studentId', stuId);
        wx.setStorageSync('selectRankStu', stuId);
        let openId = wx.getStorageSync('openId');
        let url = app.globalData.URL + 'binding', data = {
          studentId: stuId,
          openId: wx.getStorageSync('openId')
        };
        wx.showLoading({
          title: '加载中...',
        })
        app.wxRequest(url, data, (res) => {
         // console.log(res)
          res.data.data.push({
            name: '添加孩子'
          })
          that.setData({
            selectArray: res.data.data,
            childrenList: res.data.data,
            show: false
          })
          let curStudent = that.data.childrenList;
          that.setData({
            studentId: curStudent[0].id,
            studentName: curStudent[0].name,
            birthday: curStudent[0].birthday,
            gender: curStudent[0].gender,
            balance: curStudent[0].balance,
            ranking: curStudent[0].ranking
          })
          wx.setStorageSync('studentName', curStudent[0].name);
          wx.setStorageSync('studentId', curStudent[0].id);
          wx.setStorageSync('selectRankStu', curStudent[0].id);
          wx.setStorageSync('gender', Number(curStudent[0].gender));
          wx.setStorageSync('birthday', curStudent[0].birthday);
          wx.setStorageSync('balance', curStudent[0].balance);
          wx.setStorageSync('ranking', curStudent[0].ranking);
          wx.navigateTo({
            url: '/page/tabBar/my/my'
          })
        }, (err) => {
          console.log(err)
        })
      }
    })
  }
  
})