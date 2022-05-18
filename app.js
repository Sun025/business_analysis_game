// app.js
App({

  /**
   * 实验收益换算比例
   */
  onChangeMoney(prod) {
    switch(prod) {
      case '炸鱿鱼圈':
        return 65;
      case '炸虾':
        return 175;
      case '炸鸡':
        return 450;
    };
  },

  onRequest(query) {
    const db = wx.cloud.database();
    const collection = db.collection('test_data');
    return new Promise((resolve, reject) => {
      collection.where(query).get().then(res => {
        resolve(res.data);
      }).catch(err => {
        reject('Service error,Please later to try.');
      });
    });
  },
  onSaveUserInfo(info) {
    const db = wx.cloud.database();
    const collection = db.collection('user_info');
    return new Promise((resolve, reject) => {
      collection.add({
        data: info
      }).then(res => {
        resolve('success');
      }).catch(err => {
        reject('error');
      });
    });
  },

  onLaunch() {
    wx.cloud.init({
      env: 'env-3gc99iyua4e29fb0'
    });
  }
})