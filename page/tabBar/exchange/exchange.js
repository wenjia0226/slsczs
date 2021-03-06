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
    current: 0,
    tabbar: {},
    tempFlag: 2
  },
  // 商品轮播
  swiperChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  gotoSearch() {
    wx.navigateTo({
      url: '/page/exchange/pages/shopSearch/shopSearch'
    })
  },
  gotoDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/exchange/pages/shopDetail/shopDetail?produtId=' + id
    })
  },
  onLoad: function (options) {
    app.hidetabbar();
    app.editTabbar();
  },
  onShow() {
      //app.hidetabbar();
     this.setData({
       tempFlag: wx.getStorageSync('tempFlag')
     })
    if (this.data.tempFlag == 1) {
      this.setData({
        tempFlag: 2
      })
      wx.setStorageSync('studentName', '');
      wx.setStorageSync('studentId', '');
      wx.setStorageSync('gender', '');
      wx.setStorageSync('tempFlag', 2);
    } 
    this.getInfo();
    this.setData({
      page: 1,
      productList: []
    })
    this.productList();
  },
  //商品列表
  productList() {
    let that = this;
    let url = app.globalData.URL + "productList", data = {page: this.data.page};
    app.wxRequest(url, data, (res) => {
      //  console.log(res)
      if (res.data.status == 200) {
          var contentlist = res.data.data;
          var productList = that.data.productList;
          if (that.data.page == 1) {
            productList = []
          }
        var productList = that.data.productList;
          if (contentlist.length <= that.data.pageSize) {                                                                  that.setData({
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
  //首页轮播图
  getInfo: function () {
    let that = this;
    let url = app.globalData.URL + "rotationPicList",data = {};
    //如果已经授权过
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        that.setData({
          swiperList: res.data.data
        })
      })
    }
}) 
