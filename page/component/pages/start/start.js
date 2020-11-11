// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    swiper1: '',
    swiper2: '',
    swiper3: '',
    swiper4: '',
    swiperImg2: [],
    swiperImg: ['https://www.guangliangkongjian.com/images/step1.jpg', 'https://www.guangliangkongjian.com/images/step2.jpg', 'https://www.guangliangkongjian.com/images/step3.jpg', 'https://www.guangliangkongjian.com/images/step4.jpg']
  },
  startTest() {
    wx.navigateTo({
      url: '/page/mainFunction/pages/testR/testR',
    })
  },
  onShow() {
  //   const path = wx.getStorageSync('swiper1');
  //   const path2 = wx.getStorageSync('swiper2');
  //   const path3 = wx.getStorageSync('swiper3');
  //   const path4 = wx.getStorageSync('swiper4');
  //   console.log(path)
  //   if (path !== null) {
  //     this.setData({
  //       swiper1: path
  //     })
  //   } else {
  //     console.log(1111)
  //     this.downImage('https://www.guangliangkongjian.com/images/step4.jpg', 'swiper1');
  //   }
  //   if (path2 !== null) {
  //     this.setData({
  //       swiper2: path2
  //     })
  //   } else {
  //     this.downImage('https://www.guangliangkongjian.com/images/step2.jpg', 'swiper2');
  //   }
  // if (path3 !== null) {
  //     this.setData({
  //       swiper3: path3
  //     })
  //   } else {
  //   this.downImage('https://www.guangliangkongjian.com/images/step3.jpg', 'swiper3');
  //   }
  //  if (path4 !== null) {
  //     this.setData({
  //       swiper4: path4
  //     })
  //   } else {
  //    this.downImage('https://www.guangliangkongjian.com/images/step1.jpg', 'swiper4');
  //   }
  },
  downImage(url, name) {
    wx.downloadFile({
      url: url,
      success: function (res) {
        if (res.statusCode === 200) {
          console.log('图片下载成功' + res.tempFilePath)
          // 第二步: 使用小程序的文件系统，通过小程序的api获取到全局唯一的文件管理器
          const fs = wx.getFileSystemManager()
          //  fs为全局唯一的文件管理器。那么文件管理器的作用是什么，我们可以用来做什么呢？
          //   文件管理器的作用之一就是可以根据临时文件路径，通过saveFile把文件保存到本地缓存.
          fs.saveFile({
            tempFilePath: res.tempFilePath, // 传入一个临时文件路径
            success(res) {
            
              console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径  
              // 此时图片本地缓存已经完成，res.savedFilePath为本地存储的路径。
              //小程序的本地文件路径标准： {{协议名}}://文件路径
              //协议名在 iOS/Android 客户端为 "wxfile"，在开发者工具上为 "http"，
              //开发者无需关注这个差异，也不应在代码中去硬编码完整文件路径。
              //好了，到此为止，我们已经把图片缓存到本地了，而且我们也得到了本地缓存的路径。
              // 那么我们把本地缓存的路径，通过小程序的数据缓存服务保存下来。
              // 下次打开小程序 首先去缓存中检查是否存在本地文件的缓存路径
              // 如果有，直接image src赋值本地缓存路径。
              //如果没有，则是第一次下载图片，或者用户手动清理缓存造成的。
              wx.setStorageSync(name, res.savedFilePath)
            },
            fail(err) {
              console.log(err)
            }
          })
        } else {
          console.log('响应失败', res.statusCode)
        }
      }
    })
  },
  gotocheck() {
    let scale = wx.getStorageSync('scale');
    wx.setStorageSync('resetscale', 1);
    wx.navigateTo({
      url: '/page/component/pages/check/check'
    })
  }
})