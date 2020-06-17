// pages/jifen/jifen.js
const app = getApp();
Page({
  data: {
    jifenList: [],
    balance: '',
    expenditure: '',
    income: '',
    state: '',
    type: 0,
    integralType: 1,
    integralPage: 1,
    show: false,
    currentIndex: 0,
    currentStudentId: '',
    childrenList: [],
    receiveList: [],
    page: 1,
    pageSize:5,
    integralPageSize: 5,
    hasMoreData: true,
    integralHasMoreData: true
  },
  onShow: function (options) {
    this.getChildrenList(); 
  },
  gotoRank() {
      wx.navigateTo({
        url: '/page/myCollection/pages/ranking/ranking'
      })
  },
  // 获取当前学生的积分情况
  currentStudentCode() {
    if (this.data.currentStudentId !== '') {
      wx.showLoading({
        title: '加载中...',
      })
      let that = this;
      let url = app.globalData.URL + 'integralList', data = {
        studentId: this.data.currentStudentId,
        integralType: this.data.integralType,
        integralPage: this.data.integralPage
      };
      app.wxRequest(url, data, (res) => {
        //  console.log(res)
        that.setData({
          balance: res.data.data.balance,
          income: res.data.data.income,
          expenditure: res.data.data.expenditure
        })
        if (res.data.status == 200) {
          var resIntegarlCurrent = res.data.data.data;
          var jifenList = that.data.jifenList;
          if (that.data.integralPage == 1) {
            jifenList = []
          }
          if (resIntegarlCurrent.length < that.data.integralPageSize) {
            that.setData({
              integralHasMoreData: false,
              jifenList:jifenList.concat(resIntegarlCurrent),
            })
          } else {
            that.setData({
              jifenList: jifenList.concat(resIntegarlCurrent),
              integralHasMoreData: true,
              integralPage: that.data.integralPage + 1
            })
          }
        } else {
          wx.showToast({
            title: '出现异常',
            icon: 'none'
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  },
  handleGetCode(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/myCollection/pages/code/code?id=' + id
    })
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
          that.setData({
            childrenList: res.data.data,
          })
          let childrenList = res.data.data;
          let item = childrenList.filter((item) => {
            if(item.id == wx.getStorageSync('studentId')) {
              return item
            }
          })
          let crIndex;
          childrenList.filter((item, index) => {
            if (item.id == wx.getStorageSync('studentId')) {
              crIndex = index;
            }
          })
          wx.setStorageSync('selectRankStu', wx.getStorageSync('studentId'))
          that.setData({
            currentIndex: crIndex,
            currentStudentId: item[0].id
           
          })
          that.currentStudentCode();
        }
        if (res.data.status == 10220) {
          that.setData({
            childrenList: []
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  },
  // 点击头像确定当前孩子的积分情况
  getItem(e) {
    let that = this;
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    let student = this.data.childrenList.filter((item, index) => { if (index == that.data.currentIndex) return item });
    that.setData({
      currentStudentId: student[0].id
    }) 
    wx.setStorageSync('selectRankStu', student[0].id)
    if(this.data.type == 0) {
      this.setData({
        integralPage: 1
      })
      this.currentStudentCode();
    }else {
      this.setData({
        page: 1
      })
      this.getLingquList();
    }
  },
  //确定当前孩子具体是哪个
  activeNav: function (e) {
    let that = this;
    this.setData({
      currentIndex: e.detail.current
    })
    if (that.data.childrenList) {
      let student = this.data.childrenList.filter((item, index) => { if (index == that.data.currentIndex) return item  });
      that.setData({
        currentStudentId: student[0].id
      })
   
      wx.setStorageSync('selectRankStu', student[0].id)
      if(this.data.type == 0) {
        this.setData({
         jifenList: [],
         integralPage: 1
        })
        this.currentStudentCode();
      }else if(this.data.type == 1) {
        this.currentStudentCode();
        this.setData({
          page: 1,
          receiveList: []
        })
        this.getLingquList();
      }
    }
  },
  //切换 明细 领取
  switch(e) {
    let that = this;
    this.setData({
      type: e.currentTarget.dataset.type,
      jifenList: [],
    })
    // 切换状态，更新内容
    if(this.data.type == 0) {
      this.setData({
        integralPage: 1,
        jifenList: []
      })
      this.currentStudentCode(); //获取积分情况
    }else {
      this.setData({
        page: 1,
        receiveList: []
      })
      this.getLingquList();
    }    
  },
  // // 下拉刷新
  onPullDownRefresh: function () {
    if(this.data.type == 1) {
      let that = this;
      wx.stopPullDownRefresh();
      setTimeout(function () {
        this.setData({
          page: 1
        })
        this.getLingquList();
      }, 500);
    } else if(this.data.type == 0) {
      let that = this;
      wx.stopPullDownRefresh();
      setTimeout(function () {
        this.setData({
          integralType: 1
        })
        this.currentStudentCode();
      }, 500);
    }
    
  },
  onReachBottom: function () {
    if(this.data.type == 1) {
      if (this.data.hasMoreData) {
        this.getLingquList();
      } else {
        wx.showToast({
          title: '没有更多数据',
        })
      }
    }else if(this.data.type == 0) {
      if (this.data.integralHasMoreData) {
        this.setData({
          integralType: 2
        })
        this.currentStudentCode();
      } else {
        wx.showToast({
          title: '没有更多数据',
        })
      }
    }
    
  },
  // 领取
  getLingquList() {
    let that = this;
    let url = app.globalData.URL + "orderByStudent", data = { studentId: this.data.currentStudentId, page: this.data.page };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        // console.log(res)
        if (res.data.status == 200) {
            var resCurrent= res.data.data;
          let receiveList =  that.data.receiveList;
            if (that.data.page == 1) {
              receiveList = []
            }
            if (resCurrent.length < this.data.pageSize) {
              that.setData({
                hasMoreData: false,
                receiveList: receiveList.concat(resCurrent),
              })
            } else {
              that.setData({
                receiveList: receiveList.concat(resCurrent),
                hasMoreData: true,
                page: that.data.page + 1
              })
            }
          } else {
            wx.showToast({
              title: '出现异常',
              icon: 'none'
            })
          }
      })
    }
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
  gotoGongLve() {
    wx.showToast({
      title: '正在开发，敬请期待',
      icon: 'none',
      duration: 2000
    })
  },
  handleDelete(e) {
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除该条记录吗？',
      showCancel: true,//是否显示取消按钮  false 不显示
      cancelText: "取消",//更改取消
      confirmText: "确认",
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...'
          })
          let deleteId = e.currentTarget.dataset.id;
          let url = app.globalData.URL + "display", data = { id: deleteId }
          app.wxRequest(url, data, (res) => {
            console.log(res)
            if (res.data.status == 200) {
              that.data.page = 1;
              that.setData({
                receiveList: []
              })
              that.getLingquList();
            }
          }) 

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  handleConfirm(e) {
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: '您确定要确认收货吗？',
      showCancel: true,//是否显示取消按钮  false 不显示
      cancelText: "取消",//更改取消
      confirmText: "确认",
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...'
          })
          let confirmId = e.currentTarget.dataset.id;
          let url = app.globalData.URL + "confirmReceipt", data = { id: confirmId }
          app.wxRequest(url, data, (res) => {
            console.log(res)
            if (res.data.status == 200) {
              that.setData({
                receiveList: []
              })
              that.data.page = 1;
              that.getLingquList();
            }
          })  
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})