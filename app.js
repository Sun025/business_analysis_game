// app.js
App({
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

  onLaunch() {
    wx.cloud.init({
      env: 'env-3gc99iyua4e29fb0'
    });
  }
})
