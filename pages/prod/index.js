// 产品实验收益计算规则说明页面
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prod: '',
    tips: ''
  },

  handleSetTips(prod) {
    switch (prod) {
      case '炸鱿鱼圈':
        return [
          '炸鱿鱼圈的批发价为5，零售价为11，处理价格为1',
          '若订购量q≥需求量D，实验收益为6D-4(q-D);',
          '若订购量q＜需求量D，实验收益为6q;',
          `实验总收益将按照${app.onChangeMoney(prod)}：1人民币发放奖励`
        ];
        break;
      case '炸虾':
        return [
          '炸虾的批发价为7，零售价为13，处理价格为4',
          '若订购量q≥需求量D，实验收益为6D-3(q-D);',
          '若订购量q＜需求量D，实验收益为6q;',
          `实验总收益将按照${app.onChangeMoney(prod)}：1人民币发放奖励`
        ];
        break;
      case '炸鸡':
        return [
          '炸鸡的批发价为4，零售价为10，处理价格为2',
          '若订购量q≥需求量D，实验收益为6D-2(q-D);',
          '若订购量q＜需求量D，实验收益为6q;',
          `实验总收益将按照${app.onChangeMoney(prod)}：1人民币发放奖励`
        ];
        break;
    }
  },

  onStart() {
    const { prod } = this.data;
    wx.redirectTo({
      url: `../play/play?prod=${prod}`,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
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
      tips: this.handleSetTips(prod)
    });
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