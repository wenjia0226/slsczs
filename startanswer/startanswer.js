// startanswer/startanswer.js
const app = getApp();
Page({

  data: {
    current: {},
    index: 0,
    options: [],
    keyStr: '',
    wrong: false,
    onceclick: false,
    num: 0
  },
  gotoNext() {
    if(this.data.num < 4) {
      this.setData({
        onceclick: false
      })
      this.setData({
        num: this.data.num + 1
      })
      let that = this;
      that.setData({
        current: that.data.anserList[that.data.num],
        keyStr: that.data.anserList[that.data.num].keyStr,
        options: that.data.anserList[that.data.num].options,
      })
    }else {
      wx.showToast({
        title: '答题结束',
      })
    }
   
  },
  onShow() {
    let that = this;
    let url = app.globalData.URL + 'answerList';
    let data = {
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      if (res.data.status == 200) {
        console.log(res)
        that.setData({
          anserList: res.data.data,
          current: res.data.data[that.data.num],
          keyStr: res.data.data.keyStr,
          options: res.data.data[that.data.num].options,
        })
      }
    })  
  },
  getAnswer(e) {
    if(!this.data.onceclick) {
      // 只能点击一次
      this.setData({
        onceclick: true
      })
    let index = e.currentTarget.dataset.answer;
    if (this.data.current.type == '单选题') {
      //单选
      let options = this.data.current.options;
      options.forEach((item) => {
        item.selected = false;
        item.wrongSelected =  false;
      })
      if (index == Number(this.data.current.keyStr)) {
        options[index].selected = true;
      }else {
        options[index].wrongSelected = true;
      }
      this.setData({
        options: options
      })
    }
    }
  }
})