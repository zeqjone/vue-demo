import axios from 'axios';
import qs from 'qs'
import './api.js'

export default {
  getData () {
    let that = this;
    return Promise.all([that.getOverview(), that.getChangesVisitApp(), that.getChangesActiveUser(), that.getAppStatus(),
        that.getVisitApp(), that.getVisitUser(), that.getBlocked()])
  },
  /**
   * 获取统计信息
   */
  getOverview () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
      axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/base' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },

  getChangesVisitApp () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
      axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/changes/visit/app' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },

  getChangesActiveUser () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
      axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/changes/active/user' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },

  getAppStatus () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
      axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/gateway-app/status' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },


  getVisitApp () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
      axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/visit/app' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },


  getVisitUser () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
      axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/visit/user' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },


  getBlocked () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
      axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/blocked' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },

  getDirection () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000 * 4);
    axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/map/direction' + `?${qs.stringify({ startTime, endTime })}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },

  getActiveUser () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000);
    axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/map/activated-user' + `?${qs.stringify({ startTime, endTime })}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  },

  getActiveDevice () {
    return new Promise(function (resolve, reject) {
      let endTime = new Date();
      let startTime = new Date(+endTime - 3600 * 24000 * 4);
    axios.get(process.env.API_HOST + '/manager/dashboard/intelligence/map/activated-device' + `?${qs.stringify({startTime, endTime})}`)
      .then(res => {
        res = res.data;
        if (res.errCode === '0') {
          resolve(res.data);
        }
        reject(new Error(res.errMessage || '服务器处理失败'));
      }).catch((err) => {
        reject(err);
      })
    })
  }

}
