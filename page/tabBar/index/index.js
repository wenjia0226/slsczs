// index.js
const app = getApp();
Page({
  data: {
    tabbar: {},
    height: app.globalData.navHeight,
    selectArray: [],
    studentName: '',
    childrenList: []
  },
  onLoad() {
    app.editTabbar();
    this.getChildrenList();
  },
  onShow() {
    this.setData({
      studentName: wx.getStorageSync('studentName')
    })
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params
    })
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
        console.log(res)
        res.data.data.push({
          name: '添加孩子'
        })
        if (res.data.status == 200) {
          that.setData({
            selectArray: res.data.data
          })
        }
      })
    }
  },
}) 