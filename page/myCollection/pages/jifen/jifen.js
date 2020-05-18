// pages/jifen/jifen.js
const app = getApp();
Page({
  data: {
    jifenList: [],
    balance: '',
    expenditure: '',
    income: '',
    state: '',
    type: 0,
    show: false,
    currentIndex: 0,
    currentStudentId: '',
    childrenList: []
  },
  onShow: function (options) {
    if(wx.getStorageSync('phone')) {
    this.getChildrenList(); 
    }
  },
  // 获取当前学生的积分情况
  currentStudentCode() {
    if (this.data.currentStudentId !== '') {
      wx.showLoading({
        title: '加载中...',
      })
      let that = this;
      let url = app.globalData.URL + 'integralList', data = {
        studentId: this.data.currentStudentId
      };
      app.wxRequest(url, data, (res) => {
        that.setData({
          jifenList: res.data.data.data,
          balance: res.data.data.balance,
          income: res.data.data.income,
          expenditure: res.data.data.expenditure
        })
      }, (err) => {
        console.log(err)
      })
    }
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
        if (res.data.status == 200) {
          that.setData({
            childrenList: res.data.data,
            currentStudentId: res.data.data[0].id
          })
          this.currentStudentCode();
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
  //确定当前孩子具体是哪个
  activeNav: function (e) {
    let that = this;
    this.setData({
      currentIndex: e.detail.current
    })
    if (that.data.childrenList) {
      let student = this.data.childrenList.filter((item, index) => { if (index == that.data.currentIndex) return item  });
      that.setData({
        currentStudentId: student[0].id
      })
      this.currentStudentCode();
    }
  },
  //切换
  switch(e) {
    this.setData({
      type: e.currentTarget.dataset.type
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
  gotoGongLve() {
    wx.showToast({
      title: '正在开发，敬请期待',
      icon: 'none',
      duration: 2000
    })
  }

})