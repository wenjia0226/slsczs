// reportDetail/reportDetail.js
const app = getApp();
Page({
  data: {
    reportDetail: {},
    school: "",
    phone: "",
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
    gender: 0

  },
  // 参数传递
  onLoad(option) {
    wx.showLoading({
      title: '加载中...'
    })
    let that = this;
    let url = app.globalData.URL + "queryStudentWordById", data = { id: option.id };
    app.wxRequest(url, data, (res) => {
      // console.log(res)
      if(res.data.status == 200) {
        res ? res= res.data.data: '';
        that.setData({
          name: res.name,
          birthday: res.birthday,
          school: res.school,
          phone: res.phone,
          farLeft: res.farLeft,
          farRight: res.farRight,
          nearLeft: res.nearLeft,
          nearRight: res.nearRight,
          sphLeft: res.sphLeft,
          sphRight: res.sphRight,
          cytLeft: res.cytLeft,
          cytRight: res.cytRight,
          axisLeft: res.axisLeft,
          axisRight: res.axisRight,
          correctLeft: res.correctLeft,
          correctRight: res.correctRight,
          ipdLeft: res.ipdLeft,
          ipdRight: res.ipdRight,
          leadingLeft: res.leadingLeft,
          leadingRight: res.leadingRight,
          motion: res.motion,
          stereopsis: res.stereopsis,
          cover: res.cover,
          worth: res.worth,
          assembly: res.assembly,
          colourVision: res.colourVision,
          levelRight: res.levelRight,
          levelLeft: res.levelLeft,
          verticalRight: res.verticalRight,
          verticalLeft: res.verticalLeft,
          axialLengthLeft: res.axialLengthLeft,
          axialLengthRight: res.axialLengthRight,
          acdLeft: res.acdLeft,
          acdRight: res.acdRight,
          ltLeft: res.axialLengthLeftltLeft,
          ltRight: res.ltRight,
          slitLamp: res.slitLamp,
          retCam: res.retCam,
          weight: res.weight,
          height: res.height,
          suggest: res.suggest,
          splBinoculus: res.splBinoculus,
          splRight: res.splRight,
          splLeft: res.splLeft,
          gender: res.gender
        })
      }
    })
  }
 
})