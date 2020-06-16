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
    picture: '',
    showGuiGe: false,
    selectedId: '',
    number: 1,
    stock: 0,
    disabledAdd: 0,
    details: '',
    current: 0,
    productType: 1,
    buyNumber: 0
  },
  // 商品轮播
  swiperChange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  onLoad(options) {
    let id = options.produtId;
    this.getProductDetail(id)
  },
  getProductDetail(id) {
    let that = this;
    let url = app.globalData.URL + "productDetils", data = { id: id };
    app.wxRequest(url, data, (res) => {
      console.log(res)
      that.setData({
        specificationsList: res.data.data.specificationsList,
        selectedProduct: res.data.data.specificationsList[0],
        pictures: res.data.data.pictures,
        productList: res.data.data.productList,
        name: res.data.data.name,
        integral: res.data.data.integral,
        details: res.data.data.details,
        picture: res.data.data.pictures[0],
        selectedId: res.data.data.specificationsList[0].id,
        stock: res.data.data.specificationsList[0].stock,
        freight: res.data.data.specificationsList[0].freight,
        number: 1,
        buyNumber: res.data.data.buyNumber
      })
      wx.setStorageSync('freight', that.data.freight);
      wx.setStorageSync('jiesuanPicture', that.data.picture)
      let specificationsList = res.data.data.specificationsList;
      let selected = specificationsList.filter((item) => {
        if (item.id == that.data.selectedId) {
          return item
        }
      })
      this.setData({
        integral: selected[0].integral
      })
      wx.setStorageSync('integral', selected[0].integral)
      wx.setStorageSync('selectedName', selected[0].name);
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
    wx.setStorageSync('productType', this.data.specificationsList[0].productType);
    this.setData({
      productType: this.data.specificationsList[0].productType
    })
  },
  hideGuige() {
    this.setData({
      showGuiGe: false,
      // selectedId: this.data.specificationsList[0].id,
      // number: 1
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
    wx.setStorageSync('productType', selected[0].productType);
    wx.setStorageSync('freight', selected[0].freight);
    this.setData({
      integral: selected[0].integral,
      stock: selected[0].stock,
      productType: selected[0].productType
    })
    wx.setStorageSync('integral', this.data.integral);
  
  },
  //点击数量减少
  reduce() {
    if(this.data.number >=1 && this.data.productType !== 1) {
      this.setData({
        number: this.data.number - 1,
        disabledAdd: 0
      })
    }
  },
  add() {
    if (this.data.number < this.data.stock && !this.data.disabledAdd && this.data.productType !== 1) {
      this.setData({
        number: this.data.number + 1
      })
    }else {
      this.setData({
        disabledAdd: 1
      })
    }
   
  },
  // 猜你喜欢 兑换跳转
  gotoDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/exchange/pages/shopDetail/shopDetail?produtId='+ id
    })
  },
})