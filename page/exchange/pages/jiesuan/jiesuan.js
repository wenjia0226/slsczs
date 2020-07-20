// page/exchange//pages/jiesuan/jiesuan.js
const app = getApp();
Page({
  data: {
    type: 2,
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
    picture: '',
    integral: '',
    total: 0,
    freight: 0,
    productType: 2,
    showRemind: false,
    showWarning: false,
    show: false,
    studentName: '',
    balance: 0
  },
  onLoad() {
    app.editTabbar();
    this.getChildrenList();
    this.setData({
      studentName: wx.getStorageSync('studentName'),
      balance: wx.getStorageSync('balance')
    })
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenIntegral", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
      
        console.log(res.data.data)
        if (res.data.status == 200) {
          that.setData({
            selectArray: res.data.data
          })
        }
      })
    }
  },
  // 添加孩子按钮
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
  myevent(e) {
    this.setData({
      studentName: e.detail.params,
      balance: e.detail.balance
    })
  },
  handleBuynner(e) {
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
    let value = this.validateNumber(e.detail.value);
    this.setData({
      telNumber: value
    })
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  onShow() {
    this.setData({
      selectedId: wx.getStorageSync('selectedId'),
      sizeNumber: wx.getStorageSync('sizeNumber'),
      shopName: wx.getStorageSync('shopName'),
      selectedName: wx.getStorageSync('selectedName'),
      integral: wx.getStorageSync('integral'),
      total: wx.getStorageSync('sizeNumber') * wx.getStorageSync('integral'),
      picture: wx.getStorageSync('jiesuanPicture'),
      freight: wx.getStorageSync('freight'),
      productType: wx.getStorageSync('productType')
    })
  },
  //提交订单
  submitOrder() {
    let that = this;
    if(that.data.productType == 2) {
      if (this.data.type == 1) {
        if (this.data.provinceName == '') {
          wx.showModal({
            title: '请先选择收获地址',
            content: '',
          })
          return;
        }
      }
      if (this.data.type == 2) {
        if (this.data.userName == '' || this.data.telNumber == '') {
            wx.showModal({
              content: '请填写自取人姓名电话',
            })
          return;    
        }
        if (this.data.telNumber.length !== 11) {
          wx.showModal({
            content: '请输入正确的手机号',
          })
          return;
        }
      }
    }else if(that.data.productType == 1) {  // productType 1 是服务 2，是商品
      that.setData({
        type: 3
      })
    }
    this.hideview();
  },
  confirmSubmit() {
    let that= this;
    let url = app.globalData.URL + "addOrder";
    let address = this.data.provinceName + this.data.cityName + this.data.countyName + this.data.detailInfo;
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
    this.hide(); // 隐藏
    if (that.data.type == 1) {
        app.wxRequest(url, data, (res) => {
          console.log(res)
          if (res.data.status == 200) {
            var param = { "timeStamp": res.data.data.timeStamp, "package": res.data.data.package, "paySign": res.data.data.paySign, "signType": "MD5", "nonceStr": res.data.data.nonceStr };
            //发起支付
            that.pay(param);
          } else if (res.data.status == 10230) {
            that.setData({
              showRemind: true,
              
            })
            setTimeout(function () {
              that.setData({
                showRemind: false
              })
            }, 1500)
            return;
          }
        }, (err) => {
          console.log("向后台发送数据失败")
        }) 
    } else if (that.data.type == 2 || that.data.type == 3) { // 在校自取 和服务类型
      app.wxRequest(url, data, (res) => {
        //  console.log(res)
        if (res.data.status == 200) {

          if (that.data.type == 3) {  //如果是服务类型，
            // 页面跳转做装备
            wx.setStorageSync('partnership', res.data.data.partnership)
            wx.setStorageSync('address', res.data.data.address)
            that.setData({
              orderId: res.data.data.orderId,
              showWarning: true
            })
          } else if (that.data.type == 2) {
            wx.navigateTo({
              url: '/page/myCollection/pages/jifen/jifen'
            })
          }
          that.setData({
            number: 0,
            delivryType: that.data.type,
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
        } else if (res.data.status == 10230) {
          that.setData({
            showRemind: true
          })
          setTimeout(function () {
            that.setData({
              showRemind: false
            })
          }, 1500)
        }
      }, (err) => {
        console.log("向后台发送数据失败")
      }, () => {
        wx.hideLoading()
      })
    }
  },
  // 服务类型跳转到
  gotoCode() {
     wx.navigateTo({
        url: '/page/myCollection/pages/code/code?id=' + this.data.orderId,
      })
    this.setData({
      showWarning: false
    })
  },
  //支付
  pay: function (param) {
    var that = this;
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        //  console.log("success");
        //  console.log(res);
          that.setData({
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
        wx.navigateTo({
          url: '/page/myCollection/pages/jifen/jifen',
        })
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