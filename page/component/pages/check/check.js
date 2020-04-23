// pages/check/check.js
Page({
  data: {
    num: 1,
    dataimg: '/image/check1.png',//图片地址
    distance: 0,//手指移动的距离
    scale: 1,//图片的比例
    baseWidth: null,//图片真实宽度
    baseHeight: null,//图片真实高度
    scaleWidth: '',//图片设显示宽度
    scaleHeight: '',//图片设显示高度
    flag: false
  },
  onShow() {
    let resetScale = wx.getStorageSync('resetscale');
    this.setData({
      flag: false
    })
    if(resetScale) {
      this.setData({
        scale: resetScale
      })
    }
  },
  imgload: function (e) {
    var that = this;
    that.setData({
      'baseWidth': e.detail.width, //获取图片真实宽度
      'baseHeight': e.detail.height, //获取图片真实高度
      'scaleWidth': e.detail.width, //给图片设置宽度
      'scaleHeight': e.detail.height //给图片设置高度
    })
  },
  biggerImg(e) {
    var that = this;
    this.setData({
      scale: that.data.scale+ 0.03
    })
  
    that.setData({
      'scaleWidth': that.data.baseWidth * that.data.scale, //给图片设置宽度
      'scaleHeight': that.data.baseHeight * that.data.scale//给图片设置高度
    })
  },
  smallImg(e) {
    var that = this;
    this.setData({
      scale: that.data.scale - 0.03
    })
    that.setData({
      'scaleWidth': that.data.baseWidth * that.data.scale, //给图片设置宽度
      'scaleHeight': that.data.baseHeight * that.data.scale//给图片设置高度
    })
  },
  //页面跳转
  gotocheck() {
    if(!this.data.flag) {
      this.setData({
        flag: true
      })
      wx.setStorageSync('scale', this.data.scale);
      wx.navigateTo({
        url: '/page/component/pages/start/start'
      })
    }
  }
})