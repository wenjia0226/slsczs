// page/myCollection//pages/addContent/addContent.js
const app = getApp();
Page({
  data: {
    textInput: '',
    imgs: [],
    countNum: 4,
    uploadImg: 0
  },
  handleInput(e){
    this.setData({
      textInput: e.detail.value
    })
  },
  // 照相打卡
  gotoCamera() {
    if(this.data.imgs.length >=4) {
      wx.showToast({
        title: '最多选择四张图片',
      })
      return;
    }
    if(this.data.countNum >= 0 && this.data.countNum <= 4) {
      let that = this;
      wx.chooseImage({
        count: that.data.countNum,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) { 
          var tempFilePaths = res.tempFilePaths
          that.setData({
            imgs: that.data.imgs.concat(tempFilePaths)
          })
          that.setData({
            countNum: 4 - that.data.imgs.length
          })
        }
      })
    }
  },
  previewImg(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      urls: this.data.imgs,
      current: current,
      success: function(e) {
        // console.log('预览成功')
      }
    })
  },
  publishMessage() {
    let that = this;
    let url = app.globalData.URL + "addTaskPic",
    data = { 
      openId: wx.getStorageSync('openId'),
      studentId: wx.getStorageSync('studentId'),
      contents: that.data.textInput,
      avatarUrl: wx.getStorageSync('avatarUrl'),
      nickName: wx.getStorageSync('nickName')
     };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        let id = res.data.data;
        let imgs = this.data.imgs;
        if(imgs.length) {
          for (let i = 0; i < imgs.length; i++) {
            wx.uploadFile({
              url: app.globalData.URL + 'addTaskPic', //仅为示例，非真实的接口地址
              filePath: imgs[i],
              name: 'file',
              formData: {
                'id': id
              },
              header: {
                "Content-Type": "multipart/form-data"//记得设置
              },
              success: function (res) {
                console.log(res, 999)
                that.setData({
                  uploadImg: that.data.uploadImg + 1
                })
                // console.log(that.data.uploadImg, imgs.length)
                if (that.data.uploadImg == imgs.length) {
                  // wx.showToast({
                  //   title: '发布成功',
                  //   icon: 'success'
                  // })
                  wx.navigateTo({
                    url: '/page/myCollection/pages/myShow/myShow'
                  })
                  that.setData({
                    textInput: '',
                    imgs: [],
                    uploadImg: 0
                  })
                }
              }
            })
          }
        }else {
          that.setData({
            textInput: ''
          })
          wx.navigateTo({
            url: '/page/myCollection/pages/myShow/myShow'
          })
        }
       
      })
    }
  }
})