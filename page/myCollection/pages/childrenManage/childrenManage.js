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
    let that = this;
    let url = app.globalData.URL + 'childrenList', data = {
      openId: wx.getStorageSync('openId')
    };
    app.wxRequest(url, data, (res) => {
      console.log(res.data.data)
      that.setData({
        childrenList: res.data.data
       })
    }, (err) => {
      console.log(err)
    })
  },
  //孩子详情
  gotoChildrenDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/myCollection/pages/mychildren/mychildren?id=' + id,
    })
  },
 //添加孩子
  gotoAddChild() {
   let that = this;
   if (wx.getStorageSync('phone')) {
     wx.showModal({
       title: '添加孩子',
       content: '是否进行扫码添加孩子？',
       success(res) {
         if (res.confirm) {
           wx.scanCode({  //扫码
             success(res) {
               var str = res.path;
               let stuId = str.split('=')[1];
               wx.setStorageSync("studentId", stuId);
               //获取到学生id后添加孩子
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
                  
               }, (err) => {
                 console.log(err)
               })
             }
           })
         } else if (res.cancel) {
           
         }
       }
     })
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