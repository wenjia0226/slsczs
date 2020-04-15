// pages/detail/detail.js
const app = getApp();
Page({
  data: {
    studentName: '',
    vision5Left: '',
    vision5Right: '',
    visionLeftStr: '',
    visionRightStr: '',
    distance: '',
    birthday: '',
    gender: '',
    number: '',
    beginEnd: '',
    date: '',
    processLeftList: [],
    processRightList: [],
    isSelect: 1,
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '档案详情'
    }
  },
  goBakck() {
    wx.navigateBack()
  },
  onLoad: function (option) {
    let that = this;
    let id = option.id;
    let lei = wx.getStorageSync('lei');
    let url, data = {
      id: id
    };
    if(lei == 'luo') {
      url = app.globalData.URL + 'findScreening';
    }else if(lei == 'wear') {
      url = app.globalData.URL + 'findWearScreening';
    }
    wx.showLoading({
      title: '加载中..',
    })
   
    app.wxRequest(url, data, (res) => {
      res.data.data ? res = res.data.data : '';
      // console.log(res)
      that.setData({
        studentName: res.studentName,
        vision5Left: res.vision5Left,
        vision5Right: res.vision5Right,
        visionLeftStr: res.visionLeftStr,
        visionRightStr: res.visionRightStr,
        distance: res.distance,
        number: res.number,
        beginEnd: res.beginEnd,
        birthday: res.birthday,
        date: res.date,
        gender: res.gender,
        processLeftList: res.processLeftList,
        processRightList: res.processRightList
      })
    }, (err) => {
      console.log(err)
    })
  },
  changeTab(e) {
    this.setData({
      isSelect: e.currentTarget.dataset.type
    })
    
  }
})