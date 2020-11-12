// pages/save/save.js
const app = getApp();
Page({
  data: {
    visionLeft: '',
    visionRight: '',
    number: '',
    levelName5Left: '',
    levelName5Right: '',
    result: '',
    statusBarHeight: 0,
    gobalTop: 0,
    detectTye: 0,
    showCongratulation: false,
    flag: false,
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '检测结果'
    },
    leftEyeRightNum: 0,
    leftEyeWrongNum: 0,
    rightEyeRightNum: 0,
    rightEyeWrongNum: 0,
    noUpdate: false,
    studentId: wx.getStorageSync('studentId'),
    showSelectPerson: true,
    selectArray: [{name: '添加孩子'}],
    studentName: '',
    childrenList: [],
    tempFlage: 2
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params,
      gender: e.detail.gender,
      studentId: e.detail.studentId
    })
  },
  submitResult() {
    if(wx.getStorageSync('studentId')) {
      if (wx.getStorageSync('studentId') == 2) {
        wx.showToast({
          title: '请先添加孩子',
        })
        return;
      }
    this.setData({
      showSelectPerson: false
    })
    if (wx.getStorageSync('reuploadFlag')) {
      this.setData({
        detectType: wx.getStorageSync('detectType')
      })
      wx.showLoading({
        title: '加载中...',
      })
      let url;
      let that = this;
      if (that.data.detectType == 0) {
        url = app.globalData.URL + 'addScreening';
      } else if (that.data.detectType == 1) {
        url = app.globalData.URL + 'addWearScreening';
      }
      let data = {
        studentId: wx.getStorageSync('studentId'),
        visionLeft: wx.getStorageSync('visionLeft'),
        visionRight: wx.getStorageSync('visionRight'),
        processLeft: JSON.stringify(wx.getStorageSync('left')),
        processRight: JSON.stringify(wx.getStorageSync('right')),
        openId: wx.getStorageSync('openId')
      };
      app.wxRequest(url, data, (res) => {
        wx.setStorageSync('reuploadFlag', false)
        if (res.data.status == 10224) {
          wx.showLoading({
            title: res.data.msg,
          })
        }
        if (res.data.status == 200) {
          this.voidRight();
          this.setData({
            showCongratulation: true
          })
        }
        if(that.data.tempFlag == 1) {
          wx.setStorageSync('studentId', '')
          wx.setStorageSync('gender', 2)
          wx.setStorageSync('studentName', '')
          wx.setStorageSync('birthday', '')
        }
      }, (err) => {
        console.log(err)
      })
     }
    } else  {
    
    wx.showToast({
      title: '请先添加孩子',
    })
      return;
    }
  },
  // 添加孩子按钮
  hideview() {
    this.setData({
      showSelectPerson: true
    })
  },
  hide() {
    this.setData({
      showSelectPerson: false
    })
  },
  gotobi() {
    wx.navigateTo({
      url: '/page/myCollection/pages/jifen/jifen'
    })
    this.setData({
      showCongratulation: false
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
  onShow() {
    let that = this;
    that.setData({
      statusBarHeight: app.globalData.statusBarHeight,
      globalTop: app.globalData.top,
      tempFlag: wx.getStorageSync('tempFlag')
    })
    let min;
    this.setData({
      visionLeft: wx.getStorageSync('visionLeft'),
      visionRight: wx.getStorageSync('visionRight'),
      levelName5Left: wx.getStorageSync('levelName5Left'),
      levelName5Right: wx.getStorageSync('levelName5Right'),
      leftEyeRightNum: wx.getStorageSync('LeftEyeRightNum'),
      leftEyeWrongNum: wx.getStorageSync('LeftEyeWrongNum'),
      rightEyeRightNum: wx.getStorageSync('RightEyeRightNum'),
      rightEyeWrongNum: wx.getStorageSync('RightEyeWrongNum'),
    })
    if (this.data.rightEyeWrongNum == 45 || this.data.leftEyeWrongNum == 45) {
      this.setData({
        result: '检测无效',
        noUpdate: true
      })
    }
    //左右眼逻辑判断
    if (that.data.visionLeft > that.data.visionRight) {
      min = that.data.visionRight
    } else {
      min = that.data.visionLeft
    }
    if (min == 1.0 || min == 1.2 || min == 1.5 || min == 2.0) {
      that.setData({
        result: '良好'
      })
    } else if (min == 0.8) {
      that.setData({
        result: '轻度'
      })
    } else if (min == 0.6) {
      that.setData({
        result: '中度'
      })
    } else if (min == 0.5 || min == 0.4 || min == 0.3 || min == 0.25 || min == 0.2 || min == 0.15 || min == 0.12 || (min == 0.1 && this.data.rightEyeWrongNum !== 45 && this.data.leftEyeWrongNum !== 45)) {
      that.setData({
        result: '重度'
      })
    }
  },
  onLoad() {
    let tempFlag = wx.getStorageSync('tempFlag');
    this.setData({
      tempFlag: tempFlag
    })
    app.editTabbar();
    if (tempFlag == 2) {  // 正常绑定
      this.getChildrenList();
      let that = this;
      this.setData({
        studentName: wx.getStorageSync('studentName')
      })
    }else if(tempFlag == 1) {
      let arr = []
     arr.push({
          age: 8,
          birthday: "2019-04-01",
          chairHeight: "60",
          classesId: 42,
          classesName: "二（3）班",
          correct: 0,
          description: "",
          gender: 2,
          lastTime: '',
          height: "125",
          id: "",
          name: "添加孩子",
          nature: "无",
          parentPhone: "18311192425",
          regionId: 1,
          regionName: "唐山",
          schoolId: 50,
          schoolName: "唐山市师范附属小学",
          sittingHeight: "105.0",
          weight: "22.34",
          lastTime: null
      })
     this.setData({
       studentName: wx.getStorageSync('studentName'),
       childrenList: arr
     })
    }
  },
  getTempStudent() {
    let that = this;
    let url = app.globalData.URL + "findStudent", data = { studentId: wx.getStorageSync('studentId') };
    //如果已经授权过
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        that.setData({
          childrenList: res.data.data
        })
        let arr = [];
        arr.push(res.data.data);
        arr.push({
          age: 8,
          birthday: "2019-04-01",
          chairHeight: "60",
          classesId: 42,
          classesName: "二（3）班",
          correct: 0,
          description: "",
          gender: 2,
          lastTime: '',
          height: "125",
          id: "",
          name: "添加孩子",
          nature: "无",
          parentPhone: "18311192425",
          regionId: 1,
          regionName: "唐山",
          schoolId: 50,
          schoolName: "唐山市师范附属小学",
          sittingHeight: "105.0",
          weight: "22.34",
          lastTime: null
        })
        that.setData({
          childrenList: arr,
          studentName: that.data.childrenList[0].name
        })
        wx.setStorageSync('studentId', that.data.childrenList[0].id)
        wx.setStorageSync('gender', that.data.childrenList[0].gender);
        wx.setStorageSync('studentName', that.data.childrenList[0].name)
      }
    })
    // }
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
        if (res.data.status == 200) {
           res.data.data.push({
            name: '添加孩子'
          })
          that.setData({
            selectArray: res.data.data,
            childrenList: res.data.data
          })
        }
      })
    }
  },
  myname(e) {
    this.setData({
      studentName: e.detail.studentName
    })
  },
  newchildrenlist(e) {
    let curStudent = e.detail.newChildrenList;
    this.setData({
      selectArray: e.detail.newChildrenList,
      childrenList: e.detail.newChildrenList
    })
    this.setData({
      studentId: curStudent[0].id,
      studentName: curStudent[0].name,
      birthday: curStudent[0].birthday,
      gender: curStudent[0].gender,
      balance: curStudent[0].balance,
      ranking: curStudent[0].ranking
    })
    wx.setStorageSync('studentName', curStudent[0].name);
    wx.setStorageSync('studentId', curStudent[0].id);
    wx.setStorageSync('gender', curStudent[0].gender);
    wx.setStorageSync('birthday', curStudent[0].birthday);
    wx.setStorageSync('balance', curStudent[0].balance);
    wx.setStorageSync('ranking', curStudent[0].ranking);
  },
   go(e) {
     let type = e.currentTarget.dataset.type;
       //清空存储
     if (type == 'home') {
       wx.switchTab({
         url: '/page/tabBar/index/index'
       })
     } else if (type == 'archives') {
       let studentId = wx.getStorageSync('studentId');
       wx.navigateTo({
         url: '/page/myCollection/pages/archives/archives?studentId=' + studentId
       })
     }
   }
})