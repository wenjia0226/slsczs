// page/tabBar/eyeShow/eyeShow.js
const app = getApp();
Page({
  data: {
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '爱眼秀',
    },
    avatarUrl: '',
    nickName: '',
    page: 1,
    pageSize: 5,
    content: []
  },
  onPullDownRefresh: function () {
    let that = this;
    wx.stopPullDownRefresh();
    setTimeout(function () {
      this.setData({
        page: 1
      })
      this.getXiuList();
    }, 500);
  },
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getXiuList();
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  getXiuList() {
    let that = this;
    let url = app.globalData.URL + "momentsList",
      data = {
        page: that.data.page
      };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      // app.wxRequest(url, data, (res) => {
      //   that.setData({
      //     content: res.data.data
      //   })
      // })
      app.wxRequest(url, data, (res) => {
        console.log(res)
        if (res.data.status == 200) {
          var resCurrent = res.data.data;
          let content = that.data.content;
          if (that.data.page == 1) {
            content = []
          }
          if (resCurrent.length < this.data.pageSize) {
            that.setData({
              hasMoreData: false,
              content: content.concat(resCurrent),
            })
          } else {
            that.setData({
              content: content.concat(resCurrent),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: '出现异常',
            icon: 'none'
          })
        }
      })
    }
  },
  onShow() {
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      nickName: wx.getStorageSync('nickName')
    })
    this.getXiuList();
  },
  gotoMyShow() {
    wx.navigateTo({
      url: '/page/myCollection/pages/myShow/myShow',
    })
  }

})