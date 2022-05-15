// pages/play/play.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    q_value: undefined, // q值
    lastDay_q: 0, // 昨日订购量
    day: 1, // 当前轮数
    D_value: undefined, // D值（实际库存）
    day_income: 0, // 当日收益
    income: 0, // 总收益
    prod: undefined, // 当前模拟的产品
    isShowPopup: false,
    dataList: [],
    q_7day_value: 0, //7天的订购量
  },

  handleComfirmQ() {
    const {
      q_value,
      D_value
    } = this.data;
    if (q_value > 0) {
      this.handleComputeIncome(q_value, D_value);
      this.setData({
        q_7day_value: this.data.q_7day_value + Number(q_value),
        lastDay_q: this.data.q_value
      })
    } else {
      wx.showToast({
        title: '请输入订购量',
        duration: 800,
        icon: 'error',
        mask: true,
      })
    };
  },

  /**
   * 计算收益
   * @param {*} q 用户录入的当天需求量
   * @param {*} D 实际需求量
   */
  handleComputeIncome(q, D) {
    const {
      day
    } = this.data;
    if (day == 8) {
      wx.showModal({
        confirmColor: 'confirmColor',
        confirmText: '确认',
        content: '7轮试完已结束，前几轮获取的累积收益已清0，本轮开始正式游戏。',
        showCancel: false,
        title: '提示',
        success: () => {
          this.setData({
            income: 0
          });
          const result = q >= D ? this.handleLeftCompute() : this.handleRightCompute();
          this.setData({
            day_income: result,
            income: this.data.income + result,
            isShowPopup: true
          });
        },
      })
    } else {
      const result = q >= D ? this.handleLeftCompute() : this.handleRightCompute();
      this.setData({
        day_income: result,
        income: this.data.income + result,
        isShowPopup: true
      });
    };
  },

  /**
   * q >= D时收益
   */
  handleLeftCompute() {
    const {
      prod,
      D_value,
      q_value
    } = this.data;
    switch (prod) {
      case '炸鱿鱼圈':
        return 6 * D_value - 4 * (q_value - D_value);
      case '炸虾':
        return 6 * D_value - 3 * (q_value - D_value);
      case '炸鸡':
        return 6 * D_value - 2 * (q_value - D_value);
    };
  },

  /**
   * q < D时收益
   */
  handleRightCompute() {
    const {
      q_value
    } = this.data;
    return 6 * q_value
  },

  /**
   * 开始下一轮
   */
  handleNextDay() {
    this.setData({
      isShowPopup: false,
      q_value: Number,
      day: this.data.day + 1
    });
    this.handleRequest();
  },

  /**
   * 数据转换
   * 将节假日、周末的数字化数据转换为文字
   * @param {*} value 值
   */
  handleTransfromData(value) {
    if (value == 0) {
      return '否';
    } else {
      return '是';
    };
  },

  handleRequest() {
    const {
      day,
      lastDay_q,
      day_income,
      income
    } = this.data;
    app.onRequest({
      index: day
    }).then(res => {
      const {
        day,
        holiday,
        weekend,
        wind,
        cloud,
        rain,
        sun,
        temperature,
        chicken,
        sleeve,
        shrimp
      } = res[0];
      const {
        dataList,
        prod
      } = this.data;
      let food;
      switch (prod) {
        case '炸鱿鱼圈':
          food = sleeve;
          break;
        case '炸虾':
          food = shrimp;
          break;
        case '炸鸡':
          food = chicken;
          break;
      };
      let newDataList = dataList;
      if (this.data.day >= 8) {
        newDataList.pop();
      };
      newDataList.unshift([{
        name: '当日实际需求量',
        value: food
      }, {
        name: '前一日订购量',
        value: lastDay_q
      }, {
        name: '前一日收益',
        value: day_income
      }, {
        name: '当前总收益',
        value: income
      }, {
        name: '星期',
        value: day
      }, {
        name: '节假日',
        value: this.handleTransfromData(holiday)
      }, {
        name: '周末',
        value: this.handleTransfromData(weekend)
      }, {
        name: '风力',
        value: wind
      }, {
        name: '云度',
        value: cloud
      }, {
        name: '雨量',
        value: rain
      }, {
        name: '阳光',
        value: sun
      }, {
        name: '温度',
        value: temperature
      }]);
      this.setData({
        dataList: newDataList,
      });

      this.setData({
        D_value: food
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      prod
    } = options;
    this.setData({
      prod,
    });
    wx.setNavigationBarTitle({
      title: `当前产品：${prod}`,
    });
    // 发送Ajax请求去后台拿数据,此处先模拟
    this.handleRequest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})