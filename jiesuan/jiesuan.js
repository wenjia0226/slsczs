// page/exchange//pages/jiesuan/jiesuan.js
Page({
  data: {
    type: 1,
    inputValue: '',
    userName: '',
    telNumber: '',
    provinceName: '',
    cityName: '',
    countyName: '',
    detailInfo: '' 
  },
  // 设置类型配送方式
  addBg (e) {
    if(e.currentTarget.dataset.type == 0) {
      this.setData({
        type: 0
      })
    }else {
      this.setData({
        type: 1
      })
    }
  },
  // 获取地址
  getAddress() {
    let that = this;
    wx.getSetting({
      success(res) {
        console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success(res) {
              that.setData({
                userName: res.userName,
                provinceName: res.provinceName,
                cityName: res.cityName,
                countyName: res.countyName,
                detailInfo: res.detailInfo,
                telNumber: res.telNumber,
                
              })
              
            }
          })
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)

              }
            })
          } else {
            wx.chooseAddress({
              success(res) {
                that.setData({
                  userName: res.userName,
                  provinceName: res.provinceName,
                  cityName: res.cityName,
                  countyName: res.countyName,
                  detailInfo: res.detailInfo,
                  telNumber: res.telNumber
                })
              }
            })
          }
        }
      }
    })
  }
})