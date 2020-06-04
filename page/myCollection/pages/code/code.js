//index.js
var wxbarcode = require('../../../../utils/index.js');

Page({

  data: {
    code: ''
  },

  onLoad: function (options) {
    let id = options.id;
    wxbarcode.qrcode('qrcode', id, 420, 420);
  }
})
