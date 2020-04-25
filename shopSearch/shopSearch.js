// page/exchange//pages/shopSearch/shopSearch.js
Page({
  data: {
    focus: false,
    inputValue: '',
    searchValue: ''
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  clearWord() {
    this.setData({
      searchValue: ''
    })
  }
})