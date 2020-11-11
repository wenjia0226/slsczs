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
    studentId: ''
  },
  onLoad() {
    app.hidetabbar();
    app.editTabbar();
  },
  onShow() { 
    this.setData({
      phone: wx.getStorageSync('phone'),
      studentName: wx.getStorageSync('studentName'),
      gender: wx.getStorageSync('gender'),
      studentId: wx.getStorageSync('studentId'),
      birthday: wx.getStorageSync('birthday'),
      balance: wx.getStorageSync('balance'),       
      ranking: wx.getStorageSync('ranking'),     
      show: false
    })
    if(!this.data.studentId) {
      this.setData({
        gender:2,
        answer: 0,
        balance: 0,
        ranking: 0,
        task: 0,
        undetected: 0,
        lastTime: "无"
      })
    }
    if (this.data.phone) {
      this.getChildrenList();
    }
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
          //console.log(res)
          res ? res = res.data.data : '';
          that.setData({
            answer: res.answer,
            balance: res.balance,
            ranking: res.ranking,
            task: res.task,
            undetected: res.undetected,
            lastTime: res.lastTime
          })
          if (that.data.lastTime == "") {
            this.setData({
              lastTime: '无'
            })
          }
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
      ranking: curStudent[0].ranking
    })
    wx.setStorageSync('studentName', curStudent[0].name);
    wx.setStorageSync('studentId', curStudent[0].id);
    wx.setStorageSync('gender', curStudent[0].gender);
    wx.setStorageSync('birthday', curStudent[0].birthday);
    wx.setStorageSync('balance', curStudent[0].balance);
    wx.setStorageSync('ranking', curStudent[0].ranking);
    this.getTastList();
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenIntegral", data = {openId: wx.getStorageSync('openId') };
    //如果已经授权过
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
      //  console.log(res)
        if (res.data.data) {
          res.data.data.push({
            name: '添加孩子'
          })
        }
        if(res.data.status == 200) {
          that.setData({
            selectArray: res.data.data,
            childrenList: res.data.data
          })  
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
    if(this.data.phone) {
    wx.navigateTo({
      url: '/page/myCollection/pages/answer/answer'
    })
    }else {
      this.login();
    }
  },
  login() {
    wx.navigateTo({
      url: '/nicheng/nicheng',
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
  },
  gotoMyBi() {
    wx.navigateTo({
      url: '/page/myCollection/pages/jifen/jifen'
    })
  },
  gotoRank() {
    wx.navigateTo({
      url: '/page/myCollection/pages/ranking/ranking'
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
          that.getTastList();
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