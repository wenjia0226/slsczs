// page/myCollection//pages/clertPage/clertPage.js
// screen.js
const app = getApp();
Page({
  data: {
    productList: [],
    page: 1,
    pageSize: 9,
    hasMoreData: true,
    studentId: ''
  },
  onLoad(options) {
    this.setData({
      studentId: options.studentId
    })
    this.productList();
  },
  onPullDownRefresh: function () {
    console.log('onPullDonwFresh')
    let that = this;
    wx.stopPullDownRefresh();
    setTimeout(function () {
      that.setData({
        productList: [],
        page: 1
      })
      that.productList();
    }, 500);
  },
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.productList();
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  exchange() {
    
  },
  productList() {
    let that = this;
    let url = app.globalData.URL + "orderShow", data = { studentId: this.data.studentId, page: this.data.page };
    wx.showLoading({
      title: '加载中...'
    })
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        var contentlist = res.data.data.content;
        var productList = that.data.productList;
        if (that.data.page == 1) {
          productList = []
        }
        var productList = that.data.productList;
        if (contentlist.length <= that.data.pageSize) {
          that.setData({
            hasMoreData: false,
            productList: productList.concat(contentlist),
          })
        } else {
          that.setData({
            productList: productList.concat(contentlist),
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

})