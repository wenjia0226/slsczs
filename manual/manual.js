// manual/manual.js
const app = getApp();
let url = 'https://www.guangliangkongjian.com/lightspace/';
Page({
  data: {
    date: '2010/01/01',
    show: true,
    gender: 0,
    name: '',
    province_list: null,
    province_name: null,
    city_list: null,
    city_name: null,
    area_list: null,
    area_name: null,
    addressCity: null,
    multiArray: [],  // 三维数组数据
    multiIndex: [0, 0, 0], // 默认的下标,
    selectProvinceId: null,
    selectCityId: null,
    selectAreaId: null,
    prevRoute: ''
  },
  onLoad: function (options) {  //在页面加载就调用获取
    this.getProvince()
  },
  onShow() {
    let pages = getCurrentPages();//页面对象
    let prevpage = pages[pages.length - 2];//上一个页面对象

    console.log(prevpage.route)//上一个页面路由地址
    this.setData({
      prevRoute: prevpage.route
    })
  },
  handleNameInput(e){
    this.setData({
      name:e.detail.value 
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      show: false
    })
    var dateOld = this.data.date;
    var  dateNew  =  dateOld.replace(/-/g,  '/');
    this.setData({
      date: dateNew
    })
  },
  selectSex(e) {
    this.setData({
      gender: e.currentTarget.dataset.type
    })
  },
  saveStudent() {
    let that = this;
    let url = app.globalData.URL + "registerStudent", 
    data = {openId: wx.getStorageSync('openId'),
    name: this.data.name,
    birthday: this.data.date,
    gender: this.data.gender,
    regionId: this.data.selectAreaId
    };
    wx.setStorageSync('studentName', this.data.name);
    wx.setStorageSync('gender', this.data.gender);
    wx.setStorageSync('birthday', this.data.date);
    app.wxRequest(url, data, (res) => {
      console.log(res)
      wx.setStorageSync('studentId', res.data.data)
  
      if(res.data.status == 200) {

        console.log(that.data.prevRoute)
        if (that.data.prevRoute == 'page/tabBar/index/index') {
          wx.switchTab({
            url: '/page/tabBar/index/index'
          })
        }else if(that.data.prevRoute == 'page/tabBar/my/my') {
          wx.switchTab({
            url: '/page/tabBar/my/my'
          })
        } else if (that.data.prevRoute == 'page/myCollection/pages/archives/archives') {
          wx.navigateTo({
            url: '/page/myCollection/pages/archives/archives',
          })
        } else if (that.data.prevRoute == 'page/myCollection/pages/plan/plan') {
          wx.navigateTo({
            url: '/page/myCollection/pages/plan/plan',
          })
        } else if (that.data.prevRoute == 'page/tabBar/screen/screen') {
          wx.navigateTo({
            url: '/page/tabBar/screen/screen',
          })
        }else if(that.data.prevRoute == 'page/mainFunction/pages/result/result') {
          wx.navigateTo({
            url: '/page/mainFunction/pages/result/result',
          })
        }
       
      } 
    })
  },
 
  //获取省份列表
  getProvince: function () {
    let that = this;
    let data = {
      type: 1
    }
    wx.request({
      url: url + 'findRegion',
      method: 'post',
      data: data,
      success(res) {
        let provinceList = [...res.data.data]  //放到一个数组里面
        let provinceArr = res.data.data.map((item) => { return item.name })  //获取名称
        that.setData({
          multiArray: [provinceArr, [], []], //更新三维数组  更新完为[['广东','北京'],[],[]]
          province_list: provinceList,  //省级原始数据
          province_name: provinceArr,  //省级全部名称
        })
        let defaultCode = that.data.province_list[0].id //使用第一项当作参数获取市级数据
        if (defaultCode) {
          that.setData({
            currnetProvinceId: defaultCode  //保存当前省份id
          })
          that.getCity(defaultCode) //获取市区数据
        }
      }
    })
  },
  //根据省份id获取城市
  getCity: function (id) {
    let that = this;
    let data = {
      type: 2,
      pId: id
    };
    that.setData({
      currnetProvinceId: id
    })
    wx.request({
      url: url + 'findRegion',
      data: data,
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        let cityArr = res.data.data.map((item) => { return item.name }) //返回城市名称
        let cityList = [...res.data.data]
        that.setData({
          multiArray: [that.data.province_name, cityArr, []],  //更新后[['广东','北京'],['潮州'，'汕头','揭阳'],[]]
          city_list: cityList, //保持市级数据
          city_name: cityArr   //市级名称
        })
        let defaultCode = that.data.city_list[0].id //获取第一个市的区级数据
        if (defaultCode) {
          that.setData({
            currentCityId: defaultCode //保存当下市id
          })
          that.getArea(defaultCode) //获取区域数据
        }
      }
    })
  },
  //获取区域
  getArea: function (id) {
    let that = this
    let data = {
      type: 2,
      pId: id
    };
    wx.request({
      url: url + 'findRegion',
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'post',
      success(res) {
        let areaList = [...res.data.data]
        let areaArr = res.data.data.map((item) => { return item.name }) //区域名
        that.setData({
          multiArray: [that.data.province_name, that.data.city_name, areaArr],
          area_list: areaList, //区列表
          area_name: areaArr   //区名字
        })
        // console.log(that.data.multiArray)
      }
    })
  },
  //picker确认选择地区
  bindRegionChange: function (e) {
    // 因为在获取省中 北京只有一个选项，导致获取不了北京》北京》第一个
    if (e.detail.value[1] == null || e.detail.value[2] == null) { //如果只滚动了第一列则选取第一列的第一数据
      this.setData({
        multiIndex: e.detail.value,  //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].name, this.data.city_list[0].name, this.data.area_list[0].name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].id,
        selectCityId: this.data.city_list[0].id,
        selectAreaId: this.data.area_list[0].id
      })
    } else {
      this.setData({
        multiIndex: e.detail.value,  //更新下标
        addressCity: [this.data.province_list[e.detail.value[0]].name, this.data.city_list[e.detail.value[1]].name, this.data.area_list[e.detail.value[2]].name],
        selectProvinceId: this.data.province_list[e.detail.value[0]].id,
        selectCityId: this.data.city_list[e.detail.value[1]].id,
        selectAreaId: this.data.area_list[e.detail.value[2]].id
      })
    }
  },
  //滑动地区组件
  bindRegionColumnChange: function (e) {
    let that = this;
    let column = e.detail.column  //当前改变的列
    let data = {
      multiIndex: JSON.parse(JSON.stringify(that.data.multiIndex)),
      multiArray: JSON.parse(JSON.stringify(that.data.multiArray))
    }
    data.multiIndex[column] = e.detail.value  //第几列改变了就是对应multiIndex的第几个，更新他
    switch (column) {
      case 0:  //第一列改变，省级改变
        let currentProvinceId = that.data.province_list[e.detail.value].id
        //  if (currentProvinceId != that.data.currentProvinceId) { //判断当前id是不是更新了
        //    //获取当前id下的市级数据
        //  }
        that.getCity(currentProvinceId) 
        data.multiIndex[1] = 0    //将市默认选择第一个
        break
      case 1:  //第二列改变，市级改变
        let currentCityId = that.data.city_list[e.detail.value].id;
        // if (currentCityId != that.data.currentCityId) {
          
        // }
        that.getArea(currentCityId) //获取区域
        data.multiIndex[2] = 0  //区域默认第一个
        break
    }
    that.setData(data)  //更新数据
  },
})