// index.js
const app = getApp();

Page({
  data: {
    buttonText: '开始实验',
    prodList: [
      '炸鱿鱼圈',
      '炸虾',
      '炸鸡'
    ],
    prod: '',
    isShowPopupFrist: false,
    isShowPopup: false,
    scend: 5,
    timer: null
  },

  /**
   * 获取模拟的产品
   */
  handleGetProd() {
    this.setData({
      isLoading: true
    });
    this.setData({
      timer: setTimeout(() => {
        this.setData({
          isShowPopup: true,
          isLoading: false,
          prod: this.data.prodList[this.handleRandomNum()]
        });
      }, 1500)
    });
  },

  /**
   * 进入模拟游戏页面
   */
  handleToPlay() {
    const { prod } = this.data;
    wx.redirectTo({
      url: `../prod/index?prod=${prod}`,
      complete: (res) => {
        clearTimeout(this.data.timer);
      },
    })
  },
  /**
   * 产生随机数，来获取随机模拟产品
   */
  handleRandomNum() {
    return parseInt(Math.random() * 3);
  },

  onLoad() {
  }
})