import * as echarts from '../ec-canvas/echarts.js';
const app = getApp();
Page({
  data: {
    dataList: [],
    picList: [],
    diopterList: [],
    showList: true,
    isSelect: 0,
    currentStu: [],
    stId: 0,
    selectArray: [],
    studentName: '',
    childrenList: [],
    birthday: '',
    gender: 0,
    balance: 0
  },
  gotoAdd() {
    if (this.data.phone) {
      this.hideview()
    } else {
      wx.navigateTo({
        url: '/nicheng/nicheng',
      })
    }
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params,
      stId: e.detail.studentId,
      gender: e.detail.gender,
      birthday: e.detail.birthday,
      balance: wx.getStorageSync('balance')
    }),
      this.getArchiveList();
  },
  newchildrenlist(e) {
    let curStudent = e.detail.newChildrenList;
    let stuId = e.detail.stuId;
    this.setData({
      selectArray: e.detail.newChildrenList,
      stId: stuId
    })
    this.setData({
      studentId: curStudent[0].id,
      studentName: curStudent[0].name,
      birthday: curStudent[0].birthday,
      gender: curStudent[0].gender,
      balance: curStudent[0].balance,
      ranking: curStudent[0].ranking,

    })
    wx.setStorageSync('studentName', curStudent[0].name);
    wx.setStorageSync('studentId', curStudent[0].id);
    wx.setStorageSync('gender', curStudent[0].gender);
    wx.setStorageSync('birthday', curStudent[0].birthday);
    wx.setStorageSync('balance', curStudent[0].balance);
    wx.setStorageSync('ranking', curStudent[0].ranking);
    this.getArchiveList();
  },
  onLoad() {
    this.getChildrenList();
    this.setData({
      studentName: wx.getStorageSync('studentName'),
      birthday: wx.getStorageSync('birthday'),
      balance: wx.getStorageSync('balance'),
      gender: wx.getStorageSync('gender')
    })
  },
  //请求数据
  onShow() {
    this.setData({
      phone: wx.getStorageSync('phone'),
      studentId: wx.getStorageSync('studentId')
    })
    if (wx.getStorageSync('detectType') == 0) {
      this.setData({
        isSelect: 0
      })
    } else {
      this.setData({
        isSelect: 2
      })
    }
    if (this.data.studentId) {
      this.setData({
        stId: wx.getStorageSync('studentId')
      })
    } else {
      this.getChildrenList();
    }
    this.getArchiveList()
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
          // that.setData({
          //   stId: that.data.childrenList[0].id
          // })
        } else if (res.data.status == 10220) {
          // that.setData({
          //   childrenList: []
          // })
          let arr = [];
          arr.push({
            name: '添加孩子'
          })
          that.setData({
            selectArray: arr
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  },
  //获取档案列表
  getArchiveList() {
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...',
      })
      let that = this;
      let url = app.globalData.URL + 'diopterList', data = {
        openId: wx.getStorageSync('openId'),
        studentId: this.data.stId
      };
      app.wxRequest(url, data, (res) => {
        //如果孩子不为空
        if (res.data.data !== null) {
          that.setData({
            diopterList: res.data.data,
          })
         // that.getCurrentStudentInfo();
        } else {  //如果孩子为空
          that.setData({
            diopterList: []
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  },
  getCurrentStudentInfo() {
    let that = this;
    if (that.data.diopterList) {
      let stu = that.data.navList;
      let currentStu = stu.filter((item, index) => {
        if (item.id == that.data.stId) {
          return item;
        }
      })
      that.setData({
        navList: currentStu
      })
      if (currentStu.length) {
        let picList = currentStu.map((item) => {
          return item.picList
        })
        let dataList = currentStu.map((item) => {
          return item.dataList
        })
        let weardataList = currentStu.map((item) => {
          return item.weardataList
        })
        let wearpicList = currentStu.map((item) => {
          return item.wearpicList
        })
        let diopterList = currentStu.map((item) => {
          return item.diopterList
        })
        that.setData({
          dataList: dataList[0],
          picList: picList[0],
          weardataList: weardataList[0],
          wearpicList: wearpicList[0],
          diopterList: diopterList[0]
        })
        let dataList2 = that.data.dataList;
        let picList2 = that.data.picList;

        let weardataList2 = that.data.weardataList;
        let wearpicList2 = that.data.wearpicList;
        xData = picList2.map((item) => {
          return item.date
        })
        leftData = picList2.map((item) => {
          return item.visionLeftStr
        })
        rightData = picList2.map((item) => {
          return item.visionRightStr
        })
        wearxData = wearpicList2.map((item) => {
          return item.date
        })
        wearleftData = wearpicList2.map((item) => {
          return item.visionLeftStr
        })
        wearrightData = wearpicList2.map((item) => {
          return item.visionRightStr
        })
      }
    }
    that.oneComponent = that.selectComponent('#mychart-one');
    that.twoComponent = that.selectComponent("#mychart-two");
    if (xData.length && leftData.length && rightData.length) {
      //某个人列表赋值
      that.init_one(xData, leftData, rightData)
    }
    if (wearxData.length && wearleftData.length && wearrightData.length) {
      that.init_two(wearxData, wearleftData, wearrightData)
    }

  },

  //跳转到详情页
  gotArchiveDetail(e) {
     let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/component/pages/diopterDetail/diopterDetail?id=' + id
      })
  },
  //轮播图切换，对应的孩子切换
  
  gotoDetail() {
    wx.navigateTo({
      url: '/page/component/pages/detail/detail'
    })
  },
  hideview() {
    this.setData({
      show: true
    })
  },
  hide() {
    this.setData({
      show: false
    })
  },
  // 手动添加
  gotoManu() {
    wx.showToast({
      title: '暂未开启该功能',
    })
    // wx.navigateTo({
    //   url: '/manual/manual'
    // })
    // this.hide();
  },
  //扫码添加
  gotoScan() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        var str = res.path;
        let stuId = str.split('=')[1];
        //获取到学生id后添加孩子
        wx.setStorageSync('studentId', stuId);
        let openId = wx.getStorageSync('openId');
        let url = app.globalData.URL + 'binding', data = {
          studentId: stuId,
          openId: wx.getStorageSync('openId')
        };
        wx.showLoading({
          title: '加载中...',
        })
        app.wxRequest(url, data, (res) => {
          res.data.data.push({
            name: '添加孩子'
          })
          that.setData({
            selectArray: res.data.data,
            childrenList: res.data.data,
            show: false
          })
          let curStudent = that.data.childrenList;
          that.setData({
            studentId: curStudent[0].id,
            stId: curStudent[0].id,
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
          that.getArchiveList()
          // wx.navigateTo({
          //   url: '/page/myCollection/pages/diopter/diopter'
          // })
        }, (err) => {
          console.log(err)
        })
      }
    })
  }
})