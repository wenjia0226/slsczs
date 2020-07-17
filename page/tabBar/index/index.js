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
    gender:2,
    phone: wx.getStorageSync('phone')
  },
  onLoad() {
    app.editTabbar();
    
  },
  onShow() {
    this.getChildrenList();
    this.setData({
      studentName: wx.getStorageSync('studentName'),
      gender: wx.getStorageSync('gender')
    })
    this.getTastList();
  },
  gotoAdd() {

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
  getTastList(){
    let that = this;
    if(wx.getStorageSync('studentId')) {
    let url = app.globalData.URL + "firstPage", data = { studentId: wx.getStorageSync('studentId')};
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        res? res= res.data.data: '';
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
    }else {
      // 如果是新用户, 没有孩子
      this.setData({
        gender:2
      })
      console.log(this.data.gender)
    }
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params
    })
    this.getTastList();
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenList", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        if(res.data.data) {
          res.data.data.push({
            name: '添加孩子'
          })
        }
        
        if (res.data.status == 200) {
          that.setData({
            selectArray: res.data.data
          })
        }
      })
    }
  },
  gotoShai(){
    wx.navigateTo({
      url: '/page/tabBar/screen/screen'
    })
  },
  gotoTask() {
    wx.navigateTo({
      url: '/page/myCollection/pages/plan/plan'
    })
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
    this.hide();
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
            show: false
          })
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