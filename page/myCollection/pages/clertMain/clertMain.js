// page/myCollection//pages/clertMain/clertMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },  
  gotoAddChun() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        let studentId = res.result;
        wx.navigateTo({
          url: '/page/myCollection/pages/archiveUpdate/archiveUpdate?studentId=' + studentId,
        })
      }
    })
  },
  gotoShai() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        let studentId = res.result;
        wx.navigateTo({
          url: '/page/myCollection/pages/clertArchives/clertArchives?studentId=' + studentId
        })
      }
    })
  },
  gotoDuihuan() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        //console.log(res)
        let studentId = res.result;
        wx.navigateTo({
          url: '/page/myCollection/pages/clertExchange/clertExchange?studentId=' + studentId
        })
      }
    })
  },
  gotoLiebiao() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        // console.log(res)
        let studentId = res.result;
        wx.navigateTo({
          url: '/page/myCollection/pages/clertPage/clertPage'
        })
      }
    })
    
  }
})