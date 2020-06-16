
const app = getApp();
Page({
  data: {
    focus: false,
    inputValue: '',
    searchValue: '',
    navTop: app.globalData.navTop,
    height: app.globalData.menuHeight,
    page: 1,
    pageSize: 9,
    hasMoreData: true,
    swiperList: [],
    productList: [],
    page: 1
  },
  searchInput(e) {
    this.setData({
      searchValue: e.detail.value,
    })
  },
  onShow() {
    this.setData({
      page: 1
    })
  },
  search() {
    let that = this;
    // 点击搜索按钮，将之前搜索到的内容清空
    if(that.data.searchValue !== '') {
    let url = app.globalData.URL + "findProduct", data = { page: this.data.page, name: this.data.searchValue };
    app.wxRequest(url, data, (res) => {
      //  console.log(res)
      if (res.data.status == 200) {
        var contentlist = res.data.data;
        var productList = that.data.productList;
        if (that.data.page == 1) {
          productList = []
          that.setData({
            productList: []
          })
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
      } else if (res.data.status == 10231) {
        wx.showModal({
          title: res.data.msg,
          content: '',
        })
      } else {
        wx.showToast({
          title: '出现异常',
          icon: 'none'
        })
      }
    })
    }else {
      wx.showToast({
        title: '请输入搜索内容',
      })
    }
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  clearWord() {
    this.setData({
      searchValue: ''
    })
  },
  gotoDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.setStorageSync('productId', id)
    wx.navigateTo({
      url: '/page/exchange/pages/shopDetail/shopDetail'
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
      this.search();
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
      this.setData({
        page: 1
      })
    }
  },
}) 
