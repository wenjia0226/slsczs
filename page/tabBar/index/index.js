// index.js
const app = getApp();
Page({
  data: {
    tabbar: {},
    height: app.globalData.navHeight,
    selectArray: [],
    studentName: '',
    childrenList: [],
    answer: 0,
    balance: 0,
    ranking: 0,
    task: 0,
    undetected: 0,
    lastTime: '无',
    gender: 2,
    phone: wx.getStorageSync('phone'),
    studentId: '',
    show: false
  },
  onLoad() {
    this.setData({
      studentId: wx.getStorageSync('studentId'),
      studentName: wx.getStorageSync('studentName')
    })
    app.editTabbar();
  },
  onShow() { 
    this.setData({
      phone: wx.getStorageSync('phone'),
      studentName: wx.getStorageSync('studentName'),
      gender: wx.getStorageSync('gender'),
      studentId: wx.getStorageSync('studentId'),
      show: false
    })
    if (this.data.phone) {
      this.getChildrenList();
    }
  },
  login() {
    wx.navigateTo({
      url: '/nicheng/nicheng',
    })
  },
  // 添加孩子按钮
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
  getTastList() {
    let that = this;
      let url = app.globalData.URL + "firstPage", data = { studentId: this.data.studentId };
      //如果已经授权过
      if (wx.getStorageSync('phone')) {
        wx.showLoading({
          title: '加载中...'
        })
        app.wxRequest(url, data, (res) => {
          res ? res = res.data.data : '';
          that.setData({
            answer: res.answer,
            balance: res.balance,
            ranking: res.ranking,
            task: res.task,
            undetected: res.undetected,
            lastTime: res.lastTime
          })
          wx.setStorageSync('balance', res.balance)
        })
      }
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params,
      gender: e.detail.gender,
      studentId: e.detail.studentId
    })
    
    wx.setStorageSync('studentId', e.detail.studentId)
    this.getTastList();
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenIntegral", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
       console.log(res)
        if (res.data.data) {
          res.data.data.push({
            name: '添加孩子'
          })
        }
        if (res.data.status == 200) {
          that.setData({
            selectArray: res.data.data,
            childrenList: res.data.data
          })
        
          if(that.data.studentId == '') {
            that.setData({
              studentId: res.data.data[0].id,
              gender: res.data.data[0].gender,
              balance: res.data.data[0].income,
              ranking:res.data.data[0].ranking,
              studentName: res.data.data[0].name
            })
            wx.setStorageSync('studentId', res.data.data[0].id);
            wx.setStorageSync('gender', res.data.data[0].gender);
            wx.setStorageSync('studentName', res.data.data[0].name);
            wx.setStorageSync('birthday', res.data.data[0].birthday);
          }
          that.getTastList();
        }else if(res.data.status == 10220) {
          that.setData({
            childrenList: [],
            gender: 2
          })
          let arr = [];
          arr.push({
            name: '添加孩子'
          })
          that.setData({
            selectArray: arr
          })
        }
      })
  },
  addChild() {
    let  that = this;
    wx.showModal({
      title: '温馨提示',
      content: '请先绑定孩子',
      confirmText: "去绑定",
      cancelText: "取消",
      success: function(res) {
        if(res.confirm) {
          that.hideview()
        }
      }
    })
  },
  gotoShai() {
    wx.navigateTo({
      url: '/page/tabBar/screen/screen'
    })
  },
  gotoLogin(){
    wx.navigateTo({
      url: '/nicheng/nicheng',
    })
  },
  gotoTask() {
    if(this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/plan/plan'
      })
    }else {
      this.gotoLogin();
    }
  
  },
  gotoXiu() {
    wx.switchTab({
      url: '/page/tabBar/eyeShow/eyeShow'
    })
  },
  gotoAnswer() {
    wx.navigateTo({
      url: '/page/myCollection/pages/answer/answer'
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
          that.setData({
            childrenList: res.data.data
          })
          // that.data.childrenList.push({
          //   age: 8,
          //   birthday: "2019-04-01",
          //   chairHeight: "60",
          //   classesId: 42,
          //   classesName: "二（3）班",
          //   correct: 0,
          //   description: "",
          //   gender: 1,
          //   height: "125",
          //   id: 2,
          //   name: "新增",
          //   nature: "无",
          //   parentPhone: "18311192425",
          //   regionId: 1,
          //   regionName: "唐山",
          //   schoolId: 50,
          //   schoolName: "唐山市师范附属小学",
          //   sittingHeight: "105.0",
          //   weight: "22.34"
          // })
          that.setData({
            childrenList: res.data.data,
            show: false
          })
          wx.switchTab({
            url: '/page/tabBar/index/index'
          })
        }, (err) => {
          console.log(err)
        })
      }
    })
  }
}) 