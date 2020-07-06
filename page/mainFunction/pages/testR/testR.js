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
    selectNavList: [],
    pathList: [],
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
    list: [],
    noUpdate: false,
    rightEyeRightNum: 0,
    rightEyeWrongNum: 0,
    chooseId: 's9',
    toview: 's9'
  },
  selecteLevel(e) {
    let that = this;
    this.setData({
      chooseId: e.currentTarget.dataset.chooseid,
      toview: e.currentTarget.dataset.chooseid,
      levelPre: Number(e.currentTarget.dataset.chooseid.substring(1))
    })
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
    })
    wrongContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  //结束检测跳转页面
  gotoResult() {
    let that = this;
    if(this.data.rightNum !== 0) {
      wx.showModal({
        title: '提示',
        content: '是否结束右眼测试？',
        success: function (res) {
            if (res.confirm) {
            let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
            wx.setStorageSync('visionRight', currentLevel[0].levelName)
            wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
            that.data.list.push({
              l: currentLevel[0].levelName,
              r: that.data.right,
              w: 5 - that.data.right
            })
            let wrong = that.data.wrongNum + 5 - that.data.wrong- that.data.right;
            wx.setStorageSync('right', that.data.list)
            wx.setStorageSync('RightEyeRightNum', that.data.rightNum);
            wx.setStorageSync('RightEyeWrongNum', wrong);
            wx.navigateTo({
              url: "/page/component/pages/rightstart/rightstart",
            })
          }
        }
      })
    }else {
      wx.showModal({
        title: '此次检测无效',
        content: '是否重新检测右眼？',
        cancelText: '跳到首页',//默认是“取消”
        confirmText: "是",
        success: function(res) {
          if(res.confirm) {
            that.setData({
              list: [],
              right: 0,
              wrong: 0,
              rightNum: 0,
              wrongNum: 0,
              levelPre: 9,
              id: 1,
              time: 0
               //从第一张图重新开始
            })
            //that.onShow()
          }else {
            wx.switchTab({
              url: '/page/tabBar/screen/screen'
            })
          }
          wx.setStorageSync('right', '')
          wx.setStorageSync('RightEyeRightNum', 0);
          wx.setStorageSync('RightEyeWrongNum', 0);
 
        }
      })
    }
    
  },
  onShow() {
    wx.showLoading({
      title: '加载中...',
    })
    this.getList();
    this.setData({
      rightEyeRightNum: wx.getStorageSync('RightEyeRightNum'),
      rightEyeWrongNum: wx.getStorageSync('RightEyeWrongNum')
    })
    
  },
  getList() {
    var that = this;
    let url = app.globalData.URL + 'optotype', data = {};
    //页面出现先清空数据
    wx.setStorageSync('right', '');
    wx.setStorageSync('RightEyeRightNum', 0);
    wx.setStorageSync('RightEyeWrongNum', 0);
    app.wxRequest(url, data, (res) => {
      that.setData({
        navList: res.data.data
      })
      let newArr = [];
      let navList = that.data.navList;
      for(let i = 0; i< navList.length; i++) {
        newArr.push({
          levelId: 's' + navList[i].levelId,
          levelName: navList[i].levelName,
          levelName5: navList[i].levelName5
        })
      }
      
      that.setData({
        selectNavList: newArr,
        toview: 's9'
      })
    }, (err) => {
      console.log(err)
    })
  },
  right(e) {
    let flag = e.currentTarget.dataset.type;
    let that = this;
    //等级9 levelName 0.4 4.8/0.6
    if (that.data.levelPre == 9) {
      //循环次数小于5次
      if (that.data.time < 5) {
        // 正确 错误判断 
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

        wx.setStorageSync('right', that.data.list)
        that.setData({
          time: 0
        })
        if (that.data.right >= 3) {  //如果正确数量大于错误数量 升级
          that.setData({
            id: 1,
            right: 0,
            wrong: 0,
            levelPre: that.data.levelPre + 1,

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
      // 测试5次后 逻辑判断 
      if (that.data.time == 5) {
        //存入数据
        if (that.data.levelPre == 10) {
          that.data.list.push({
            l: "0.8",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 11) {
          that.data.list.push({
            l: "1.0",
            r: that.data.right,
            w: that.data.wrong
          })
        }
        wx.setStorageSync('right', that.data.list)
        //五次结束后根据错误数量判断等级
        that.setData({
          time: 0
        })
        if (that.data.wrong <= 1) {  //如果错误数量 小于等于1 升级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre + 1,
            right: 0,
            wrong: 0
          })
          console.log(that.data.levelPre, 9999)
        } else if (that.data.wrong == 2) { //如果错误数量为2个就是这个等级
          that.setData({
            id: 1,
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionRight', currentLevel[0].levelName);
          wx.setStorageSync('levelName5Right', currentLevel[0].levelName5);
          wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
          wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
          wx.navigateTo({
            url: '/page/component/pages/rightstart/rightstart'
          })
        } else {  //如果错误数量为3，4，5个就是降级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre - 1,
            right: 0,
            wrong: 0
          })

          console.log(that.data.navList, that.data.levelPre)
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionRight', currentLevel[0].levelName)
          wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
          wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
          wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
          wx.navigateTo({
            url: '/page/component/pages/rightstart/rightstart'
          })
        }
      }
      //等级7/8/9  5.1/1.2   5.2/1.5   5.3/2.0
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
        wx.setStorageSync('right', that.data.list)
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
          //  // 如果等级为9 就跳出循环
          if (that.data.levelPre == 14) {
            return;
          }
        } else if (that.data.wrong == 3) { //如果错误数量为2个就是这个等级
          that.setData({
            right: 0,
            wrong: 0
          })
          console.log(that.data.navList, that.data.levelPre)
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionRight', currentLevel[0].levelName)
          wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
          wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
          wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
          wx.navigateTo({
            url: '/page/component/pages/rightstart/rightstart'
          })
        } else {  //如果错误数量为4，5个就是降级
          that.setData({
            id: 1,
            levelPre: that.data.levelPre - 1,
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionRight', currentLevel[0].levelName)
          wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
          wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
          wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
          wx.navigateTo({
            url: '/page/component/pages/rightstart/rightstart'
          })
        }
        let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
        wx.setStorageSync('visionRight', currentLevel[0].levelName)
        wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
        wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
        wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
        if (that.data.levelPre == 9) {
          wx.navigateTo({
            url: '/page/component/pages/rightstart/rightstart'
          })
        }
      }
      //等级1/2/3 4.7/0.5   4.6/0.4   4.5/0.3
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
        wx.setStorageSync('right', that.data.list)
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
        wx.setStorageSync('visionRight', currentLevel[0].levelName)
        wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
        wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
        wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
        wx.navigateTo({
          url: '/page/component/pages/rightstart/rightstart'
        })
      }
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
        } else if (that.data.levelPre == 5) {
          that.data.list.push({
            l: "0.25",
            r: that.data.right,
            w: that.data.wrong
          })
        } else if (that.data.levelPre == 4) {
          that.data.list.push({
            l: "0.2",
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
        wx.setStorageSync('right', that.data.list)
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
            console.log(that.data.navList, that.data.levelPre)
            let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
            wx.setStorageSync('visionRight', currentLevel[0].levelName)
            wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
            wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
            wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
            wx.navigateTo({
              url: '/page/component/pages/rightstart/rightstart'
            })
          }

        } else { //如果为等级1
          if (that.data.rightNum == 0) {
            this.setData({
              noUpdate: true
            })
          }
          that.setData({
            right: 0,
            wrong: 0
          })
          let currentLevel = that.data.navList.filter((item) => { return item.levelId == that.data.levelPre });
          wx.setStorageSync('visionRight', currentLevel[0].levelName)
          wx.setStorageSync('levelName5Right', currentLevel[0].levelName5)
          wx.setStorageSync('RightEyeRightNum', that.data.rightNum)
          wx.setStorageSync('RightEyeWrongNum', that.data.wrongNum)
          wx.navigateTo({
            url: '/page/component/pages/rightstart/rightstart'
          })
        }
      }
    }
  },
  imgLoad: function (e) {
    var that = this;
    let scale = wx.getStorageSync('scale');
    //let scale = 1;
    that.setData({
      'answer': e.currentTarget.dataset.info.answer,
      'scaleWidth': e.detail.width * scale, //给图片设置宽度
      'scaleHeight': e.detail.height * scale,//给图片设置高度,
       answer: e.currentTarget.dataset.info
    })
  }
})