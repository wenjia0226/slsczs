// manual/manual.js
const app = getApp();
Page({
  data: {
    date: '',
    show: true,
    gender: 0,
    name: ''
  },
  onShow: function () {

  },
  handleNameInput(e){
    this.setData({
      name:e.detail.value 
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      show: false
    })
  },
  selectSex(e) {
    this.setData({
      gender: e.currentTarget.dataset.type
    })
  },
  saveStudent() {
    let that = this;
    let url = app.globalData.URL + "registerStudent", 
    data = {openId: wx.getStorageSync('openId'),
     name: this.data.name,
    birthday: this.data.date,
    gender: this.data.gender
     };
    app.wxRequest(url, data, (res) => {
      console.log(res)
      if(res.data.status == 200) {
        wx.switchTab({
          url: '/page/tabBar/screen/screen'
        })
      }
    }
    )
  }
})