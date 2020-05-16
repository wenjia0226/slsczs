const app = getApp();
Page({
  data: {
    navTop: app.globalData.navTop,
    height: app.globalData.menuHeight,
    page: 1,
    pageSize: 5,
    hasMoreData: true,
    contentlist: []  ,
    swiperList: []
  },
  gotoSearch() {
    wx.navigateTo({
      url: '/page/exchange/pages/shopSearch/shopSearch'
    })
  },
  onLoad: function (options) {
    this.getInfo();
    console.log(1)
  },
  onPullDownRefresh: function () {
    this.data.page = 1;
    this.getInfo();
  },
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getInfo();
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  getInfo: function () {
    console.log(12)
    let that = this;
    let url = app.globalData.URL + "rotationPicList",data = {};
    //如果已经授权过
    console.log(wx.getStorageSync('phone'))
    if (1) {
      wx.showLoading({
        title: '加载中...'
      })
      console.log(123)
      app.wxRequest(url, data, (res) => {
        console.log(res)
        let contentlistTem = [];
        that.setData({
          swiperList: res.data.data
        })
        // if (res.data.status == 200) {
        //     if (that.data.page == 1) {
        //       contentlistTem = []
        //     }
        //     var contentlist = res.data.data;
        //     if (contentlist.length < that.data.pageSize) {
        //       that.setData({
        //         hasMoreData: false,
        //         contentlistTem: contentlist
        //       })
        //     } else {
        //       that.setData({
        //         contentlist: contentlistTem.concat(contentlist),
        //         hasMoreData: true,
        //         page: that.data.page + 1
        //       })
        //     }
        //   } else {
        //     wx.showToast({
        //       title: '出现异常',
        //       icon: 'none'
        //     })
        //   }
      })
    }
  }
}) 
