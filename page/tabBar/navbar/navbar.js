// page/assembly/pages/navbar/navbar.js
const app = getApp();
Component({

  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    height: app.globalData.height * 2 + 20,
    wz: app.globalData.wz,
    navTop: app.globalData.navTop
  },
  methods: {
    // 照相打卡
    gotoCamera() {
      wx.navigateTo({
        url: '/page/myCollection/pages/addContent/addContent',
      })
      // wx.chooseImage({
      //   count: 4,
      //   sizeType: ['original', 'compressed'],
      //   sourceType: ['album', 'camera'],
      //   success: function (res) {
      //     console.log(res)
      //     var tempFilePaths = res.tempFilePaths
      //     for (let i = 0; i < tempFilePaths.length; i++) {
      //       wx.uploadFile({
      //         url: app.globalData.URL + 'addTaskPic', //仅为示例，非真实的接口地址
      //         filePath: tempFilePaths[i],
      //         name: 'file',
      //         formData: {
      //           'id': id
      //         },
      //         header: {
      //           "Content-Type": "multipart/form-data"//记得设置
      //         },
      //         success: function (res) {
      //           console.log(res)
      //         }
      //       })
      //     }

      //   }
      // })
    },
  }
  
})