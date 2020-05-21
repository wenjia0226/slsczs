const app = getApp();
Page({
  data: {
    navTop: app.globalData.navTop,
    height: app.globalData.menuHeight,
    page: 1,
    pageSize: 1,
    hasMoreData: true,
    swiperList: [],
    productList: []
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
        // if (that.data.page == 1) {
        //   contentlist = []
        // }
        // console.log(contentlist)
        var productList = that.data.productList;
          if (contentlist.length <= that.data.pageSize) {                                                                                                           that.setData({
              hasMoreData: false,
              productList: contentlist.concat(productList),
            })
          } else {
            that.setData({
              productList: contentlist.concat(productList),
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
    this.data.page = 1;
    this.productList();
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
    // console.log(wx.getStorageSync('phone'))
    if (1) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        // console.log(res)
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
