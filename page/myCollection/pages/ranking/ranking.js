// page/myCollection//pages/ranking/ranking.js
const app = getApp();
Page({
  data: {
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '爱眼币排行榜',
      studentId: '',
      firstObj: {},
      secondObj: {},
      thirdObj: {},
      fourList: [],
      integtalRanking: [],
      myIntegral: 0,
      myRanking: 0
    }
  },
  onLoad: function (options) {
    let that = this;
    let url = app.globalData.URL + 'integralRanking', data = {
      studentId: wx.getStorageSync('studentId')
    };
    app.wxRequest(url, data, (res) => {
      //  console.log(res)
      if(res.data.status == 200) {
        that.setData({
          firstObj: res.data.data.integtalRanking[0],
          secondObj: res.data.data.integtalRanking[1],
          thirdObj: res.data.data.integtalRanking[2],
          integtalRanking: res.data.data.integtalRanking.slice(3),
          myRanking: res.data.data.myRanking,
          myIntegral: res.data.data.myIntegral
        })
        console.log(that.data.integtalRanking)
      }
    }) 
  }
})