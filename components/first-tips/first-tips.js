// components/first-tips/first-tips.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    fristTips: [
      {
        name: '风力',
        value: '单位为风速（m/s）。0-1.6为软风，1.6-3.4为轻风，以此类推。'
      },
      {
        name: '云度',
        value: '全天无云，云度为0;天空被云遮蔽，云度为10。'
      },
      {
        name: '雨量',
        value: '单位为厘米。'
      },
      {
        name: '阳光',
        value: '阴天较小，晴天较大。阳光范围：1-1000。'
      },
      {
        name: '温度',
        value: '单位为摄氏度。'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
