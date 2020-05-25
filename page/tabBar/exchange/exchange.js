const app = getApp();
Page({
  data: {
    navTop: app.globalData.navTop,
    height: app.globalData.menuHeight,
    page: 1,
    pageSize: 9,
    hasMoreData: true,
    swiperList: [],
    productList: [],
    current: 0
  },
  // 商品轮播
  swiperChange: function (e) {
    if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current
      })
    }
  },
  gotoSearch() {
    wx.navigateTo({
      url: '/page/exchange/pages/shopSearch/shopSearch'
    })
  },
  gotoDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync('productId', id)
    wx.navigateTo({
      url: '/page/exchange/pages/shopDetail/shopDetail'
    })
  },
  onLoad: function (options) {
    this.getInfo(); //首页轮播图
  },
  onShow() {
    this.setData({
      page: 1,
      productList: []
    })
    this.productList()
  },
  //商品列表
  productList() {
    let that = this;
    let url = app.globalData.URL + "productList", data = {page: this.data.page};
    app.wxRequest(url, data, (res) => {
      // console.log(res)
      if (res.data.status == 200) {
          var contentlist = res.data.data;
          var productList = that.data.productList;
          if (that.data.page == 1) {
            productList = []
          }
        var productList = that.data.productList;
          if (contentlist.length <= that.data.pageSize) {                                                                                                           that.setData({
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

  },
  onPullDownRefresh: function () {
    // console.log('onPullDonwFresh')
    let that = this;
    wx.stopPullDownRefresh();
    setTimeout(function () {
      this.setData({
        productList: []
      })
      this.data.page = 1;
      this.productList();
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
  //首页轮播图
  getInfo: function () {
    let that = this;
    let url = app.globalData.URL + "rotationPicList",data = {};
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        console.log(res)
        that.setData({
          swiperList: res.data.data
        })
      })
    }
  }
}) 
