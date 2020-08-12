// reportDetail/reportDetail.js
const app = getApp();
Page({
  data: {
    reportDetail: {},
    school: "",
    classesName: '',
    phone: "",
    studentId: '',
    farRight: "",
    farLeft: "",
    nearRight: "",
    nearLeft: "",
    sphRight: "",
    sphLeft: "",
    cytRight: "",
    cytLeft: "",
    axisRight: "",
    axisLeft: "",
    correctRight: "",
    correctLeft: "",
    ipdRight: "",
    ipdLeft: "",
    leadingRight: "",
    leadingLeft: "",
    motion: "",
    stereopsis: "",
    cover: "",
    worth: "",
    assembly: "",
    colourVision: "",
    splRight: "",
    splLeft: "",
    splBinoculus: "",
    levelRight: "",
    levelLeft: "",
    verticalRight: "",
    verticalLeft: "",
    axialLengthRight: "",
    axialLengthLeft: "",
    acdRight: "",
    acdLeft: "",
    ltRight: "",
    ltLeft: "",
    slitLamp: "",
    retCam: "",
    height: "",
    weight: "",
    suggest: "",
    farLeft: "",
    farRight: "",
    nearLeft: '',
    nearRight: '',
    sphLeft: '',
    sphRight: '',
    cytLeft: '',
    cytRight: '',
    axisLeft: '',
    axisRight: '',
    correctLeft: '',
    correctRight: '',
    ipdLeft: '',
    ipdRight: '',
    leadingLeft: '',
    leadingRight: '',
    worth: '',
    colourVision: '',
    levelLeft: '',
    levelRight: '',
    verticalRight: '',
    verticalLeft: '',
    gender: 0,
    flag: false    

  },
  // 右眼
  farRightInput(e) {
    this.setData({
      farRight: e.detail.value
    })
  },
  nearRightInput(e) {
    this.setData({
      nearRight: e.detail.value
    })
  },
  sphRightInput(e) {
    this.setData({
      sphRight: e.detail.value
    })
  },
  cytRightInput(e) {
    this.setData({
      cytRight: e.detail.value
    })
  },
  axisRightInput(e) {
    this.setData({
      axisRight: e.detail.value
    })
  },
  correctRightInput(e) {
    this.setData({
      correctRight: e.detail.value
    })
  },
  ipdRightInput(e) {
    this.setData({
      ipdRight: e.detail.value
    })
  },
  leadingRightInput(e) {
    this.setData({
      leadingRight: e.detail.value
    })
  },
  // 左眼
  farLeftInput(e) {
    this.setData({
      farLeft: e.detail.value
    })
  },
  nearLeftInput(e) {
    this.setData({
      nearLeft: e.detail.value
    })
  },
  sphLeftInput(e) {
    this.setData({
      sphLeft: e.detail.value
    })
  },
  cytLeftInput(e) {
    this.setData({
      cytLeft: e.detail.value
    })
  },
  axisLeftInput(e) {
    this.setData({
      axisLeft: e.detail.value
    })
  },
  correctLeftInput(e) {
    this.setData({
      correctLeft: e.detail.value
    })
  },
  ipdLeftInput(e) {
    this.setData({
      ipdLeft: e.detail.value
    })
  },
  leadingLeftInput(e) {
    this.setData({
      leadingLeft: e.detail.value
    })
  },
  //眼球运动
  motionInput(e) {
    this.setData({
      motion: e.detail.value
    })
  },
  stereopsisInput(e) {
    this.setData({
      stereopsis: e.detail.value
    })
  },
  coverInput(e) {
    this.setData({
      cover: e.detail.value
    })
  },
  worthInput(e) {
    this.setData({
      worth: e.detail.value
    })
  },
  assemblyInput(e) {
    this.setData({
      assembly: e.detail.value
    })
  },
  colourVisionInput(e) {
    this.setData({
      colourVision: e.detail.value
    })
  },
  splRightInput(e) {
    this.setData({
      splRight: e.detail.value
    })
  },
  splLeftInput(e) {
    this.setData({
      splLeft: e.detail.value
    })
  },
  splBinoculusInput(e) {
    splBinoculus: e.detail.value
  },
  //生物检测 
  // 右眼
  levelRightInput(e) {
    this.setData({
      levelRight: e.detail.value
    })
  },
  verticalRightInput(e) {
    this.setData({
      verticalRight: e.detail.value
    })
  },
  axialLengthRightInput(e) {
    this.setData({
      axialLengthRight: e.detail.value
    })
  },
  acdRightInput(e) {
    this.setData({
      acdRight: e.detail.value
    })
  },
  ltRightInput(e) {
    this.setData({
      ltRight: e.detail.value
    })
  },
  // 左眼
  levelLeftInput(e) {
    this.setData({
      levelLeft: e.detail.value
    })
  },
  verticalLeftInput(e) {
    this.setData({
      verticalLeft: e.detail.value
    })
  },
  axialLengthLeftInput(e) {
    this.setData({
      axialLengthLeft: e.detail.value
    })
  },
  acdLeftInput(e) {
    this.setData({
      acdLeft: e.detail.value
    })
  },
  ltLeftInput(e) {
    this.setData({
      ltLeft: e.detail.value
    })
  },
  //眼部健康检查
  slitLampInput(e) {
    this.setData({
      slitLamp: e.detail.value
    })
  },
  retCamInput(e) {
    this.setData({
      retCam: e.detail.value
    })
  },
  //身高体重
  heightInput(e) {
    this.setData({
      height: e.detail.value
    })
  },
  weightInput(e) {
    this.setData({
      weight: e.detail.value
    })
  },
  suggestInput(e) {
    this.setData({
      suggest: e.detail.value
    })
  },
  submitReport() {
    let that = this;
    if(!this.data.flag) {
      this.setData({
        flag: true
      })
    let url = app.globalData.URL + "insertStudentWord", 
    data = { studentId: this.data.studentId,
      name: this.data.name,
      gender: this.data.gender,
      schoolName: this.data.schoolName,
      birthday: this.data.birthday,
      className: this.data.classesName,
      farRight: this.data.farRight,
      farLeft: this.data.farLeft,
      nearRight: this.data.nearRight,
      nearLeft: this.data.nearLeft,
      sphRight: this.data.sphRight,
      sphLeft: this.data.sphLeft,
      cytRight: this.data.cytRight,
      cytLeft: this.data.cytLeft,
      axisRight: this.data.axisRight,
      axisLeft: this.data.axisLeft,
      correctRight: this.data.correctRight,
      correctLeft: this.data.correctLeft,
      ipdRight: this.data.ipdRight,
      ipdLeft: this.data.ipdLeft,
      leadingRight: this.data.leadingRight,
      leadingLeft: this.data.leadingLeft,
      motion: this.data.motion,
      stereopsis: this.data.stereopsis,
      cover: this.data.cover,
      worth: this.data.worth,
      assembly: this.data.assembly,
      colourVision: this.data.colourVision,
      splRight: this.data.splRight,
      splLeft: this.data.splLeft,
      splBinoculus: this.data.splBinoculus,
      levelRight: this.data.levelRight,
      levelLeft: this.data.levelLeft,
      verticalRight: this.data.verticalRight,
      verticalLeft: this.data.verticalLeft,
      axialLengthRight: this.data.axialLengthRight,
      axialLengthLeft: this.data.axialLengthLeft,
      acdRight: this.data.acdRight,
      acdLeft: this.data.acdLeft,
      ltRight: this.data.ltRight,
      ltLeft: this.data.ltLeft,
      slitLamp: this.data.slitLamp,
      retCam: this.data.retCam,
      height: this.data.height,
      weight: this.data.weight,
      suggest: this.data.suggest,
      farLeft: this.data.farLeft,
      farRight: this.data.farRight,
      nearLeft: this.data.nearLeft,
      nearRight: this.data.nearRight,
      sphLeft: this.data.sphLeft,
      sphRight: this.data.sphRight,
      cytLeft: this.data.cytLeft,
      cytRight: this.data.cytRight,
      axisLeft: this.data.axisLeft,
      axisRight: this.data.axisRight,
      correctLeft: this.data.correctLeft,
      correctRight: this.data.correctRight,
      ipdLeft: this.data.ipdLeft,
      ipdRight: this.data.ipdRight,
      leadingLeft: this.data.leadingLeft,
      leadingRight: this.data.leadingRight,
      worth: this.data.worth,
      colourVision: this.data.colourVision,
      levelLeft: this.data.levelLeft,
      levelRight: this.data.levelRight,
      verticalRight: this.data.verticalRight,
      verticalLeft: this.data.verticalLeft
    };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        //console.log(res)
        if(res.data.status == 200) {
          wx.showToast({
            title: "恭喜您上传成功",
          })
          that.setData({
            farRight: "",
            farLeft: "",
            nearRight: "",
            nearLeft: "",
            sphRight: "",
            sphLeft: "",
            cytRight: "",
            cytLeft: "",
            axisRight: "",
            axisLeft: "",
            correctRight: "",
            correctLeft: "",
            ipdRight: "",
            ipdLeft: "",
            leadingRight: "",
            leadingLeft: "",
            motion: "",
            stereopsis: "",
            cover: "",
            worth: "",
            assembly: "",
            colourVision: "",
            splRight: "",
            splLeft: "",
            splBinoculus: "",
            levelRight: "",
            levelLeft: "",
            verticalRight: "",
            verticalLeft: "",
            axialLengthRight: "",
            axialLengthLeft: "",
            acdRight: "",
            acdLeft: "",
            ltRight: "",
            ltLeft: "",
            slitLamp: "",
            retCam: "",
            height: "",
            weight: "",
            suggest: "",
            farLeft: "",
            farRight: "",
            nearLeft: '',
            nearRight: '',
            sphLeft: '',
            sphRight: '',
            cytLeft: '',
            cytRight: '',
            axisLeft: '',
            axisRight: '',
            correctLeft: '',
            correctRight: '',
            ipdLeft: '',
            ipdRight: '',
            leadingLeft: '',
            leadingRight: '',
            worth: '',
            colourVision: '',
            levelLeft: '',
            levelRight: '',
            verticalRight: '',
            verticalLeft: ''
          })
          wx.navigateTo({
            url: '/page/myCollection/pages/clertMain/clertMain',
          })
        }
      })
    }
    }
  },
  // 参数传递
  onLoad(option) {
    this.setData({
      studentId: option.studentId
    })
    this.getSudentInfo();
  },
  getSudentInfo() {
      let that = this;
    let url = app.globalData.URL + "findStudent", data = {studentId: this.data.studentId};
      //如果已经授权过
      if (wx.getStorageSync('phone')) {
        wx.showLoading({
          title: '加载中...'
        })
        app.wxRequest(url, data, (res) => {
         // console.log(res)
          res ? res = res.data.data : '';
          that.setData({
            name: res.name,
            gender: res.gender,
            school: res.schoolName,
            birthday: res.birthday,
            classesName: res.classesName
          })
        
        })
      }
    },
})