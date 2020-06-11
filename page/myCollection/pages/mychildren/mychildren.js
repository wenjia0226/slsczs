// pages/mychildren/mychildren.js
const app = getApp();
Page({
  data: {
    name: '',
    schoolName: '',
    classesName: '',
    birthday: '',
    gender: 0,
    sittingHeight: '',
    height: '',
    chairHeight: '',
    displayInfo: true,
    date: '',
    show: true,
    studentId: '',
    resetGender: '',
    resetName: '',
    resetBirthday: '',
    resetHeight: '',
    resetChairHeight: '',
    resetSittingHeight: '',
    resetDate: '',
    myIntegral: '',
    studentId: ''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    
    this.setData({
      studentId: options.id
    })
    this.getStudenInfo();
  },
  getStudenInfo() {
    let that = this;
    let url = app.globalData.URL + 'findStudent', data = {
      studentId: this.data.studentId
    };
    app.wxRequest(url, data, (res) => {
      console.log(res)
      that.setData({
        name: res.data.data.name,
        schoolName: res.data.data.schoolName,
        classesName: res.data.data.classesName,
        birthday: res.data.data.birthday,
        gender: res.data.data.gender,
        sittingHeight: res.data.data.sittingHeight,
        height: res.data.data.height,
        chairHeight: res.data.data.chairHeight,
        date: res.data.data.date,
        resetName: res.data.data.name,
        resetBirthday: res.data.data.birthday,
        resetGender: res.data.data.gender,
        resetSittingHeight: res.data.data.sittingHeight,
        resetHeight: res.data.data.height,
        resetChairHeight: res.data.data.chairHeight,
        resetDate: res.data.data.date,
        myIntegral: res.data.data.myIntegral
      })
    }, (err) => {
      console.log(err)
    })
  },
  showModify() {
    let that = this;
    this.setData({
      displayInfo: !that.data.displayInfo
    })
  },
  bindDateChange: function (e) {
    var dateOld = e.detail.value;
    var dateNew = dateOld.replace(/-/g, '/');
    this.setData({
      resetBirthday: dateNew
    })
  },
  //修改站姿身高
  changeChairHeight(e) {
    this.setData({
      resetChairHeight: e.detail.value
    })
  },
  //修改站姿身高
  changeHeight(e) {
    this.setData({
      resetHeight: e.detail.value
    })
  },
  //修改坐姿身高
  changeSitHeight(e) {
    this.setData({
      resetSittingHeight: e.detail.value
    })
  },
  // 修改姓名
  handleNameInput(e) {
    this.setData({
      resetName: e.detail.value
    })
  },
  //修改性别
  selectSex(e) {
    this.setData({
      resetGender: e.currentTarget.dataset.type
    })
  },
  fininshModify() {
    let that = this;
    let url = app.globalData.URL + "perfectStudent",
      data = {
        id: this.data.studentId,
        name: this.data.resetName,
        birthday: this.data.resetBirthday,
        gender: this.data.resetGender,
        height: this.data.resetHeight,
        chairHeight: this.data.resetChairHeight,
        sittingHeight: this.data.resetSittingHeight
      };
    app.wxRequest(url, data, (res) => {
      //  console.log(res)
      if (res.data.status == 200) {
        wx.showToast({
          title: '修改成功',
        })
        this.setData({
          displayInfo: !that.data.displayInfo
        })
        this.getStudenInfo();
        // wx.navigateTo({
        //   url: '/page/myCollection/pages/childrenManage/childrenManage'
        // })
      }
    })
  }
})