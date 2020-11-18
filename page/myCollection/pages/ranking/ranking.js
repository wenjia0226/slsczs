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
      myRanking: 0,
      selectArray:[]
    }
  },
  onLoad: function (options) {
    this.setData({
      selectArray: [{ text: '区排名' }, { text: '学校排名' }]
    })
    let that = this;
    let stuId ='';
    let url = app.globalData.URL + 'integralRanking', data = {
      studentId: wx.getStorageSync('selectRankStu'),
      type: 'school'
    };
    app.wxRequest(url, data, (res) => {
      //  console.log(res)
      if(res.data.status == 200) {
        if (res.data.data.integtalRanking.length >3) {
          that.setData({
            firstObj: res.data.data.integtalRanking[0],
            secondObj: res.data.data.integtalRanking[1],
            thirdObj: res.data.data.integtalRanking[2],
            integtalRanking: res.data.data.integtalRanking.slice(3),
            myRanking: res.data.data.myRanking,
            myIntegral: res.data.data.myIntegral
          })
        } else if (res.data.data.integtalRanking.length == 0) {
          that.setData({
            firstObj: {},
            secondObj: {},
            thirdObj: {},
            myRanking: res.data.data.myRanking,
            myIntegral: res.data.data.myIntegral
          })
        }
         else if (res.data.data.integtalRanking.length == 1) {
          that.setData({
            firstObj: res.data.data.integtalRanking[0],
            secondObj: {},
            thirdObj: {},
            integtalRanking: [],
            myRanking: res.data.data.myRanking,
            myIntegral: res.data.data.myIntegral
          })
        } else if (res.data.data.integtalRanking.length == 2) {
          that.setData({
            firstObj: res.data.data.integtalRanking[0],
            secondObj: res.data.data.integtalRanking[1],
            thirdObj: {},
            integtalRanking: [],
            myRanking: res.data.data.myRanking,
            myIntegral: res.data.data.myIntegral
          })
        } else if (res.data.data.integtalRanking.length == 3) {
          that.setData({
            firstObj: res.data.data.integtalRanking[0],
            secondObj: res.data.data.integtalRanking[1],
            thirdObj: res.data.data.integtalRanking[2],
            integtalRanking: [],
            myRanking: res.data.data.myRanking,
            myIntegral: res.data.data.myIntegral
          })
        } 
       
      }
    }) 
  },
  myevent(e) {
    this.setData({
      searchParam: e.detail.params
    })
    this.getRecord() 
  },
  getRecord() {
    let that = this;
    let type = '';
    let url = app.globalData.URL + 'integralRanking';
    if(this.data.searchParam == '区排名') {
      type = 'region'
    }else if(this.data.searchParam == '学校排名') {
      type ='school'
    }
     let data = {
        studentId: wx.getStorageSync('selectRankStu'),
        type: type
      };
      app.wxRequest(url, data, (res) => {
        // console.log(res)
        if (res.data.status == 200) {
          that.setData({
            firstObj: res.data.data.integtalRanking[0],
            secondObj: res.data.data.integtalRanking[1],
            thirdObj: res.data.data.integtalRanking[2],
            integtalRanking: res.data.data.integtalRanking.slice(3),
            myRanking: res.data.data.myRanking,
            myIntegral: res.data.data.myIntegral
          })
        }
      }) 
    }
})