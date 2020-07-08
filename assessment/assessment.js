// assessment/assessment.js
Page({
  data: {
    items: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国', checked: 'true' },
      { value: 'BRA', name: '巴西' },
      { value: 'JPN', name: '日本' },
      { value: 'ENG', name: '英国' },
      { value: 'FRA', name: '法国' },
    ],
    selected: [
      {item1: 0, item: 0},
      { item2: 0, item: 0},
      { item3: 0, item: 0},
      { item4: 0, item: 0},
      { item5: 0, item: 0},
      { item6: 0, item: 0},
      { item7: 0, item: 0},
      { item8: 0, item: 0},
      { item9: 0, item: 0},
      { item10: 0, item: 0}
    ]
  },
  radioChange(e) {
    let value = Number(e.detail.value);
    let index = e.currentTarget.dataset.itemid;
    let selected =  this.data.selected;
    for(let i = 0; i < selected.length; i++) {
      if((index -1) == i) {
        selected[i].item= value;
      }
    }
    this.setData({
      selected: selected
    })
  },
  submit(){
    let sub = this.data.selected;
    let sum = 0;
    for(let i = 0; i< sub.length; i++) {
    //  console.log(sub[i].item)
      sum += sub[i].item
    }
    console.log(sum)
   
    // wx.showModal({
    //   title: '恭喜你获得' + sum + '分',
    //   content: '近视有危害，请注意饮食和休息',
    // })
  }
 
})