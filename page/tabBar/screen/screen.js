// screen.js
const app = getApp();
Page({
  data: {
    childrenList: [],
    currentIndex: 0,
    studentId: '',
    result: '',
    statusBarHeight: '', 
    navTop: '', 
    navHeight: ''
  },
 
  onShow() {
    let that = this;
    this.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      navTop: app.globalData.navTop,
      navHeight: app.globalData.navHeight
    })
    // console.log(app.globalData.navHeight)
    let url = app.globalData.URL + "childrenList", data = { openId: wx.getStorageSync('openId')};
    //如果已经授权过
    if(wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        if (res.data.status == 200) { 
          //  console.log(res)     
          if(res.data.data) {
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
            gender: "",
            lastTime: '',
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
            childrenList: res.data.data
          })
          // wx.setStorageSync('childLength', that.data.childrenList.length);
          let childList = that.data.childrenList;
          wx.setStorageSync('studentId', childList[0].id);
        } else {     
          that.setData({
            childrenList: []
          })
        }
      }else {
          that.setData({
            childrenList: []
          })
      }
    }, (err) => {
        console.log(err)
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
    }
  },
  // 跳转到添加孩子页面
  gotoAddChild() {
    let that = this;
    if(wx.getStorageSync('phone')) {
      wx.showModal({
        title: '添加孩子',
        content: '是否进行扫码添加孩子？',
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
                    childrenList: res.data.data
                  })
                  wx.setStorageSync('childLength', that.data.childrenList.length)
                  wx.switchTab({
                    url: '/page/tabBar/screen/screen'
                  })
                }, (err) => {
                  console.log(err)
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
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
    wx.setStorageSync('detectType', e.currentTarget.dataset.detecttype);
    if (wx.getStorageSync('phone')) {
      if(wx.getStorageSync('studentId') !== 2) {
      if (this.data.childrenList.length == 0) {
        wx.showToast({
          title: '请先添加孩子',
          icon: 'none',
          duration: 2000
        })
        return;
      } else {
        wx.navigateTo({
          url: '/page/component/pages/check/check'
        })
      }
    } 
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
  }
})