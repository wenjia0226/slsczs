//index.js
var wxbarcode = require('../../../../utils/index.js');

Page({

  data: {
    code: '',
    partnership: '',
    address: ''
  },

  onLoad: function (options) {
    let id = options.id;
    wxbarcode.qrcode('qrcode', id, 420, 420);
    this.setData({
      partnership: wx.getStorageSync('partnership'),
      address: wx.getStorageSync('address')
    })
  }
})