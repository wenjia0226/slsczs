// page/exchange//pages/jiesuan/jiesuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    inputValue: ''
  },
  addBg (e) {
    console.log(e);
    if(e.currentTarget.dataset.type == 0) {
      this.setData({
        type: 0
      })
    }else {
      this.setData({
        type: 1
      })
    }
  }
})