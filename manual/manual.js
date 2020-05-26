// manual/manual.js
Page({
  data: {
    date: '',
    show: true
  },
  onShow: function () {

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      show: false
    })
  },
})