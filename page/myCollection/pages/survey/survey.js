import * as echarts from "../ec-canvas/echarts";
const app = getApp();
function getPieOption(chart, good, mild, moderate, serious) {
  var option = {
    tooltip: {
      show: true,
      formatter: "{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'right', 
      selectedMode: false,
      // data: ["良好", "轻度", "中度", "重度"]
      data: ['良好' + '(' + good + ')', '轻度' + '(' + mild + ')', '中度' + '(' + moderate + ')', '重度' + '(' + serious + ')']
    },
    color: ['#0793ff', '#ffaa07', '#ff0724', '#6f0427'],
    calculable: true,
    series: [{
      name: '视力概况',
      type: 'pie',
      center: ['50%', '50%'],
      radius: 90,
        emphasis: {
          label: {
            show: true,
            position: 'center'
          }
        },
      data: [{
        value: good,
        name: '良好' + '('+good +')',
        url: ''
      },
      {
        value: mild,
        name: '轻度' + '(' + mild + ')',
        url: 'mild'
      },
      {
       value: moderate,
        name: '中度' + '(' + moderate + ')',
        url: 'moderate'
      },
      {
        value: serious,
        name: '重度' + '(' + serious + ')',
        url: 'serious'
      }
      ]
    }]
  }
  chart.setOption(option);
  chart.on('click', function(param) {
    let type = param.data.url;
    let that = this;
    if (type == 'mild') {
       wx.navigateTo({
         url: '/page/myCollection/pages/middle/middle?type=mild',
       })
    } else if (type == 'moderate') {
      wx.navigateTo({
        url: '/page/myCollection/pages/moderate/moderate?type=moderate',
      })
    } else if (type == 'serious') {
      wx.navigateTo({
        url: '/page/myCollection/pages/serious/serious?type=serious',
      })
    }
  })
  return chart;
}
Page({
  data: {
    undetected: 0,
    decline: 0,
    untask: 0,
    ec3: {
      lazyLoad: false // 延迟加载
    }, 
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
            decline: res.decline
          })
          let good = res.good,
          mild = res.mild,
          moderate = res.moderate,
          serious = res.serious;
          that.piechartsComponnet = this.selectComponent('#mychart-dom-bar'); //饼图
          that.init_one(good, mild, moderate, serious) 
        }
      })
    }
  },
  init_one(good, mild, moderate, serious) {
    this.piechartsComponnet.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      getPieOption(chart, good, mild, moderate, serious)
      this.chart = chart;
      return chart;
    })
  },
  gotoNoCheck() {
    wx.navigateTo({
      url: "/page/myCollection/pages/noCheck/noCheck"     
    })
  },
  gotoDown() {
    wx.navigateTo({
      url: "/page/myCollection/pages/down/down"
    })
  },
  gotoTask() {
    wx.navigateTo({
      url: "/page/myCollection/pages/clock/clock"
    })
  },
  gotoScan() {
    let that = this;
    wx.scanCode({  //扫码
      success(res) {
        var str = res.path;
        let stuId = str.split('=')[1];
        wx.navigateTo({
          url: '/page/tabBar/screen/screen?studentId=' + stuId + '&tempFlag=' + 1
        })
        //获取到学生id后添加孩子
      }
    })
  },
  // 退出登录
  loginOut() {
    let that = this;
    let url = app.globalData.URL + 'loginOut', data = { openId: wx.getStorageSync('openId')};
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        if (res.data.status == 200) {
          wx.switchTab({
            url: '/page/tabBar/my/my',
          })
        }
      })
    }
})