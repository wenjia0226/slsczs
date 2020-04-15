// pages/test/test.js
const app = getApp();
Page({
  data: {
    scale: 1,//图片的比例
    scaleWidth: '',//图片设显示宽度
    scaleHeight: '',//图片设显示高度
    lastX: 0,
    lastY: 0,
    text: "没有滑动",
    navList: [],
    levelPre: 9,
    right: 0,
    wrong: 0,
    rightNum: 0,
    wrongNum: 0,
    answer: '空',
    id: 1,
    random: 0,
    number: 0,  //检测数量
    time: 0,  // 检查次数
    right: 0,
    wrong: 0,
    list: []
     },
  voidRight() {
    const rightContext = wx.createInnerAudioContext();
    rightContext.autoplay = true
    rightContext.src = '/image/1.mp3'
    rightContext.onPlay(() => {
      
    })
    rightContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  voidWrong() {
    const wrongContext = wx.createInnerAudioContext();
    wrongContext.autoplay = true
    wrongContext.src = '/image/wrong.mp3'
    wrongContext.onPlay(() => {
      // console.log('开始播放')
    })
    wrongContext.onError((res) => {
      console.log(res.errMsg)
    })
  },
  // 按钮式判断正误
  right(e) {
    let flag = e.currentTarget.dataset.type;
    let that = this;
    //每次测试都计数
    that.setData({
      number: that.data.number + 1
    })
    //等级9 levelName 0.4 4.8/0.6
    if (that.data.levelPre == 9) {
      //循环次数小于5次
      if (that.data.time < 5) {
        // 正确 错误判断 
        if (flag == 'right') {
         this.voidRight(); //调用声音正确
          that.setData({
            id: that.data.id + 1,
            right: that.data.right + 1,  //判断正确+1
            rightNum: that.data.rightNum + 1,
            time: that.data.time + 1
          })
        } else {
          this.voidWrong(); //调用声音错误
          that.setData({
            id: that.data.id + 1,
            wrong: that.data.wrong + 1, //判断错误-1
            wrongNum: that.data.wrongNum + 1,
            time: that.data.time + 1
          })
        }
      }
      //循环次数大于5次后清零 判断升级还是降级
      if (that.data.time == 5) {
        that.data.list.push({
          l: "0.6",
          r: that.data.right,
          w: that.data.wrong
        })
       that.setData({
         list: that.data.list
       })
        wx.setStorageSync('left', that.data.list)
        that.setData({
          time: 0
        })
        if (that.data.right >= 3) {  //如果正确数量大于错误数量 升级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre + 1,
            right: 0,
            wrong: 0
          })
        } else if (that.data.wrong >= 3) { //如果正确数量小于错误数量 降级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre - 1,
            right: 0,
            wrong: 0
          })
        }
      }

      //等级 5 /6 4.9/0.8 和5.0/1.0
    } else if (that.data.levelPre == 10 || that.data.levelPre == 11) {
      if (that.data.time < 5) {   //五次循环 判断对错
        if (flag == 'right') {
          this.voidRight(); //调用声音正确
          that.setData({
            id: that.data.id + 1,
            right: that.data.right + 1,  //判断正确+1
            rightNum: that.data.rightNum + 1,
            time: that.data.time + 1
          })
        } else {
          this.voidWrong(); //调用声音正确
          that.setData({
            id: that.data.id + 1,
            wrong: that.data.wrong + 1, //判断错误-1
            wrongNum: that.data.wrongNum + 1,
            time: that.data.time + 1
          })
        }
      }
      // 测试5次后 逻辑判断 
      if (that.data.time == 5) {
        //五次结束后根据错误数量判断等级
        that.setData({
          time: 0
        })
        //存入数据
        if(that.data.levelPre == 10) {
          that.data.list.push({
            l: "0.8",
            r: that.data.right,
            w: that.data.wrong
          })
        }else if(that.data.levelPre == 11) {
          that.data.list.push({
            l: "1.0",
            r: that.data.right,
            w: that.data.wrong
          })
        }
        wx.setStorageSync('left', that.data.list)
        if (that.data.wrong <= 1) {  //如果错误数量 小于等于1 升级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre + 1,
            right: 0,
            wrong: 0
          })
        } else if (that.data.wrong == 2) { //如果错误数量为2个就是这个等级
          that.setData({
            id: 1,
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionLeft', currentLevel[0].levelName)
          wx.setStorageSync('numLeft', that.data.number)
          wx.setStorageSync('levelName5Left', currentLevel[0].levelName5)
          wx.navigateTo({
            url: '/page/component/pages/result/result'
          })
        } else {  //如果错误数量为3，4，5个就是降级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre - 1,
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionLeft', currentLevel[0].levelName)
          wx.setStorageSync('numLeft', that.data.number)
          wx.setStorageSync('levelName5Left', currentLevel[0].levelName5)
          wx.navigateTo({
            url: '/page/component/pages/result/result'
          })
        }
      }
      //等级 12 13 5.1/1.2   5.2/1.5 
    } else if (that.data.levelPre == 12 || that.data.levelPre == 13) {
      if (that.data.time < 5) {   //五次循环 判断对错
        if (flag == 'right') {
          that.voidRight();
          that.setData({
            id: that.data.id + 1,
            right: that.data.right + 1,  //判断正确+1
            rightNum: that.data.rightNum + 1,
            time: that.data.time + 1
          })
        } else {
          that.voidWrong();
          that.setData({
            id: that.data.id + 1,
            wrong: that.data.wrong + 1, //判断错误-1
            wrongNum: that.data.wrongNum + 1,
            time: that.data.time + 1
          })
        }
      }
      //测试5次后逻辑判断 
      if (that.data.time == 5) {
        //存入数据
        if (that.data.levelPre == 12) {
          that.data.list.push({
            l: "1.2",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 13) {
          that.data.list.push({
            l: "1.5",
            r: that.data.right,
            w: that.data.wrong
          })
        }
        wx.setStorageSync('left', that.data.list)
        //五次结束后根据错误数量判断等级
        that.setData({
          time: 0
        })

        if (that.data.wrong <= 2) {  //如果错误数量 小于等于1 升级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre + 1,
            right: 0,
            wrong: 0
          })
          // 如果等级为9 就跳出循环
          if (that.data.levelPre == 14) {
            return;
          }
        } else if (that.data.wrong == 3) { //如果错误数量为2个就是这个等级
          that.setData({
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionLeft', currentLevel[0].levelName)
          wx.setStorageSync('numLeft', that.data.number)
          wx.setStorageSync('levelName5Left', currentLevel[0].levelName5)
          wx.navigateTo({
            url: '/page/component/pages/result/result'
          })
        } else {  //如果错误数量为4，5个就是降级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre - 1,
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionLeft', currentLevel[0].levelName)
          wx.setStorageSync('numLeft', that.data.number)
          wx.setStorageSync('levelName5Left', currentLevel[0].levelName5)
          wx.navigateTo({
            url: '/page/component/pages/result/result'
          })
        }
      }
      //等级13 5.2/1.5
    } else if (that.data.levelPre == 14) {
      if (that.data.time < 5) {   //五次循环 判断对错
        if (flag == 'right') {
          that.voidRight();
          that.setData({
            id: that.data.id + 1,
            right: that.data.right + 1,  //判断正确+1
            rightNum: that.data.rightNum + 1,
            time: that.data.time + 1
          })
        } else {
          that.voidWrong();
          that.setData({
            id: that.data.id + 1,
            wrong: that.data.wrong + 1, //判断错误-1
            wrongNum: that.data.wrongNum + 1,
            time: that.data.time + 1
          })
        }
      }
      //测试5次后逻辑判断 
      if (that.data.time == 5) {
          that.data.list.push({
            l: "2.0",
            r: that.data.right,
            w: that.data.wrong
          })
        wx.setStorageSync('left', that.data.list)
        //五次结束后根据错误数量判断等级
        that.setData({
          time: 0
        })
        if (that.data.wrong <= 2) {  //如果错误数量 小于等于1 升级
          that.setData({
            id: 1,
            right: 0,
            wrong: 0
          })
        } else if (that.data.wrong >= 3) { //如果错误数量为2个就是这个等级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre - 1,
            right: 0,
            wrong: 0
          })
        }
        let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
        wx.setStorageSync('visionLeft', currentLevel[0].levelName)
        wx.setStorageSync('numLeft', that.data.number)
        wx.setStorageSync('levelName5Left', currentLevel[0].levelName5)
        wx.navigateTo({
          url: '/page/component/pages/result/result'
        })
        }
      //等级1/2/3 4.7/0.5   4.6/0.4   4.5/0.3
    } else if (that.data.levelPre <= 8 || that.data.levelPre >= 1) {
      if (that.data.time < 5) {   //五次循环 判断对错
        if (flag == 'right') {
          that.voidRight();
          that.setData({
            id: that.data.id + 1,
            right: that.data.right + 1,  //判断正确+1
            rightNum: that.data.rightNum + 1,
            time: that.data.time + 1
          })
        } else {
          that.voidWrong();
          that.setData({
            id: that.data.id + 1,
            wrong: that.data.wrong + 1, //判断错误-1
            wrongNum: that.data.wrongNum + 1,
            time: that.data.time + 1
          })
        }
      } //测试5次后逻辑判断
      if (that.data.time == 5) {
        //存入数据
        if (that.data.levelPre == 8) {
          that.data.list.push({
            l: "0.5",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 7) {
          that.data.list.push({
            l: "0.4",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 6) {
          that.data.list.push({
            l: "0.3",
            r: that.data.right,
            w: that.data.wrong
          })
        }else if (that.data.levelPre == 5) {
          that.data.list.push({
            l: "0.25",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 4) {
          that.data.list.push({
            l: 0.2,
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 3) {
          that.data.list.push({
            l: "0.15",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 2) {
          that.data.list.push({
            l: "0.12",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 1) {
          that.data.list.push({
            l: "0.1",
            r: that.data.right,
            w: that.data.wrong
          })
        }
        wx.setStorageSync('left', that.data.list)
        //五次结束后根据错误数量判断等级
        that.setData({
          time: 0
        })
        if (that.data.levelPre !== 1) {
          if (that.data.wrong >= 1) {  //如果错误数量 小于等于1 升级
            that.setData({
              id: 1,
              levelPre: that.data.levelPre - 1,
              right: 0,
              wrong: 0
            })
            return;
          } else if (that.data.wrong == 0) {
            that.setData({
              id: 1,
              right: 0,
              wrong: 0
            })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionLeft', currentLevel[0].levelName)
          wx.setStorageSync('numLeft', that.data.number)
          wx.setStorageSync('levelName5Left', currentLevel[0].levelName5)
          wx.navigateTo({
            url: '/page/component/pages/result/result'
          })
          }
          } else {
          that.setData({
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionLeft', currentLevel[0].levelName)
          wx.setStorageSync('numLeft', that.data.number)
          wx.setStorageSync('levelName5Left', currentLevel[0].levelName5)
          wx.navigateTo({
            url: '/page/component/pages/result/result'
          })
        }
      }
    }
  },
  //结束检测跳转页面
  gotoResult() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '提前结束检测不会保存此次筛查结果，是否结束检测？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            right: 0,
            wrong: 0,
            num: 0,
            levelPre: that.data.levelPre
          })
          wx.switchTab({
            url: "/page/tabBar/screen/screen",
          })
        }
      }
    })
  },
  onShow() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    let url = app.globalData.URL + 'optotype', data = {};
    app.wxRequest(url, data, (res) => {
      // console.log(res.data.data)
      that.setData({
        navList: res.data.data
      })
    }, (err) => {
      console.log(err)
    })
  },
  imgLoad: function (e) {
    var that = this;
    let scale = wx.getStorageSync('scale');
    //写死了，记得删除！！！！！
    that.setData({
      'answer': e.currentTarget.dataset.info.answer,
      'scaleWidth': e.detail.width * scale, //给图片设置宽度
      'scaleHeight': e.detail.height * scale,//给图片设置高度,
      answer: e.currentTarget.dataset.info
    })
  },
  //结束检测
  gotoStart() {
    wx.navigateTo({
      url: '/page/component/pages/result/result'
    })
  },

})