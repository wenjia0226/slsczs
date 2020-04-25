// shopDetail/shopDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    num: 1
  },
  showAdd() {
    this.setData({
      isShow:true
    })
  },
  hide() {
    this.setData({
      isShow: false
    })
  },
  prevent() {
    return;
  },
  changeNum(e) {
      if (e.currentTarget.dataset.type == 0) {
        if(this.data.num > 0){
          this.setData({
            num: this.data.num - 1
          })
        }
      } else {
        this.setData({
          num: this.data.num + 1
        })
      }
    }
})