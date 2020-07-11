// page/tabBar/eyeShow/eyeShow.js
const app = getApp();
Page({
  data: {
    height: app.globalData.height * 2 + 20,
    navbarData: {
      title: '秀一秀',
    },
    avatarUrl: '',
    nickName: '',
    page: 1,
    pageSize: 5,
    content: [],
    giveZan: false,
    zanNum: 0,
    chooseId: '',
    animation: '',
    changedFlower: '',
    flowerSelectedArr: [],
    bannerImg: '',
    phone: '',
    prevImg: true
  },
  onShow() {
    this.setData({
      avatarUrl: wx.getStorageSync('avatarUrl'),
      nickName: wx.getStorageSync('nickName'),
      phone: wx.getStorageSync('phone')
    })
    if(this.data.prevImg) {
      this.setData({
        page: 1,
        content: []
      })  
      this.getImg();
      this.getXiuList();
      this.flowerAnimation();
     
    }
    this.setData({
      prevImg: true
    })
  },
  gotoLogin() {
    wx.navigateTo({
      url: '/nicheng/nicheng'
    })
  },
  //  预览
  previewImg(e) {
    let that = this;
    var current = e.currentTarget.dataset.imgitem;
    let id = e.currentTarget.dataset.id;
   let imgBox =  this.data.content.filter((item) => {
      if(item.id == id) {
        return item
      }
    })
    wx.previewImage({
      urls: imgBox[0].path,
      current: current,
      success: function (e) {
      //  console.log('预览成功')
       that.setData({
         prevImg: false
       })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  getImg() {
    let that = this;
    let url = app.globalData.URL + "configPic",
      data = {
        
      };
    //如果已经授权
    app.wxRequest(url, data, (res) => {
      // console.log(res)
      if (res.data.status == 200) {
        that.setData({
          bannerImg: res.data.data
        })
      }
    })
  },
  onPullDownRefresh: function () {
    //  console.log('onPullDonwFresh')
    let that = this;
    wx.stopPullDownRefresh();
    setTimeout(function () {
      that.setData({
        content: [],
        page: 1
      })
      that.getXiuList();
    }, 500);
  },
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getXiuList();
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
  getXiuList() {
    let that = this;
    if(wx.getStorageSync('phone')) {

    let url = app.globalData.URL + "momentsList",
      data = {
        page: that.data.page,
        openId: wx.getStorageSync('openId')
      };
    //如果已经授权过
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
      
        if (res.data.status == 200) {
          var resCurrent = res.data.data;
          let content = that.data.content;
         
          if (that.data.page == 1) {
            content = []
          }
          if (resCurrent.length < this.data.pageSize) {
            that.setData({
              hasMoreData: false,
              content: content.concat(resCurrent),
            })
          } else {
            that.setData({
              content: content.concat(resCurrent),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: '',
            icon: 'none'
          })
        }
      })
    }
  },
  gotoMyShow() {
    wx.navigateTo({
      url: '/page/myCollection/pages/myShow/myShow',
    })
  },
  handleGiveZan(e) {
    let isFabulous = e.currentTarget.dataset.isfabulous;
    let id = e.currentTarget.dataset.chooseid;
      if (isFabulous == 2) {  // 如果为2，未点过赞
        this.setData({
          choosedId: id
        })
        let that = this;
        let url = app.globalData.URL + "fabulous",
          data = {
            id: id,
            openId: wx.getStorageSync('openId'),
            studentId: wx.getStorageSync('studentId')
          };
        //如果已经授权过
        if (wx.getStorageSync('phone')) {
          wx.showLoading({
            title: '加载中...'
          })
          app.wxRequest(url, data, (res) => {
            // console.log(res)
            if (res.data.status == 200) {
              let changeItem = res.data.data;
              let arr = that.data.content.map((item) => item.id === changeItem.id ? changeItem : item)
              that.setData({
                content: arr
              })
            } else if (res.data.status == 10235) {
              wx.showToast({
                title: res.data.msg
              })
            }
          })
        }
      }else  if(isFabulous == 1) {   // 已经点过赞
        wx.showToast({
          icon: 'none',
          title: '您已经为该条消息点过赞啦',
        })
      }
  },
  flowerAnimation() {
    this.animation = wx.createAnimation({
      duration: 300, // 动画持续时间，单位 ms
      timingFunction: 'linear', // 动画的效果
      delay: 10, // 动画延迟时间，单位 ms
      transformOrigin: '50% 50%' // 动画的中心点
    })
    setTimeout(function () {
      this.animation.scale(1.5).step();
      this.animation.scale(1.0).step();
      this.setData({
        animation: this.animation.export(),
        flowerSelectedArr: []
      });

    }.bind(this), 50);
  },
  getFlower(e){
    let flowerArr = [];
    flowerArr.push(e.currentTarget.dataset.item);
    this.setData({
      flowerSelectedArr: flowerArr
    }) //先声明个空数组，把每个点击的下标赋给新数组
    this.flowerAnimation();
    let flowerId = e.currentTarget.dataset.flowerid;
    let that = this;
    let url = app.globalData.URL + "flowers",
    data = {
      id: flowerId,
      openId: wx.getStorageSync('openId')
    };
    //如果已经授权过
    if (wx.getStorageSync('phone')) {
      // wx.showLoading({
      //   title: '加载中...'
      // })
      app.wxRequest(url, data, (res) => {
        // console.log(res)
        if (res.data.status == 200) {
          let flowerItem = res.data.data;
          that.setData({
            changedFlower: flowerItem
          })
          let arrFlower = that.data.content.map((item) => item.id === flowerItem.id ? flowerItem : item)
          that.setData({
            content: arrFlower
          })

        } else if (res.data.status == 10236) {
          setTimeout(() => {
           wx.showToast({
            icon: 'none',
            title: '您今天的花已经送完啦',
          })
          })
          
          
        }
      })
    }
  }
})