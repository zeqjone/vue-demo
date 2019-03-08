import Mock from 'mockjs';

let rdmNum = (max) => {
  return Math.ceil(Math.random() * max)
}

/**
 * 基本信息
 */
Mock.mock(/manager\/dashboard\/intelligence\/base/, function () {
  return Mock.mock({
    'errCode|1': '0',
    'data|10': {
      ['activeUsers|' + rdmNum(10000)]: 1,
      ['userVisitTimes|' + rdmNum(100000)]: 1,
      ['blockedTimes|' + rdmNum(100)]: 1,
      ['onlines|' + rdmNum(5000)]: 1,
      ['activatedUsers|' + rdmNum(20000)]: 1,
      ['activatedDevices|' + rdmNum(40000)]: 1
    }
  })
})

/**
 * 获取访问量变化最大的应用
 */
Mock.mock(/manager\/dashboard\/intelligence\/changes\/visit\/app/, function () {
  return Mock.mock({
    'errCode|1': '0',
    'data': [{
      'appId': '@id',
      'appName': '@cword(2,6)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'appId': '@id',
      'appName': '@cword(2,6)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'appId': '@id',
      'appName': '@cword(2,6)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'appId': '@id',
      'appName': '@cword(2,6)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'appId': '@id',
      'appName': '@cword(2,6)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }]
  })
})

/**
 * 活跃度变化最大的用户
 */
Mock.mock(/manager\/dashboard\/intelligence\/changes\/active\/user/, function () {
  return Mock.mock({
    'errCode': '0',
    'data': [{
      'id': '@id',
      'userId': '@email',
      'userName': '@cname(2,4)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'id': '@id',
      'userId': '@email',
      'userName': '@cname(2,4)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'id': '@id',
      'userId': '@email',
      'userName': '@cname(2,4)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'id': '@id',
      'userId': '@email',
      'userName': '@cname(2,4)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }, {
      'id': '@id',
      'userId': '@email',
      'userName': '@cname(2,4)',
      ['visitTimes|' + rdmNum(10000)]: 1,
      ['changes|' + (rdmNum(100000) - 50000)]: 1
    }]
  })
})

/**
 * 服务器健康状态
 */
Mock.mock(/manager\/dashboard\/intelligence\/gateway-app\/status/, function () {
  return Mock.mock({
    'errCode': '0',
    'data|5': [{
      'id': '@id',
      'name|+1': ['OA', 'CRM', 'JIRA', '智能感知系统', 'senma', '阿迪达斯'],
      'status|1-2': true
    }]
  })
})

/**
 * 访问应用次数最多的应用
 */
Mock.mock(/manager\/dashboard\/intelligence\/visit\/app/, function () {
  return Mock.mock({
    'errCode': '0',
    'data|5': [{
      'appId': '@id',
      'appName|1': ['OA', 'CRM', 'JIRA'],
      ['visitTimes|' + rdmNum(10000)]: 1
    }]
  })
})

/**
 * 访问应用次数最多的用户
 */
Mock.mock(/manager\/dashboard\/intelligence\/visit\/user/, function () {
  return Mock.mock({
    'errCode': '0',
    'data|5': [{
      'id': '@id',
      'userId': '@email',
      'userName': '@cname(2,4)',
      ['visitTimes|' + rdmNum(10000)]: 1
    }]
  })
})


/**
 * 拦截访问
 */
Mock.mock(/manager\/dashboard\/intelligence\/blocked/, function () {
  return Mock.mock({
    'errCode': '0',
    'data|5': [{
      'id': '@id',
      'userId': '@email',
      'email': '@email',
      ['blockedVisitTimes|' + rdmNum(10000)]: 1
    }]
  })
})


/**
 * 访问地图
 */
Mock.mock(/manager\/dashboard\/intelligence\/changes\/visit\/map/, function () {
  return Mock.mock({
    'errCode': '0',
    'data|5': {
      'apps': [{
        'id': '@id',
        'city': '北京',
        'lnglat': [116.41667, 39.91667]
      }, {
        'id': '@id',
        'city': '上海',
        'lnglat': [121.48, 31.22]
      }],
      'users': [{
        'id': '@id',
        'city': '北京',
        'lnglat': [116.41667, 39.91667],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '内蒙古赤峰',
        'lnglat': [118.87, 42.28],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '吉林长春',
        'lnglat': [125.35, 43.88],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '成都',
        'lnglat': [104.06, 30.67],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '银川',
        'lnglat': [106.27, 38.47],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '合肥',
        'lnglat': [117.27, 31.86],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '济南',
        'lnglat': [117, 36.65],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '南宁',
        'lnglat': [108.33, 22.84],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '兰州',
        'lnglat': [103.73, 36.03],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '西宁',
        'lnglat': [101.74, 36.56],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '洛阳',
        'lnglat': [112.44, 34.7],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '广州',
        'lnglat': [113.23, 23.16],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '上海',
        'lnglat': [121.48, 31.22],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '哈尔滨',
        'lnglat': [126.63, 45.75],
        'count|1-100000': 1
      }, {
        'id': '@id',
        'city': '乌鲁木齐',
        'lnglat': [87.68, 43.77],
        'count|1-100000': 1
      }]
    }
  })
})

Mock.mock(/manager\/dashboard\/intelligence\/map\/activated-device/, function () {
  return Mock.mock({
    'errCode': '0',
    'data': [{
      'id': '@id',
      'userId': '@id',
      'userName': '@cname(2,4)',
      'email': '@email',
      'deviceModel|1': ['MAC pro', 'iPhone X', '华为9'],
      'city': '大理',
      'longitude': '100.19',
      'latitude': '25.69'
    }, {
      'id': '@id',
      'userId': '@id',
      'userName': '@cname(2,4)',
      'email': '@email',
      'deviceModel|1': ['MAC pro', 'iPhone X', '华为9'],
      'city': '巴中',
      'longitude': '106.73',
      'latitude': '31.86'
    }, {
      'id': '@id',
      'userId': '@id',
      'userName': '@cname(2,4)',
      'email': '@email',
      'deviceModel|1': ['MAC pro', 'iPhone X', '华为9'],
      'city': '百色',
      'longitude': '106.52',
      'latitude': '23.91'
    }]
  })
})

Mock.mock(/manager\/dashboard\/intelligence\/map\/direction/, function () {
  return Mock.mock({
    "errCode": "0",
    "data": [{
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
      "remote|3": {
      "city": "北京",
      "latitude": "39.929985778",
      "longitude": "116.395645"
    },
    "source|3": {
      'city': '百色',
      'longitude': '106.52',
      'latitude': '23.91'
      }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
       "city": "北京",
       "latitude": "39.929985778",
       "longitude": "116.395645"
     },
     "source|3": {
      'city': '巴中',
      'longitude': '106.73',
      'latitude': '31.86'
     }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
      'city': '哈尔滨',
       "latitude": "45.75",
       "longitude": "126.63"
     },
     "source|3": {
      'longitude': '125.35',
      'city': '吉林长春',
      'latitude': '43.88'
     }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
       "city": "北京",
       "latitude": "39.929985778",
       "longitude": "116.395645"
     },
     "source|3": {
      'city': '拉萨',
      'longitude': '91.11',
      'latitude': '29.97'
     }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
       "city": "北京",
       "latitude": "39.929985778",
       "longitude": "116.395645"
     },
     "source|3": {
      'city': '洛阳',
      'longitude': '112.44',
      'latitude': '34.7'
     }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
       "city": "北京",
       "latitude": "39.929985778",
       "longitude": "116.395645"
     },
     "source|3": {
      'city': '大理',
      'longitude': '100.19',
      'latitude': '25.69'
     }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
       "city": "北京",
       "latitude": "39.929985778",
       "longitude": "116.395645"
     },
     "source|3": {
      'city': '银川',
      'longitude': '106.27',
      'latitude': '38.47'
     }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
       "city": "北京",
       "latitude": "39.929985778",
       "longitude": "116.395645"
     },
     "source|3": {
      'city': '乌鲁木齐',
      'longitude': '87.68',
      'latitude': '43.77'
     }
    }, {
      "id": "@id",
      ["count|" + rdmNum(10000)]: 1,
     "remote|3": {
       "city": "北京",
       "latitude": "39.929985778",
       "longitude": "116.395645"
     },
     "source|3": {
      'city': '兰州',
      'longitude': '103.73',
      'latitude': '36.03'
     }
    }]
  })
})