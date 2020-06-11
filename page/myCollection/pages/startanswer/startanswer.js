// startanswer/startanswer.js
const app = getApp();
Page({

  data: {
    current: {},
    index: 0,
    options: [],
    keyStr: '',
    keyStrDulp: [],
    wrong: false,
    onceclick: false,
    num: 0,
    dulNum: 0,
    rightNumber: 0,//答题正确
    optionList: ['A', 'B', 'C', 'D'],
    selectedArr: [],
    submitAnswer: false
  },
  gotoNext() {
    if(this.data.onceclick) {
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
        if (that.data.current.explain == null) {
          that.data.current.explain = " 暂无"
        }
        that.setData({
          current: that.data.current
        })
      }else {
        wx.showToast({
          title: '答题结束',
        })
        wx.navigateTo({
          url: '/page/myCollection/pages/answerResult/answerResult?rightNumber=' + this.data.rightNumber ,
        })
      }
    }
  },
  onShow() {
    wx.setStorageSync('rightAnswer', 0)
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
        if (that.data.current.explain == null) {
          that.data.current.explain = " 暂无"
        }
        that.setData({
          current: that.data.current
        })
      }
    })  
  },
  getAnswer(e) {
    let that = this;
    let index = e.currentTarget.dataset.answer;
    if (this.data.current.type == '单选题') {
    if(!this.data.onceclick) {
      // 只能点击一次
      this.setData({
        onceclick: true
      })
      //单选
      let options = this.data.current.options;
      options.forEach((item) => {
        item.selected = false;
        item.wrongSelected =  false;
      })
      if (index == Number(this.data.current.keyStr)) {
        options[index].selected = true;
        this.setData({
          rightNumber: that.data.rightNumber + 1
        })
        wx.setStorageSync('rightAnswer', this.data.rightNumber)
      }else {
        options[index].wrongSelected = true;
      }
      this.setData({
        options: options
      })
      }
    } else if (this.data.current.type == '多选题') {
        let options = this.data.current.options;
        options[index].beforeselected = !options[index].beforeselected;
          this.setData({
            options: options
          })
       }
      },
  finishAnswer() {
    if (!this.data.submitAnswer) {
      this.setData({
        submitAnswer: true
      })
      //多选
      let  that =this;
      let options = this.data.current.options;
      let arr = [];
      for(let i = 0; i < options.length; i++) {
        if(options[i].beforeselected) {
          arr.push(i)
        }
      }
      if(!arr.length) {
        wx.showModal({
          title: '',
          content: '请先选择答案'
        })
        return;
      }
      this.setData({
        selectedArr: arr
      })
      let keyStr = this.data.current.keyStr;
      let dulpling = keyStr.match(/\d+/g);
      this.setData({
        keyStrDulp: dulpling
      })
      arr.forEach((item) => {
        options[item].wrongSelected = true;
      })
      dulpling.forEach((item) => {
        options[item].selected = true;
        
      })
      options.forEach((item) => {
        if(item.beforeselected) {
          item.beforeselected = false;
        }
      })
      this.setData({
        options: options
      })
      let newArr = arr.map((item) => {
        return item.toString()
      })
  
    if (JSON.stringify(dulpling) == JSON.stringify(newArr)) {
        this.setData({
          rightNumber: that.data.rightNumber + 1
        })
      }
        wx.setStorageSync('rightAnswer', this.data.rightNumber)
        this.setData({
          onceclick: true
        })
    }
  }
})