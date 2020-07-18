// Componet/Componet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: {
      type: Array,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false,//初始option不显示
    nowText: "切换",//初始内容
    animationData: {},//右边箭头的动画
    show: false
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
      wx.setStorageSync('studentName', nowText);
      wx.setStorageSync('birthday', birthday);
      wx.setStorageSync('studentId', id)
      // 自定义一个事件，并且传值
      this.triggerEvent('myevent', { studentId: id, studentName: nowText, params: nowText, gender:gender,birthday: birthday},)
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
              gender: 1,
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
              weight: "22.34"
            })
            that.setData({
              childrenList: res.data.data,
              show: false
            })
            // wx.setStorageSync('childLength', that.data.childrenList.length)
            wx.navigateTo({
              url: '/page/tabBar/screen/screen'
            })
          }, (err) => {
            console.log(err)
          })
        }
      })
    }
  }
})