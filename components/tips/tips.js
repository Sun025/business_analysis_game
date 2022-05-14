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
      {
        name: '星期',
        value: '1'
      },
      {
        name: '节假日',
        value: '否'
      },
      {
        name: '周末',
        value: '是'
      },
      {
        name: '风力',
        value: 29
      },
      {
        name: '云度',
        value: 30
      },
      {
        name: '雨量',
        value: 100
      },
      {
        name: '阳光',
        value: 100
      },
      {
        name: '温度',
        value: 28
      },
      {
        name: '当日需求量',
        value: 100
      },
      {
        name: '7天订购量',
        value: 120
      },
      {
        name: '7天收益',
        value: 200
      },
      {
        name: '总收益',
        value: 3000
      }
    ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
