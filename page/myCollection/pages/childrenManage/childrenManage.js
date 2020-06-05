// pages/childrenManage/childrenManage.js
const app = getApp();
Page({
  data: {
    childrenList: []
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
    }, (err) => {
      console.log(err)
    })
  },
  //信息移植
  removeInfo(e) {
    console.log(e)
   
    console.log(removeStuId)
    wx
  },
  // 跳转到添加孩子页面
  removeInfo(e) {
    let that = this;
    let removeStuId = e.currentTarget.dataset.id;
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
                  oldId: removeStuId,
                  openId: wx.getStorageSync('openId')
                };
                wx.showLoading({
                  title: '加载中...',
                })
                app.wxRequest(url, data, (res) => {
                  console.log(res, 123)
                  
                  that.getChildrenList();
                }, (err) => {
                  console.log(err)
                })
              }
            })
          } else if (res.cancel) {  // 跳转到手动添加
            wx.switchTab({
              url: '/page/myCollection/pages/chidrenManage/chidrenManage'
            })
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
//  //添加孩子
//   gotoAddChild() {
//    let that = this;
//    if (wx.getStorageSync('phone')) {
//      wx.showModal({
//        title: '添加孩子',
//        content: '是否进行扫码添加孩子？',
//        success(res) {
//          if (res.confirm) {
//            wx.scanCode({  //扫码
//              success(res) {
//                var str = res.path;
//                let stuId = str.split('=')[1];
//                wx.setStorageSync("studentId", stuId);
//                //获取到学生id后添加孩子
//                let openId = wx.getStorageSync('openId');
//                let url = app.globalData.URL + 'binding', data = {
//                  studentId: stuId,
//                  openId: wx.getStorageSync('openId')
//                };
//                wx.showLoading({
//                  title: '加载中...',
//                })
//                app.wxRequest(url, data, (res) => {
//                  that.setData({
//                      childrenList: res.data.data
//                    })
                  
//                }, (err) => {
//                  console.log(err)
//                })
//              }
//            })
//          } else if (res.cancel) {
           
//          }
//        }
//      })
//    } else {
//      wx.navigateTo({
//        url: '/nicheng/nicheng'
//      })
//    }
//  },
  // 跳转到添加孩子页面
  gotoAddChild() {
    let that = this;
    if (wx.getStorageSync('phone')) {
      wx.showModal({
        title: '添加孩子',
        content: '是否进行扫码添加孩子？',
        cancelText: "手动添加",
        confirmText: "扫码添加",
        success(res) {
          if (res.confirm) {
            wx.scanCode({  //扫码
              success(res) {
                var str = res.path;
                let stuId = str.split('=')[1];
                //获取到学生id后添加孩子
                wx.setStorageSync('studentId', stuId);
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
                    childrenList: res.data.data
                  })
                  that.data.childrenList.push({
                    age: 8,
                    birthday: "2019-04-01",
                    chairHeight: "60",
                    classesId: 42,
                    classesName: "二（3）班",
                    correct: 0,
                    description: "",
                    gender: 1,
                    height: "125",
                    id: 2,
                    name: "新增",
                    nature: "无",
                    parentPhone: "18311192425",
                    regionId: 1,
                    regionName: "唐山",
                    schoolId: 50,
                    schoolName: "唐山市师范附属小学",
                    sittingHeight: "105.0",
                    weight: "22.34"
                  })
                  that.setData({
                    childrenList: res.data.data
                  })
                  // wx.setStorageSync('childLength', that.data.childrenList.length)
                  wx.switchTab({
                    url: '/page/tabBar/screen/screen'
                  })
                }, (err) => {
                  console.log(err)
                })
              }
            })
          } else if (res.cancel) {  // 跳转到手动添加
            console.log('用户点击取消');
            that.setData({
              currentIndex: that.data.childrenList.length - 2
            })
            wx.navigateTo({
              url: '/manual/manual',
            })
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
            // console.log(res)
            let childCollection = res.data.data;
            if (childCollection.length == 1) {
              let student = res.data.data;
              student.map((item) => {
                wx.setStorageSync('studentId', item.id)
              })
              that.setData({
                childrenList: res.data.data
              })
            } else if (childCollection.length > 1) {
              that.setData({
                childrenList: res.data.data
              })
              // console.log(that.data.childrenList[0])
              wx.setStorageSync('studentId', that.data.childrenList[0].id)
            }else {
              that.setData({
                childrenList: []
              })
              wx.setStorageSync('studentId', '')
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
  }
})