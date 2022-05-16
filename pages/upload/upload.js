// pages/upload/upload.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex: '',
    age: '',
    job: '',
    alipay: '',
    lastName: '',
    income: 0,
    type: 0, //28轮之后的模拟类型
    ageList: ['20岁以下', '20-29岁', '30-39', '40及以上'],
    jobList: ['有', '无'],
    sexList: ['男', '女']
  },

  radioChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      sex: value
    })
  },

  bindPickerChange(e) {
    const { value } = e.detail;
    this.setData({
      age: value
    });
  },

  bindPickerChangeJob(e) {
    const { value } = e.detail;
    this.setData({
      job: value
    });
  },

  bindPickerChangeSex(e) {
    const { value } = e.detail;
    this.setData({
      sex: value
    });
  },

  onSubit() {
    const { sex, age, job, alipay, lastName, income, type, sexList, jobList, ageList} = this.data;
    if(sex && age && job && alipay && lastName) {
      const info = {
        sex: sexList[sex],
        age: ageList[age],
        job: jobList[job],
        alipay,
        lastName,
        type,
        income: income / 100
      };
      app.onSaveUserInfo(info).then(res => {
        wx.showToast({
          title: '提交成功!',
          duration: 1000,
          icon: 'success',
        });
      }).catch(err => {
        wx.showToast({
          title: '提交失败，请重试!',
          duration: 1000,
          icon: 'success',
        });
      });
    } else {
      wx.showToast({
        title: '请输入收款信息',
        duration: 500,
        icon: 'error',
        mask: true,
      });
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {income, type} = options;
    this.setData({
      type,
      income,
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