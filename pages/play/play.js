// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q_value: undefined, // q值
    day: 1, // 当前轮数
    D_value: undefined, // D值（实际库存）
    day_income: 0, // 当日收益
    income: 0, // 总收益
    prod: undefined, // 当前模拟的产品
    isShowPopup: false
  },

  handleComfirmQ() {
    const { q_value, D_value } = this.data;
    if(q_value > 0) {
      this.handleComputeIncome(q_value, D_value);
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
    const result = q >= D ? this.handleLeftCompute() : this.handleRightCompute();
    this.setData({
      day_income: result,
      income: this.data.income + result,
      isShowPopup: true
    });
  },

  /**
   * q >= D时收益
   */
  handleLeftCompute() {
    const { prod, D_value, q_value } = this.data;
    switch(prod) {
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
    const { q_value } = this.data;
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
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { prod } = options;
    this.setData({
      prod,
    });
    wx.setNavigationBarTitle({
      title: `当前产品：${prod}`,
    });
    // 发送Ajax请求去后台拿数据,此处先模拟
    this.setData({
      D_value: 6
    })
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