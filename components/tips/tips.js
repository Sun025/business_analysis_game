// components/tips/tips.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    day: {
      type: Number,
      value: 0
    },
    list: {
      type: Array,
      value: [
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // dataList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      // console.log(this.properties.list)
    //   const { list } = this.properties;
    //   const newList = list.map((el) => {
    //     const {name, value, show} = el;
    //     if(name.includes('A') || name.includes('B')) {
    //       return {
    //         name: name.replace(/A|B/, ''),
    //         value,
    //         show
    //       }
    //     } else {
    //       return el;
    //     }
    //   });
    //   this.setData({
    //     dataList: newList
    //   });
    }
  }
})