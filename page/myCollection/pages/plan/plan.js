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
    showCongratulation: false,
    selectArray: [],
    studentName: '',
    childrenList: []
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params
    })
  },
  // 照相打卡
  gotoCamera() {
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        for(let i = 0; i< tempFilePaths.length; i++) {
          wx.uploadFile({
            url: app.globalData.URL + 'addTaskPic', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              'id': id
            },
            header: {
              "Content-Type": "multipart/form-data"//记得设置
            },
            success: function (res) {
              console.log(res)
            }
          })
        }
        
      }
    })
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
  fininsh(e) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    let url = app.globalData.URL + 'completeTask', data = {
      openId: wx.getStorageSync('openId'),
      taskId: e.currentTarget.dataset.id,
      studentId: wx.getStorageSync('studentId')
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
  onLoad() {
    this.getChildrenList();
  },
  onShow: function () {
    if(wx.getStorageSync('phone')) {
      this.setData({
        studentName: wx.getStorageSync('studentName')
      })
      if (wx.getStorageSync('studentId')) {
        this.getList();
      }else {
        wx.showToast({
          title: '请先选择学生',
        })
      }
      
    }else {
      wx.navigateTo({
        url: '/nicheng/nicheng'
      })
    }
    
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenList", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        console.log(res)
        res.data.data.push({
          name: '添加孩子'
        })
        if (res.data.status == 200) {
          that.setData({
            selectArray: res.data.data
          })
        }
      })
    }
  },  
  getList() {
    if (wx.getStorageSync('studentId')) {
      wx.showLoading({
        title: '加载中...',
      })
      let that = this;
      let url = app.globalData.URL + 'xcxTaskList', data = {
        studentId: wx.getStorageSync('studentId')
      };
      app.wxRequest(url, data, (res) => {
        //  console.log(res)
        that.setData({
          taskList: res.data.data
        })
      }, (err) => {
        console.log(err)
      })  
    }else {
      wx.showToast({
        title: '请先选择孩子',
      })
    }
  }
})