// page/myCollection//pages/clertPage/clertPage.js
// screen.js
const app = getApp();
Page({
  data: {
    productList: [],
    page: 1,
    pageSize: 9,
    hasMoreData: true,
  },
  onLoad() {
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
  getScanList() {
    let that =this;
    wx.scanCode({  //扫码
      success(res) {
        let id = res.result;
        let url = app.globalData.URL + "clertSanningCode", data = { id: id, openId: wx.getStorageSync('openId') };
        wx.showLoading({
          title: '加载中...'
        })
        app.wxRequest(url, data, (res) => {
           console.log(res)
          if (res.data.status == 200) {
            that.setData({
              productList: [],
              page: 1
            })
            that.productList();
          }
        })
      }
    }) 
  },
  productList() {
    let that = this;
    let url = app.globalData.URL + "sanningCodeList", data = { page: this.data.page, openId: wx.getStorageSync('openId') };
    wx.showLoading({
      title: '加载中...'
    })
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        var contentlist = res.data.data;
        var productList = that.data.productList;
        if (that.data.page == 1) {
          productList = []
        }
        console.log(productList, 999)
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