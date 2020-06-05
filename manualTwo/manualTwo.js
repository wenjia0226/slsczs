// manual/manual.js
const app = getApp();
Page({
  data: {
    date: '2010/01/01',
    show: true,
    gender: 0,
    name: '',
  },
  onShow: function () {

  },
  handleNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      show: false
    })

    var dateOld = this.data.date;
    var dateNew = dateOld.replace(/-/g, '/');
    this.setData({
      date: dateNew
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
      data = {
        openId: wx.getStorageSync('openId'),
        name: this.data.name,
        birthday: this.data.date,
        gender: this.data.gender
      };
    app.wxRequest(url, data, (res) => {
      // console.log(res)
      if (res.data.status == 200) {
        wx.navigateTo({
          url: '/page/myCollection/pages/childrenManage/childrenManage'
        })
      }
    }
    )
  }
})