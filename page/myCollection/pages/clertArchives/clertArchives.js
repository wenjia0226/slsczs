import * as echarts from '../ec-canvas/echarts.js';
const app = getApp();
var xData = [], leftData, rightData;
var wearxData = [], wearleftData, wearrightData;
var yData = [0.3, 0.4, 0.5, 0.6, 0.8, 1.0, 1.2, 1.5, 2.0];
function setOption(chart, xData, leftData, rightData) {
  var option = {
    title: {
      text: '视力概况',
      subtext: '',
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 14
      }
    },
    grid: {
      top: '16%',   // 等价于 y: '16%'
      left: '3%',
      top: '20%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      data: ['左眼视力', '右眼视力'],
      orient: 'vertical',
      x: 'right',
      y: 'top',
      padding: [15, 10, 10, 10],
      textStyle: {
        fontSize: 10
      }

    },
    color: ["#37A2DA", '#f00'],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
    },
    yAxis: [{ // 纵轴标尺固定
      type: 'value',
      boundaryGap: [0.2, 0.2],
      data: yData
    }],
    series: [{
      name: '左眼视力',
      type: 'line',
      smooth: true,
      data: leftData
    },
    {
      name: '右眼视力',
      type: 'line',
      smooth: true,
      data: rightData
    }]
  };
  chart.setOption(option);
  return chart
}
Page({
  data: {
    navList: [
    ],
    myIntegral: 0,
    dataList: [],
    picList: [],
    weardataList: [],
    wearpicList: [],
    i: 0,
    list: ['档案列表', '档案图表'],
    showList: true,
    isSelect: 0,
    currentStu: [],
    stId: 0,
    ec: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    },
    selectArray: [],
    studentName: '',
    childrenList: [],
    birthday: '',
    gender: 0,
    balance: 0
  },
  onLoad(options) {
    // this.getChildrenList();
    // this.setData({
    //   studentName: wx.getStorageSync('studentName'),
    //   birthday: wx.getStorageSync('birthday'),
    //   balance: wx.getStorageSync('balance'),
    //   gender: wx.getStorageSync('gender')
    // })
    let studentId = options.studentId;
    this.setData({
      studentId: options.studentId
    })
    this.getArchiveList();
  },

  //获取档案列表
  getArchiveList() {
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...',
      })
      let that = this;
      let url = app.globalData.URL + 'childrenScreening', data = {
        studentId:that.data.studentId
      };
      app.wxRequest(url, data, (res) => {
        //如果孩子不为空
        if (res.data.data !== null) {
          that.setData({
            navList: res.data.data
          })
          that.getCurrentStudentInfo();
        } else {  //如果孩子为空
          that.setData({
            navList: [],
            dataList: [],
            picList: [],
            weardataList: [],
            wearpicList: []
          })
        }
      }, (err) => {
        console.log(err)
      })
    }
  },
  getCurrentStudentInfo() {
    let that = this;
    if (that.data.navList) {
      let currentStu = that.data.navList;
      that.setData({
        birthday: currentStu[0].birthday,
        studentName: currentStu[0].name,
        gender: currentStu[0].gender
      })
      if (currentStu.length) {
        let picList = currentStu.map((item) => {
          return item.picList
        })
        let dataList = currentStu.map((item) => {
          return item.dataList
        })
        let weardataList = currentStu.map((item) => {
          return item.weardataList
        })
        let wearpicList = currentStu.map((item) => {
          return item.wearpicList
        })
        that.setData({
          dataList: dataList[0],
          picList: picList[0],
          weardataList: weardataList[0],
          wearpicList: wearpicList[0]
        })
        let dataList2 = that.data.dataList;
        let picList2 = that.data.picList;

        let weardataList2 = that.data.weardataList;
        let wearpicList2 = that.data.wearpicList;
        xData = picList2.map((item) => {
          return item.date
        })
        leftData = picList2.map((item) => {
          return item.visionLeftStr
        })
        rightData = picList2.map((item) => {
          return item.visionRightStr
        })
        wearxData = wearpicList2.map((item) => {
          return item.date
        })
        wearleftData = wearpicList2.map((item) => {
          return item.visionLeftStr
        })
        wearrightData = wearpicList2.map((item) => {
          return item.visionRightStr
        })
      }
    }
    that.oneComponent = that.selectComponent('#mychart-one');
    that.twoComponent = that.selectComponent("#mychart-two");
    if (xData.length && leftData.length && rightData.length) {
      //某个人列表赋值
      that.init_one(xData, leftData, rightData)
    }
    if (wearxData.length && wearleftData.length && wearrightData.length) {
      that.init_two(wearxData, wearleftData, wearrightData)
    }

  },
  init_one(xData, leftData, rightData) {
    // console.log(this.oneComponent)
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      //console.log(xData, leftData, rightData)
      setOption(chart, xData, leftData, rightData)
      this.chart = chart;
      return chart;
    })
  },
  init_two(wearxData, wearleftData, wearrightData) {
    this.twoComponent.init((canvas, width, height) => {
      const chart2 = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // console.log(chart2, wearxData, wearleftData, wearrightData)
      setOption(chart2, wearxData, wearleftData, wearrightData)
      this.chart2 = chart2;
      return chart2;
    })
  },
  changeTab(e) {
    this.setData({
      isSelect: e.currentTarget.dataset.type
    })
  },

  gotoDetail() {
    wx.navigateTo({
      url: '/page/component/pages/detail/detail'
    })
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
 
})