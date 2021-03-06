// pages/childrenManage/childrenManage.js
const app = getApp();
Page({
  data: {
    childrenList: [],
    show: false,
    show3: false,
    removeStuId: ''
  },
  onShow: function (options) { 
    wx.showLoading({
      title: '加载中...',
    })
    this.getChildrenList();
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + 'childrenList', data = {
      openId: wx.getStorageSync('openId')
    };
    app.wxRequest(url, data, (res) => {
      // console.log(res)
      that.setData({
        childrenList: res.data.data
      })
      if(res.data.status == 200) {
        let childrenList = res.data.data;
        childrenList.forEach((item) => {
          if (item.myIntegral == null) {
            item.myIntegral = 0
          }
        })
        that.setData({
          childrenList: childrenList
        })
        wx.setStorageSync('studentId', childrenList[0].id);
        wx.setStorageSync('selectRankStu', childrenList[0].id);
        wx.setStorageSync('gender', childrenList[0].gender)
        wx.setStorageSync('studentName', childrenList[0].name)
      }
    }, (err) => {
      console.log(err)
    })
  },
  //信息移植
  removeInfo(e) {
    this.setData({
      show: false
    })
    let that = this;
    if (wx.getStorageSync('phone')) {
      wx.showModal({
        title: '迁移孩子',
        content: '您确定要迁移孩子吗？',
        cancelText: "取消",
        confirmText: "确定",
        success(res) {
          if (res.confirm) {
            wx.scanCode({  //扫码
              success(res) {
                var str = res.path;
                let stuId = str.split('=')[1];  
                let openId = wx.getStorageSync('openId');
                let url = app.globalData.URL + 'transplantStudent', data = {
                  newId: stuId,
                  oldId: that.data.removeStuId,
                  openId: wx.getStorageSync('openId')
                };
                wx.showLoading({
                  title: '加载中...',
                })
                app.wxRequest(url, data, (res) => {
                  that.getChildrenList();
                }, (err) => {
                  console.log(err)
                })
              }
            })
          } else if (res.cancel) {  // 跳转到手动添加
            // wx.navigateTo({
            //   url: '/page/myCollection/pages/chidrenManage/chidrenManage'
            // })
          }
        }
      })
      // 如果没登录跳转到登录页
    } else {
      wx.navigateTo({
        url: '/nicheng/nicheng'
      })
    }
  },
  //孩子详情
  gotoChildrenDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/myCollection/pages/mychildren/mychildren?id=' + id,
    })
  },
  // 蒙层
  hideview(e) {
    let removeStuId = e.currentTarget.dataset.id;
    this.setData({
      show: true,
      removeStuId: removeStuId
    })
  },
  hide() {
    this.setData({
      show: false
    })
  },
  // 蒙层
  hideview3() {
    this.setData({
      show3: true
    })
  },
  hide3() {
    this.setData({
      show3: false
    })
  },
  // // 跳转到添加孩子页面
  // gotoAddChild() {
  //   let that = this;
  //   if (wx.getStorageSync('phone')) {
  //     wx.showModal({
  //       title: '添加孩子',
  //       content: '是否进行扫码添加孩子？',
  //       cancelText: "手动添加",
  //       confirmText: "扫码添加",
  //       success(res) {
  //         if (res.confirm) {
  //           wx.scanCode({  //扫码
  //             success(res) {
  //               var str = res.path;
  //               let stuId = str.split('=')[1];
  //               //获取到学生id后添加孩子
  //               wx.setStorageSync('studentId', stuId);
  //               let openId = wx.getStorageSync('openId');
  //               let url = app.globalData.URL + 'binding', data = {
  //                 studentId: stuId,
  //                 openId: wx.getStorageSync('openId')
  //               };
  //               wx.showLoading({
  //                 title: '加载中...',
  //               })
  //               app.wxRequest(url, data, (res) => {
  //                 that.setData({
  //                   childrenList: res.data.data
  //                 })
  //                 that.data.childrenList.push({
  //                   age: 8,
  //                   birthday: "2019-04-01",
  //                   chairHeight: "60",
  //                   classesId: 42,
  //                   classesName: "二（3）班",
  //                   correct: 0,
  //                   description: "",
  //                   gender: 1,
  //                   height: "125",
  //                   id: 2,
  //                   name: "新增",
  //                   nature: "无",
  //                   parentPhone: "18311192425",
  //                   regionId: 1,
  //                   regionName: "唐山",
  //                   schoolId: 50,
  //                   schoolName: "唐山市师范附属小学",
  //                   sittingHeight: "105.0",
  //                   weight: "22.34"
  //                 })
  //                 that.setData({
  //                   childrenList: res.data.data
  //                 })
  //                 // wx.setStorageSync('childLength', that.data.childrenList.length)
  //                 wx.switchTab({
  //                   url: '/page/tabBar/screen/screen'
  //                 })
  //               }, (err) => {
  //                 console.log(err)
  //               })
  //             }
  //           })
  //         } else if (res.cancel) {  // 跳转到手动添
  //         console.log(222)
  //           that.setData({
  //             currentIndex: that.data.childrenList.length - 2
  //           })
  //           wx.navigateTo({
  //             url: '/manualTwo/manualTwo',
  //           })
  //         }
  //       }
  //     })
  //     // 如果没登录跳转到登录页
  //   } else {
  //     wx.navigateTo({
  //       url: '/nicheng/nicheng'
  //     })
  //   }
  // },
  //删除孩子
  deleteChild(e){
    let studentId = e.currentTarget.dataset.del;
    let that = this;
    wx.showModal({
      title: '删除孩子',
      content: '您确定要删除孩子？',
      success(res) {
        if (res.confirm) {
          let url = app.globalData.URL + 'relieve', data = {
            openId: wx.getStorageSync('openId'),
            studentId
          };
          wx.showLoading({
            title: '加载中...',
          })
          app.wxRequest(url,data, (res) => {
            let childCollection = res.data.data;
            if (childCollection.length == 1) {
              let student = res.data.data;
              wx.setStorageSync('studentId', student[0].id)
              wx.setStorageSync('selectRankStu', student[0].id);
              wx.setStorageSync('gender', student[0].gender);
              wx.setStorageSync('studentName', student[0].name)
              wx.setStorageSync('birthday', student[0].birthday)
              wx.setStorageSync('balance', student[0].balance)
              wx.setStorageSync('ranking', student[0].ranking)
              that.setData({
                childrenList: res.data.data
              })
            } else if (childCollection.length > 1) {
                that.setData({
                  childrenList: res.data.data
                })
                wx.setStorageSync('studentId', that.data.childrenList[0].id);
                wx.setStorageSync('selectRankStu', that.data.childrenList[0].id);
                wx.setStorageSync('gender', that.data.childrenList[0].gender);
                wx.setStorageSync('studentName', that.data.childrenList[0].studentName)
                wx.setStorageSync('birthday', that.data.childrenList[0].birthday)
                wx.setStorageSync('balance', that.data.childrenList[0].balance)
                wx.setStorageSync('ranking', that.data.childrenList[0].ranking)
             
            }else {
              that.setData({
                childrenList: []
              })
              wx.setStorageSync('studentId', '')
              wx.setStorageSync('selectRankStu', '');
              wx.setStorageSync('gender', 2);
              wx.setStorageSync('studentName', '')
              wx.setStorageSync('birthday', '')
              wx.setStorageSync('balance', '')
              wx.setStorageSync('ranking', '')
            }
          }, (err) => {
            console.log(err)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  // 手动添加
  gotoManu() {
    wx.showToast({
      title: '暂未开启该功能',
    })
    // wx.navigateTo({
    //   url: '/manualTwo/manualTwo'
    // })

  },
  //扫码添加
  gotoScan() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        var str = res.path;
        let stuId = str.split('=')[1];
        //获取到学生id后添加孩子
        wx.setStorageSync('studentId', stuId);
        wx.setStorageSync('selectRankStu', stuId);
        let openId = wx.getStorageSync('openId');
        let url = app.globalData.URL + 'binding', data = {
          studentId: stuId,
          openId: wx.getStorageSync('openId')
        };
        wx.showLoading({
          title: '加载中...',
        })
        app.wxRequest(url, data, (res) => {
          that.setData({
            childrenList: res.data.data,
            show3: false
          })
          let student = res.data.data;
          wx.setStorageSync('studentId', student[0].id);
          wx.setStorageSync('selectRankStu', student[0].id);
          wx.setStorageSync('gender', student[0].gender);
          wx.setStorageSync('studentName', student[0].name)
          wx.setStorageSync('birthday', student[0].birthday)
          wx.setStorageSync('balance', student[0].balance)
          wx.setStorageSync('ranking', student[0].ranking)
        }, (err) => {
          console.log(err)
        })
      }
    })
  }
})