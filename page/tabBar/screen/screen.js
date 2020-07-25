 // screen.js
const app = getApp();
Page({
  data: {
    childrenList: [],
    currentIndex: 0,
    studentId: '',
    result: '',
    scale: '',
    statusBarHeight: '', 
    height: app.globalData.navHeight,
    flag: false,
    hideWarn: {},
    isShow: true,
    showModalStatus: false,  //关注公众号标志位
    reuploadFlag: false, //  重复上传标志位
    tabbar: {},
    show: false,
    reminShow: false,
    phone: wx.getStorageSync('phone')
  },
  hideRemin() {
    this.setData({
      reminShow: false
    })
  },
  showRemin() {
    this.setData({
      reminShow: true
    })
  },
  onLoad() {
     app.hidetabbar();
    app.editTabbar();
  },
  gotoCheck() {
    wx.navigateTo({
      url: '/page/component/pages/check/check',
    })
  },
  gotoStart() {
    wx.setStorageSync('scale', this.data.scale)
    wx.navigateTo({
      url: '/page/component/pages/check/check',
    })
  },
  //关注公众号
  followBtn() {
    this.setData({
      showModalStatus: false
    })
    wx.navigateTo({
      url: "/page/myCollection/pages/webview/webview"
    });
  },
  hideWarning() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })
    animation.opacity(0).step();
    wx.setStorageSync('isShow', false)
    this.setData({
      hideWarn: animation.export(),
      
    })  
  },
  onShow() {
    //app.hidetabbar();
    let that = this;
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      navTop: app.globalData.navTop,
      navHeight: app.globalData.navHeight,
      flag: false,
      phone: wx.getStorageSync('phone')
    })
    if (wx.getStorageSync('isShow') === false) {
      this.setData({
        isShow: wx.getStorageSync('isShow')
      })
    }
    this.getChildrenList();
    this.showGuanzhu();
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenList", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (that.data.phone) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        // console.log(res)
        if (res.data.status == 200) {
          that.setData({
            childrenList: res.data.data
          })
          that.data.childrenList.push({
            age: 8,
            birthday: "2019-04-01",
            chairHeight: "60",
            classesId: 42,
            classesName: "二（3）班",
            correct: 0,
            description: "",
            gender: 2,
            lastTime: '',
            height: "125",
            id: "",
            name: "添加孩子",
            nature: "无",
            parentPhone: "18311192425",
            regionId: 1,
            regionName: "唐山",
            schoolId: 50,
            schoolName: "唐山市师范附属小学",
            sittingHeight: "105.0",
            weight: "22.34",
            lastTime: null
          })
          that.setData({
            childrenList: that.data.childrenList
          })
         
        let childrenList = res.data.data;
         childrenList.forEach((item) => {
           if (item.myIntegral == null) {
             item.myIntegral = 0
           }
         })
          that.setData({
            childrenList: childrenList
          })
        that.data.childrenList.forEach((item, index) => {
           if(item.id == wx.getStorageSync('studentId')) {
             that.setData({
               currentIndex: index
             })
           }
         })
        if (that.data.currentIndex == 0) {
          wx.setStorageSync('studentId', that.data.childrenList[0].id)
        }
        }
        if (res.data.status == 10220) {
          that.setData({
            childrenList: []
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  },
  showGuanzhu() {
    let that = this;
    let url = app.globalData.URL + "chkGzh", data = { openId: wx.getStorageSync('openId') };
    if (that.data.phone) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
      //  console.log(res)
        if (res.data.status == 200) {
          that.setData({
            showModalStatus: false
          }) 
        } else if (res.data.status == 10228) {
          that.setData({
            showModalStatus: true
          })
        }
      })
    }    
  },
  //确定当前孩子具体是哪个
  activeNav: function (e) {
    let that = this;
    this.setData({
      currentIndex: e.detail.current
    })
    if(that.data.childrenList) {
      let student = this.data.childrenList.filter((item, index) => { return index == that.data.currentIndex });
      wx.setStorageSync('studentId', student[0].id)
      wx.setStorageSync('studentName', student[0].name)
    }
  },
  getItem(e) {
    let that = this;
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
  },
  gotoAdd() {
    if(this.data.phone) {
      this.hideview()
    }else {
      wx.navigateTo({
        url: '/nicheng/nicheng',
      })
    }
  },
  // 跳转到添加孩子页面
  gotoAddChild() {
    let that = this;
    if(wx.getStorageSync('phone')) {
      wx.showModal({
        title: '添加孩子',
        content: '是否进行扫码添加孩子？',
        cancelText: "手动添加",
        confirmText: "扫码添加", 
        success(res) {
          if (res.confirm) {
            wx.scanCode({  //扫码
              success(res) {
                var str = res.path;
                let stuId = str.split('=')[1];   
                //获取到学生id后添加孩子
                wx.setStorageSync('studentId', stuId);
                let openId = wx.getStorageSync('openId');
                let url = app.globalData.URL + 'binding', data = {
                  studentId: stuId,
                  openId: wx.getStorageSync('openId')
                };
                wx.showLoading({
                  title: '加载中...',
                })
                  app.wxRequest(url, data, (res) => {
                  that.setData({
                    childrenList: res.data.data
                  })
                  that.data.childrenList.push({
                    age: 8,
                    birthday: "2019-04-01",
                    chairHeight: "60",
                    classesId: 42,
                    classesName: "二（3）班",
                    correct: 0,
                    description: "",
                    gender: 1,
                    height: "125",
                    id: 2,
                    name: "新增",
                    nature: "无",
                    parentPhone: "18311192425",
                    regionId: 1,
                    regionName: "唐山",
                    schoolId: 50,
                    schoolName: "唐山市师范附属小学",
                    sittingHeight: "105.0",
                    weight: "22.34"
                  })
                  that.setData({
                    childrenList: res.data.data,
                  })
                  
                  // wx.setStorageSync('childLength', that.data.childrenList.length)
                  wx.switchTab({
                    url: '/page/tabBar/screen/screen'
                  })
                }, (err) => {
                  console.log(err)
                })
              }
            })
          } else if (res.cancel) {  // 跳转到手动添加
             wx.navigateTo({
              url: '/manual/manual',
            })
          }
        }
      })
      // 如果没登录跳转到登录页
    }else {
      wx.navigateTo({
        url: '/nicheng/nicheng'
      })
    }
  },
  //跳转到自我校准
  goJozhun(e) {
    let that = this;
      this.setData({
        reuploadFlag: true
      })
      wx.setStorageSync('detectType', e.currentTarget.dataset.detecttype);
      wx.setStorageSync('reuploadFlag',  this.data.reuploadFlag);
      if (wx.getStorageSync('phone')) {
        let openId = wx.getStorageSync('openId');
        let url = app.globalData.URL + 'chkCalibration', data = {
          openId: wx.getStorageSync('openId')
        };
        wx.showLoading({
          title: '加载中...',
        })
        app.wxRequest(url, data, (res) => {
          if(res.data.data == null) {
            wx.navigateTo({
              url: '/page/component/pages/check/check'
            })
          }else {
            that.setData({
              scale: res.data.data
            })
            that.showRemin();
          //   wx.showModal({
          //   title: '提示',
          //   content: '是否使用上次校验数据',
          //   cancelText: "重新校验",
          //   confirmText: "是",
          //   success: function(res) {
          //     if (res.confirm) {
          //       wx.setStorageSync('scale', scale)
          //       wx.navigateTo({
          //         url: '/page/component/pages/start/start',
          //       })
          //     }else if(res.cancel) {
          //       wx.navigateTo({
          //         url: '/page/component/pages/check/check',
          //       })
          //     }
          //   } 
          // })
        }
          })
         
        // } 
      }else {
        wx.navigateTo({
          url: '/nicheng/nicheng'
        })
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
  gotoChildrenDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/component/pages/mychildren/mychildren?id=' + id,
    })
  },
  hideYindao() {
    this.setData({
      showModalStatus: false
    })
  },
  gotoH5() {
    let url = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxMTkxMjg5NQ==&scene=124#wechat_redirect'
    wx.navigateTo({
      url: '/page/myCollection/pages/webview/webview?url=' + url,
    })
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
    wx.navigateTo({
      url: '/manual/manual'
    })
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
        let openId = wx.getStorageSync('openId');
        let url = app.globalData.URL + 'binding', data = {
          studentId: stuId,
          openId: wx.getStorageSync('openId')
        };
        wx.showLoading({
          title: '加载中...',
        })
        app.wxRequest(url, data, (res) => {
          console.log(res)
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
          wx.setStorageSync('gender', curStudent[0].gender);
          wx.setStorageSync('birthday', curStudent[0].birthday);
          wx.setStorageSync('balance', curStudent[0].balance);
          wx.setStorageSync('ranking', curStudent[0].ranking);
          wx.navigateTo({
            url: '/page/tabBar/screen/screen'
          })
        }, (err) => {
          console.log(err)
        })
      }
    })
  }
})