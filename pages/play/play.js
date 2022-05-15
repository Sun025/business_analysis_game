// pages/play/play.js
const app = getApp();
const util = require('../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q_value: undefined, // q值
    q_value_erm: 0, // ERM算法q值
    q_value_eam: 0, // EAM算法q值
    lastDay_q: 0, // 昨日订购量
    day: 1, // 当前轮数
    D_value: undefined, // D值（实际库存）
    day_income: 0, // 当日收益
    day_income_erm: 0, //当日ERM算法收益
    day_income_eam: 0, //当日EAM算法收益
    income: 0, // 总收益
    income_erm: 0, // ERM算法总收益
    income_eam: 0, // EAM算法总收益
    prod: undefined, // 当前模拟的产品
    isShowPopup: false,
    dataList: [], // 保存最近7天的数据
    type_28later: 0, // 27轮后随机分配的算法类型
  },

  handleComfirmQ() {
    const { q_value, q_value_erm, q_value_eam, D_value}  = this.data;
    if(q_value > 0) {
      const { day } = this.data;
      // 用户输入的q值收益
      const result = this.handleComputeIncome(q_value, D_value);
      // ERM算法的q值收益
      const result_ERM = this.handleComputeIncome(q_value_erm, D_value);
      // EAM算法的q值收益
      const result_EAM = this.handleComputeIncome(q_value_eam, D_value);
      if(day == 8) {
        wx.showModal({
          confirmText: '确认',
          content: '前7轮为测试实验，获取的累积收益已清0，本轮开始正式计算收益。',
          editable: true,
          showCancel: false,
          title: '提示',
          success: () => {
            this.setData({
              income: 0,
              income_erm: 0,
              income_eam: 0,
            });
            this.setData({
              income: this.data.income + result,
              income_erm: this.data.income_erm + result_ERM,
              income_eam: this.data.income_eam + result_EAM,
              day_income: result,
              day_income_erm: result_ERM,
              day_income_eam: result_EAM,
              lastDay_q: q_value,
              isShowPopup: true
            });
          }
        });
      } else {
        this.setData({
          income: this.data.income + result,
          income_erm: this.data.income_erm + result_ERM,
          income_eam: this.data.income_eam + result_EAM,
          day_income: result,
          day_income_erm: result_ERM,
          day_income_eam: result_EAM,
          lastDay_q: q_value,
          isShowPopup: true
        })
      };
    } else {
      wx.showToast({
        title: '请输入订购量',
        duration: 800,
        icon: 'error',
        mask: true,
      });
    };
  },

  /**
   * 计算收益
   * @param {*} q 用户录入的当天需求量
   * @param {*} D 实际需求量
   */
  handleComputeIncome(q, D) {
    const reslut = q >= D ? this.handleLeftCompute(q, D) : this.handleRightCompute(q);
    return reslut;
  },

  /**
   * q >= D时收益
   */
  handleLeftCompute(q, D) {
    const { prod } = this.data;
    switch (prod) {
      case '炸鱿鱼圈':
        return 6 * D - 4 * (q - D);
      case '炸虾':
        return 6 * D - 3 * (q - D);
      case '炸鸡':
        return 6 * D - 2 * (q - D);
    };
  },

  /**
   * q < D时收益
   */
  handleRightCompute(q) {
    return 6 * q
  },

  /**
   * 开始下一轮
   */
  handleNextDay() {
    const { day, income, type_28later } = this.data;
    if(day < 47) {
      this.setData({
        isShowPopup: false,
        q_value: Number,
        day: this.data.day + 1
      });
      if(this.data.day == 28) {
        this.handleSetType28later();
      };
      this.handleRequest();
    } else {
      wx.redirectTo({
        url: `../upload/upload?incom=${income}&type=${type_28later}`,
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
    }
    
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

  handleSetType28later() {
    const num = util.getRandom();
    this.setData({
      type_28later: num
    });
  },
  
  /**
   * 从接口获取当日数据
   */
  handleRequest() {
    const { day } = this.data;
    const query = {
      index: day
    };
    app.onRequest(query).then(res => {
      this.handleUpdateList(res[0]);
    })
  },

  /**
   * 更新列表数据
   */
  handleUpdateList(res) {
    const {chicken, chicken_EAM, chicken_ERM, cloud, day, holiday, rain, shrimp, shrimp_EAM, shrimp_ERM, sleeve, sleeve_EAM, sleeve_ERM, sun, temperature, weekend, wind } = res;
    const { lastDay_q, day_income, prod, dataList, income, income_erm, income_eam } = this.data;
    let food; // 从数据库中获取当前食物的实际需求量
    let food_ERM; // 从数据库中获取当前食物的ERM算法推荐q
    let food_EAM; // 从数据库中获取当前食物的EAM算法推荐q
    switch(prod) {
      case '炸鱿鱼圈':
        food = sleeve;
        food_ERM = sleeve_ERM;
        food_EAM = sleeve_EAM;
        break;
      case '炸虾':
        food = shrimp;
        food_ERM = shrimp_ERM;
        food_EAM = shrimp_EAM;
        break;
      case '炸鸡':
        food = chicken;
        food_ERM = chicken_ERM;
        food_EAM = chicken_EAM;
        break;
    };
    let newDataList = dataList;
    if(this.data.day >= 8) {
      newDataList.pop();
    };
    newDataList.unshift([{
      name: '当日实际需求量',
      value: food,
      show: 'show'
    }, {
      name: '前一日订购量',
      value: lastDay_q,
      show: 'show'
    }, {
      name: '前一日收益',
      value: day_income,
      show: 'show'
    }, {
      name: '当前总收益',
      value: income,
      show: 'show'
    },{
      name: 'ERM算法推荐量',
      value: food_ERM,
      show: this.data.day >= 28 && (this.data.type_28later == 2 || this.data.type_28later == 3) ? 'show' : 'noshow'
    },{
      name: 'EAM算法推荐量',
      value: food_EAM,
      show: this.data.day >= 28 && (this.data.type_28later == 4 || this.data.type_28later == 5) ? 'show' : 'noshow'
    },{
      name: 'ERM算法总收益',
      value: income_erm,
      show: this.data.day >= 28 && (this.data.type_28later == 2 || this.data.type_28later == 3) ? 'show' : 'noshow'
    },{
      name: 'EAM算法总收益',
      value: income_eam,
      show: this.data.day >= 28 && (this.data.type_28later == 4 || this.data.type_28later == 5) ? 'show' : 'noshow'
    },{
      name: '星期',
      value: day,
      show: 'show'
    }, {
      name: '节假日',
      value: this.handleTransfromData(holiday),
      show: 'show'
    }, {
      name: '周末',
      value: this.handleTransfromData(weekend),
      show: 'show'
    }, {
      name: '风力',
      value: wind,
      show: 'show'
    }, {
      name: '云度',
      value: cloud,
      show: 'show'
    }, {
      name: '雨量',
      value: rain,
      show: 'show'
    }, {
      name: '阳光',
      value: sun,
      show: 'show'
    }, {
      name: '温度',
      value: temperature,
      show: 'show'
    }]);
    this.setData({
      dataList: newDataList,
      D_value: food,
      q_value_erm: food_ERM,
      q_value_eam: food_EAM
    })
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
   * 生命周期函数--监听页面show
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