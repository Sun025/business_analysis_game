// index.js
const app = getApp();

Page({
  data: {
    buttonText: '开始实验',
    isLoading: false,
    prodList: [
      '炸鱿鱼圈',
      '炸虾',
      '炸鸡'
    ],
    prod: '',
    isShowPopup: false,
    scend: 5,
    timer: null
  },

  /**
   * 获取模拟的产品
   */
  handleGetProd() {
    this.setData({
      buttonText: '匹配产品中...',
      isLoading: true
    });
    this.setData({
      timer: setTimeout(() => {
        this.setData({
          isShowPopup: true,
          isLoading: false,
          buttonText: '匹配成功',
          prod: this.data.prodList[this.handleRandomNum()]
        });
      }, 1500)
    });
  },

  /**
   * 进入模拟游戏页面
   */
  handleToPlay() {
    wx.redirectTo({
      url: `../play/play?prod=${this.data.prod}`,
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