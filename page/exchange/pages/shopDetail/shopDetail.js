// shopDetail/shopDetail.js
const app = getApp();
Page({
  data: {
    isShow: false,
    num: 1,
    productInfo: [],
    specificationsList: [],
    selectedProduct: [],
    pictures: [],
    productList: [],
    name: '',
    integral: '',
    details: '',
    showGuiGe: false,
    selectedId: '',
    number: 1,
  },
  onShow() {
    let id = wx.getStorageSync('productId');
    this.getProductDetail(id)
  },
  getProductDetail(id) {
    let that = this;
    let url = app.globalData.URL + "productDetils", data = { id: id };
    app.wxRequest(url, data, (res) => {
      //  console.log(res)
      that.setData({
        specificationsList: res.data.data.specificationsList,
        selectedProduct: res.data.data.specificationsList[0],
        pictures: res.data.data.pictures,
        productList: res.data.data.productList,
        name: res.data.data.name,
        integral: res.data.data.integral,
        details: res.data.data.details,
        selectedId: res.data.data.specificationsList[0].id,
        number: 1
      })
      let specificationsList = res.data.data.specificationsList;
      let selected = specificationsList.filter((item) => {
        if (item.id == that.data.selectedId) {
          return item
        }
      })
      wx.setStorageSync('selectedName', selected[0].name);
      console.log(selected)
      this.setData({
        integral: selected[0].integral
      })
      wx.setStorageSync('integral', selected[0].integral)
    })
  },
  goToJieSuan() {
    wx.setStorageSync('shopName', this.data.name);
    wx.setStorageSync('sizeNumber', this.data.number);
    wx.setStorageSync('selectedId', this.data.selectedId)
    if(this.data.number !== 0) {
      wx.navigateTo({
        url: '/page/exchange/pages/jiesuan/jiesuan',
      })
    }else {
      wx.showModal({
        title: '商品数量不能为0',
        content: '',
      })
    }
  
  },
  showAdd() {
    this.setData({
      isShow:true
    })
  },
  hide() {
    this.setData({
      isShow: false,
      selectedId: this.data.specificationsList[0].id,
      number: 1
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
    },
    //点击规格，显示规格选择框
  showSizeChange() {
    this.setData({
      showGuiGe: true
    })
  },
  hideGuige() {
    this.setData({
      showGuiGe: false,
      selectedId: this.data.specificationsList[0].id,
      number: 1
    })
  },
  selectGuige(e) {
    let  id = e.currentTarget.dataset.id;
    this.setData({
      selectedId: e.currentTarget.dataset.id,
      number:1
    })
    let specificationsList = this.data.specificationsList;
    let selected = specificationsList.filter((item) => {
      if (item.id == id) {
        return item
      }
    })
    wx.setStorageSync('selectedName', selected[0].name);
    this.setData({
      integral: selected[0].integral
    })
    wx.setStorageSync('integral', this.data.integral);
  
  },
  //点击数量增加
  reduce() {
    if(this.data.number >=1) {
      this.setData({
        number: this.data.number - 1
      })
    }
    
  },
  add() {
    this.setData({
      number: this.data.number + 1
    })
  }
})