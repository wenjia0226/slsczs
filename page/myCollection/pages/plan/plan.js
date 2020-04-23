// pages/plan/plan.js
const app = getApp();
Page({
  data: {
      taskList: [],
      plan1: '',
      plan2: '',
      plan3: '',
      plan4: '',
      plan5: '',
      plan6:'',
      plan7: '',
    showCongratulation: false
  },
  hideview() {
    this.setData({
      showCongratulation: false
    })
  },
  voidRight() {
    const rightContext = wx.createInnerAudioContext();
    rightContext.autoplay = true
    rightContext.src = '/image/win.mp3'
    rightContext.onPlay(() => {
    })
    rightContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  downImage(url, name) {
    console.log(url)
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
  fininsh(e) {
    let that = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })
    let url = app.globalData.URL + 'completeTask', data = {
      openId: wx.getStorageSync('openId'),
      taskId: e.currentTarget.dataset.id
    };
    app.wxRequest(url, data, (res) => {
      // console.log(res)
      if (res.data.status == 200) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        that.getList();
      }else if(res.data.status == 10199) { 
        that.voidRight();
        that.setData({
          showCongratulation: true
        })
        that.getList();
      }
    }, (err) => {
      console.log(err)
    })
  },
  onShow: function () {
    // const path1 = wx.getStorageSync('plan1');
    // const path2 = wx.getStorageSync('plan2');
    // const path3 = wx.getStorageSync('plan3');
    // const path4 = wx.getStorageSync('plan4');
    // const path5 = wx.getStorageSync('plan5');
    // const path6 = wx.getStorageSync('plan6');
    // const path7 = wx.getStorageSync('plan7');
    // console.log(path1)
    // if (path1 !== null) {
    //   this.setData({
    //     plan1: path1
    //   })
    // } else {
    //   console.log(123)
    //   this.downImage('https://www.guangliangkongjian.com/images/plan1.png', 'plan1');
    // }
    // if (path2 !== null) {
    //   this.setData({
    //     plan2: path2
    //   })
    // } else {
    //   this.downImage('https://www.guangliangkongjian.com/images/plan2.png', 'plan2');
    // }
    // if (path3 !== null) {
    //   this.setData({
    //     plan3: path3
    //   })
    // } else {
    //   this.downImage('https://www.guangliangkongjian.com/images/plan3.png', 'plan3');
    // }
    // if (path4 !== null) {
    //   this.setData({
    //     plan4: path4
    //   })
    // } else {
    //   this.downImage('https://www.guangliangkongjian.com/images/plan4.png', 'plan4');
    // }
    // if (path5 !== null) {
    //   this.setData({
    //     plan5: path5
    //   })
    // } else {
    //   this.downImage('https://www.guangliangkongjian.com/images/plan5.png', 'plan5');
    // }
    // if (path6 !== null) {
    //   this.setData({
    //     plan6: path6
    //   })
    // } else {
    //   this.downImage('https://www.guangliangkongjian.com/images/plan6.png', 'plan6');
    // }
    // if (path7 !== null) {
    //   this.setData({
    //     plan7: path7
    //   })
    // } else {
    //   this.downImage('https://www.guangliangkongjian.com/images/plan7.png', 'plan7');
    // }
    this.getList();
  },  
  getList() {
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    let url = app.globalData.URL + 'xcxTaskList', data = {
      openId: wx.getStorageSync('openId')
    };
    app.wxRequest(url, data, (res) => {
      that.setData({
        taskList: res.data.data
      })
    }, (err) => {
      console.log(err)
    })  
  }
})