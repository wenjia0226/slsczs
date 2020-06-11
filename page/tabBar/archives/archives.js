import * as echarts from '../../common/ec-canvas/ec-canvas/echarts.js';
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
    }
  },
  //请求数据
  onShow() {
    if (wx.getStorageSync('detectType') == 0) {
      this.setData({
        isSelect: 0
      })
    } else {
      this.setData({
        isSelect: 2
      })
    }
    if (wx.getStorageSync('studentId')) {
      this.setData({
        stId: wx.getStorageSync('studentId')
      })
    } else {
      this.getChildrenList();
    }
    this.getArchiveList()
  },
  //删除档案
  deleteItem(e) {
    let delId = e.currentTarget.dataset.id;
    let delType = e.currentTarget.dataset.type;
    let type;
    if(delType == 'luo') {
       type = 1
    }else {
      type = 2
    }
    let that = this;
    let url = app.globalData.URL + 'deleteScreening', data = {
      id: delId,
      type: type
    };
    wx.showModal({
      title: '删除孩子',
      content: '删除档案记录后将无法恢复，是否进行删除？',
      success(res) {
        if (res.confirm) {
          app.wxRequest(url, data, (res) => {
             console.log(res)
            if (res.data.status == 200) {
              that.getArchiveList()
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
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
        //  console.log(res)
        if (res.data.status == 200) {
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
            gender: "",
            lastTime: '',
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
            weight: "22.34",
            lastTime: null
          })
          that.setData({
            stId: that.data.childrenList[0].id
          })
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

  //获取档案列表
  getArchiveList() {
    if(wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...',
      })
    let that = this;
      let url = app.globalData.URL + 'screeningList', data = {
        openId: wx.getStorageSync('openId')
      };
      app.wxRequest(url, data, (res) => { 
        //如果孩子不为空
        if(res.data.data !== null) {
          that.setData({
            navList: res.data.data,
          })
        if(that.data.navList) {
          let stu = that.data.navList;
          let currentStu = stu.filter((item, index) => {
            if (item.id == that.data.stId) {
              return item;
            }
          })
          that.setData({
            navList: currentStu
          })
          if(currentStu.length) {
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
        if (xData.length && leftData.length && rightData.length ) {
         
          //某个人列表赋值
          that.init_one(xData, leftData, rightData) 
        }
        if (wearxData.length && wearleftData.length && wearrightData.length ){
          that.init_two(wearxData, wearleftData, wearrightData)
        }
      }else {  //如果孩子为空
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
  //跳转到详情页
  gotArchiveDetail(e) {
    let id = e.currentTarget.dataset.id;
    if (e.currentTarget.dataset.type == 'luo') {
      wx.navigateTo({
        url: '/page/component/pages/detail/detail?id=' + id
      })
      wx.setStorageSync('lei', e.currentTarget.dataset.type)
    } else if (e.currentTarget.dataset.type == 'wear') {
      wx.navigateTo({
        url: '/page/component/pages/detail/detail?id=' + id
      })
      wx.setStorageSync('lei', e.currentTarget.dataset.type)
    }
  },
  //轮播图切换，对应的孩子切换
  handleChange(e) {
    this.setData({
      i: e.detail.current
    })
    leftData = [];
    rightData = [];
    yData = [];
    this.getArchiveList();
  },
  changeTab(e) {
    this.setData({
      isSelect: e.currentTarget.dataset.type
    })
  },
  //轮播图切换
  swiperChange(e) {
    this.setData({
      isSelect: e.detail.current
    })
  },
  gotoDetail() {
    wx.navigateTo({
      url: '/page/component/pages/detail/detail'
    })
  }
})