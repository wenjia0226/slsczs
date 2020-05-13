const app = getApp();
Page({
  data: {
    childrenList: [],
    checkbox: [],
    collectionId: [],
    listCollection: [],
    display: false,
    checkboxall: "/image/nocheck.png"
  },
  onShow() {
    let that = this;
    let url = app.globalData.URL + "untask", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        if (res.data.status == 200) {
          that.setData({
            childrenList: res.data.data
          })
          for (var i = 0; i < that.data.childrenList.length; i++) {
            that.data.checkbox.push('/image/nocheck.png')
          }
          that.setData({
            display: !that.data.display,
            checkbox: that.data.checkbox
          })
        }
      })
    }
  },
  // 单选多选
  sty_background: function (e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    var checkbox = this.data.checkbox;
    let that = this;
    if (checkbox[index] == '/image/nocheck.png') {
      checkbox[index] = '/image/checked.png';
      that.data.collectionId.push(that.data.childrenList[index].id)
    } else {
      checkbox[index] = '/image/nocheck.png';
      let stuMap = that.data.collectionId
      let newResult = stuMap.filter((item) => {
        return item !== id
      })
      that.setData({
        collectionId: newResult
      })
    }
    that.setData({
      checkbox: checkbox,
      collectionId: that.data.collectionId
    })
    // 全选按钮
    if (this.data.collectionId.length !== that.data.checkbox.length) {
      this.setData({
        checkboxall: '/image/nocheck.png'
      })
    } else {
      this.setData({
        checkboxall: '/image/checked.png'
      })
    }
  },
  // 全选
  all_choice: function () {
    var that = this;
    if (that.data.checkboxall == "/image/nocheck.png") {
      for (var i = 0; i < that.data.childrenList.length; i++) {
        that.data.checkbox[i] = ('/image/checked.png')
        that.data.collectionId[i] = that.data.childrenList[i].id
      }
      that.data.checkboxall = "/image/checked.png"
    } else {
      for (var i = 0; i < that.data.childrenList.length; i++) {
        that.data.checkbox[i] = ('/image/nocheck.png')
      }
      that.data.collectionId = [];
      that.data.checkboxall = "/image/nocheck.png"
    }
    that.setData({
      checkbox: that.data.checkbox,
      checkboxall: that.data.checkboxall,
      collectionId: that.data.collectionId
    })
  },
  //提醒学生
  alertStudent() {
    let that = this;
    if (that.data.collectionId.length <= 0) {
      wx.showModal({
        title: '',
        content: '请先选择学生',
      })
      return;
    }
    let url = app.globalData.URL + "remindUntask", data = { id: [617] };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        that.setData({
          collectionId: []
        })
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '提醒成功',
            icon: 'success',
            duration: 2000
          })
          for (var i = 0; i < that.data.childrenList.length; i++) {
            that.data.checkbox[i] = ('/image/nocheck.png')
          }
          that.data.checkboxall = "/image/nocheck.png";
          that.setData({
            checkbox: that.data.checkbox,
            checkboxall: that.data.checkboxall,
            collectionId: []
          })
        }
      })
    }
  }
})