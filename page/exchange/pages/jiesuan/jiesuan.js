// page/exchange//pages/jiesuan/jiesuan.js
const app = getApp();
Page({
  data: {
    type: 1,
    inputValue: '',
    userName: '',// 联系人
    telNumber: '', //电话
    provinceName: '',
    cityName: '',
    countyName: '',
    detailInfo: '',
    selectedId: '',
    sizeNumber: '',
    shopName: '',
    selectedName: '',
    details: '',
    integral: '',
    total: ''
  },
  handleBuynner(e) {
    console.log(e)
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindPhone(e) {
    this.setData({
      telNumber: e.detail.value
    })
  },
  onShow() {
    this.setData({
      selectedId: wx.getStorageSync('selectedId'),
      sizeNumber: wx.getStorageSync('sizeNumber'),
      shopName: wx.getStorageSync('shopName'),
      selectedName: wx.getStorageSync('selectedName'),
      integral: wx.getStorageSync('integral'),
      total: wx.getStorageSync('sizeNumber') * wx.getStorageSync('integral')
    })
  },
  //提交订单
  submitOrder() {
    let that = this;
    let url = app.globalData.URL + "addOrder";
    let address = this.data.provinceName + this.data.cityName + this.data.countyName +this.data.detailInfo;
    let data = {
      studentId: wx.getStorageSync('studentId'),
      specificationsId: wx.getStorageSync('selectedId'),
      number: wx.getStorageSync('sizeNumber'),
      delivryType: this.data.type,
      contacts: this.data.userName,
      phone: this.data.telNumber,
      address: address,
      remark: this.data.inputValue,
      openId: wx.getStorageSync('openId')
    };
    if(this.data.type == 1) {
      if (this.data.provinceName == '') {
        wx.showModal({
          title: '请先选择收获地址',
          content: '',
        })
        return;
      }
    }
    if(this.data.type == 2) {
      if (this.data.phone == '' || this.data.userName == '') {
        wx.showModal({
          title: '请填写自取人姓名电话',
          content: '',
        })
        return;
      }
    }
   
    app.wxRequest(url, data, (res) => {
      console.log(res)
      this.setData({
        number: 0,
        delivryType: 1,
        contacts: '',
        phone: '',
        address: '',
        remark: '',
        total: 0,
        userName: '',
        provinceName: '',
        cityName: '',
        countyName: '',
        detailInfo: '',
        telNumber: '',
        remark: '',
        sizeNumber: 0,
        selectedName: ''
      })
      var param = { "timeStamp": res.data.data.timeStamp, "package": res.data.data.package, "paySign": res.data.data.paySign, "signType": "MD5", "nonceStr": res.data.data.nonceStr };
      //发起支付
      that.pay(param);
    }, (err) => {
      console.log("向后台发送数据失败")
    })
  },
  //支付
  pay: function (param) {
    var that = this;
    console.log("发起支付")
    console.log(param)
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        console.log("success");
        console.log(res);
      },
      fail: function (res) {
        console.log("fail")
        console.log(res);
      },
      complete: function (res) {
        console.log("complete");
        console.log(res)
      }
    })
  },
  // 设置类型配送方式
  addBg (e) {
    if(e.currentTarget.dataset.type == 1) {
      this.setData({
        type: 1
      })
    }else {
      this.setData({
        type: 2
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
                telNumber: res.telNumber
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
  },
  //

})