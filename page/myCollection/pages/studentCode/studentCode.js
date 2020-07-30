//index.js
var wxbarcode = require('../../../../utils/index.js');

Page({

  data: {
    code: '',
    partnership: '',
    address: '',
    studentName: ''
  },

  onLoad: function (options) {
    let id = options.studentId;
    wxbarcode.qrcode('qrcode', id, 420, 420);
  },
  
  onShow() {
    this.setData({
      studentName: wx.getStorageSync('studentName')
    })
  }
})