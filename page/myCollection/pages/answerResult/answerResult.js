// answerResult/answerResult.js
const app = getApp();
Page({

  data: {
    avatarUrl:'',
    nickName: '',
    rightAnswer: 0,
    msg: '',
    showCongratulation: false,
    studentId: '',
    studentName: '',
    showSelectPerson: true,
    balance: ''
  },
  voidRight() {
    const rightContext = wx.createInnerAudioContext();
    rightContext.autoplay = true
    rightContext.src = '/image/win.mp3'
    rightContext.onPlay(() => {
    })
    rightContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  onShow(options) {
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      studentName: wx.getStorageSync('studentName'),
      rightAnswer: wx.getStorageSync('rightAnswer'),
      studentId: wx.getStorageSync('studentId'),
      balance: wx.getStorageSync('balance'),
      gender: wx.getStorageSync('gender')
    })
   this.getChildrenList();
  },
  submitAnwser() {
    this.setData({
      showSelectPerson: false
    })
    let that = this;
    if(that.data.studentId) {
    let url = app.globalData.URL + 'answerSubmit';
    let data = {
      studentId: wx.getStorageSync('studentId'),
      number: this.data.rightAnswer
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        that.voidRight();
        that.setData({
          msg: '恭喜您获得' + that.data.rightAnswer + '个爱眼币',
          showCongratulation: true
        })
      } else {
        that.setData({
          msg: res.data.msg
        })
      }
    }) 
    }else {
      wx.showToast({
        title: '请先选择孩子',
      })
    }
  },
  gotoShopping() {
    wx.switchTab({
      url: '/page/tabBar/exchange/exchange',
    })
  },
  gotoIndex() {
    wx.switchTab({
      url: '/page/tabBar/index/index',
    })
  },
  gotobi() {
    wx.navigateTo({
      url: '/page/myCollection/pages/jifen/jifen'
    })
    this.setData({
      showCongratulation: false
    })
  },
  // 隐藏恭喜页面
  hideview() {
    this.setData({
      showCongratulation: false
    })
  },
  /// 隐藏选择孩子
  hide() {
    this.setData({
      showSelectPerson: false
    })
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenIntegral", data = { openId: wx.getStorageSync('openId') };
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
      if (res.data.status == 200) {
        that.setData({
          selectArray: res.data.data,
          childrenList: res.data.data
        })

        if (that.data.studentId == '') {
          that.setData({
            studentId: res.data.data[0].id,
            gender: res.data.data[0].gender,
            balance: res.data.data[0].income,
            ranking: res.data.data[0].ranking,
            studentName: res.data.data[0].name
          })
          wx.setStorageSync('studentId', res.data.data[0].id);
          wx.setStorageSync('selectRankStu', res.data.data[0].id);
          wx.setStorageSync('gender', res.data.data[0].gender);
          wx.setStorageSync('studentName', res.data.data[0].name);
          wx.setStorageSync('birthday', res.data.data[0].birthday);
        }
      } else if (res.data.status == 10220) {
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
  myname(e) {
    this.setData({
      studentName: e.detail.studentName
    })
  },
  newchildrenlist(e) {
    let curStudent = e.detail.newChildrenList;
    this.setData({
      selectArray: e.detail.newChildrenList,
      childrenList: e.detail.newChildrenList
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
    wx.setStorageSync('selectRankStu', curStudent[0].id);
    wx.setStorageSync('gender', curStudent[0].gender);
    wx.setStorageSync('birthday', curStudent[0].birthday);
    wx.setStorageSync('balance', curStudent[0].balance);
    wx.setStorageSync('ranking', curStudent[0].ranking);
  },
  
})