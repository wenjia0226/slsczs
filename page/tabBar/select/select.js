// Componet/Componet.js
const app = getApp();
Component({
  properties: {
    propArray: {
      type: Array,
    },
  },
  data: {
    selectShow: false,//初始option不显示
    nowText: "切换孩子",//初始内容
    animationData: {},//右边箭头的动画
    show: false,
    prevRoute: ''
  },
  methods: {
    // 添加孩子按钮
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
    onShow() {
      let pages = getCurrentPages();
      let prevpage = pages[pages.length - 2];//上一个页面对象

      console.log(prevpage.route)//上一个页面路由地址
    },
    　　　//option的显示与否
    selectToggle: function () {
      var nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index;//当前点击的索引
      var nowText = nowData[nowIdx].name;//当前点击的内容
      var id = e.target.dataset.id;
      let gender = e.target.dataset.gender;
      let birthday = e.target.dataset.birthday;
      let balance = e.target.dataset.balance;
      wx.setStorageSync('studentName', nowText);
      wx.setStorageSync('birthday', birthday);
      wx.setStorageSync('studentId', id);
      wx.setStorageSync('balance', balance);
      wx.setStorageSync('gender', gender);
      // 自定义一个事件，并且传值
      this.triggerEvent('myevent', { studentId: id, studentName: nowText, params: nowText, gender:gender,birthday: birthday, balance: balance})
      // this.triggerEvent('chilrenList',{childrenList: childrenList})
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        // nowText: nowText,
        animationData: this.animation.export()
      })
    },
    // 手动添加
    gotoManu() {
      wx.navigateTo({
        url: '/manual/manual'
      })
    },
    //扫码添加
    gotoScan() {
      let pages = getCurrentPages();
      let prevpage = pages[pages.length -1];//上一个页面对象
      this.setData({
        prevRoute: prevpage.route
      })
      
      let that = this;
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
            if(res.data.data) {
              res.data.data.push({
                name: '添加孩子'
              })
            }
            that.setData({
              childrenList: res.data.data,
              show: false
            })
            // 自定义一个事件，并且传值
           
            that.triggerEvent('newchildrenlist', { newChildrenList: that.data.childrenList })
            // if (that.data.prevpRoute == "page/myCollection/pages/plan/plan" || that.data.prevRoute == 'page/myCollection/pages/archives/archives' || that.data.prevRoute == 'page/mainFunction/pages/result/result') {
            //   wx.navigateTo({
            //     url: '/' + that.data.prevRoute
            //   })
            // }else {
            //   wx.switchTab({
            //     url: '/' + that.data.prevRoute
            //   })
            // }
            that.selectToggle();
            
          }, (err) => {
            console.log(err)
          })
        }
      })
    }
  }
})