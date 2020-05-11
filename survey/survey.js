import * as echarts from "../page/common/ec-canvas/ec-canvas/ec-canvas";
const app = getApp();
function getPieOption (chart, undetected, untask, decline) {
  var option = {
    tooltip: {
      show: true,
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    color: ['#56cbff', '#ff6300'],
    calculable: true,
    series: [{
      name: '分类',
      type: 'pie',
      center: ['50%', '50%'],
      radius: 80,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'inner',
            formatter: function (params) {
              return (params.percent - 0).toFixed(0) + '%'
            }
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          label: {
            show: true,
            formatter: "{b}\n{d}%"
          }
        }
      },
      data: [{
        value: 99,
        name: 'A'
      },
      {
        value: 1,
        name: 'B'
      }
      ]
    }]
  };
  chart.setOption(option);
  return chart;
}
Page({

  data: {
    undetected: 0,
    decline: 0,
    untask: 0,
    ec3: {
      lazyLoad: false // 延迟加载
    }, //饼图
  },
  onShow() {
    let that = this;
    let url = app.globalData.URL + "teacherPage", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        if (res.data.status == 200) {
          res ? res = res.data.data : '';
          that.setData({
            undetected: res.undetected,
            untask: res.untask,
            decline: res.untask
          })
          that.piechartsComponnet = this.selectComponent('#mychart-dom-bar'); //饼图
          that.init_one(res.undetected, res.untask, res.decline) 
        }
      })
    }
  },
  init_one(undetected,untask, decline) {
    this.piechartsComponnet.init((canvas, width, height) => {
      console.log(echarts)
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      getPieOption(chart, undetected, untask, decline)
      this.chart = chart;
      return chart;
    })
  },
  gotoNoCheck() {
    wx.navigateTo({
      url: "/noCheck/noCheck",
    })
  }
})