import axios from 'axios'
// import URL from './config'
import jsonp from './jsonp'
// import BASE64 from '../utils/base64'
import bus from '../bus'
import store from '../store/index'
import Toast from 'muse-ui-toast'

const URL = "http://127.0.0.1:3002"

// 超时时间 axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true; // 可以设置cookies

// 请求拦截器 request
axios
  .interceptors
  .request
  .use(config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config
  }, err => {
    return Promise.reject(err)
  })

// 响应拦截器 response
axios
  .interceptors
  .response
  .use(response => {
    // if (response.status && parseInt(response.status) === 400) {
    //   console.log(response)
    //   bus.$emit('login', '/login')
    // }
    if (response.data.errcode === 3) {
      // console.log(12345)
      Toast.info('请前往登陆')
      bus.$emit('login', '/login')
    }
    // console.log(response)
    return response;
  }, error => {    
    // console.log(error.response)
    // if (error.response.status && error.response.status == 400) {
    // // if (error.response.data.errcode === 3) {
    //   console.log(12345)
    //   bus.$emit('login', '/login')
    // }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

/**
 *注册
 *
 * @export
 * @param {*} account 账号
 * @param {*} password 密码
 * @returns
 */
export function register(account, password) {
  return axios({
    url: `${URL}/register`,
    method: 'post',
    data: {
      account: account,
      password: password
    },
    transformRequest: [function (data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 *登陆
 *
 * @export
 * @param {*} account 账号
 * @param {*} password 密码
 * @returns
 */
export function login(account, password) {
  return axios({
    url: `${URL}/login`,
    method: 'post',
    data: {
      account: account,
      password: password
    },
    transformRequest: [function (data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 提交个人信息
 * @param {string} account
 * @param {string} personalMsg
 *
 */
export function postPersonalData(account, personalMsg) {
  return axios({
    url: `${URL}/personal_data/personal_msg`,
    method: 'post',
    data: {
      account: account,
      personal_msg: personalMsg
    },
    transformRequest: [function (data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 *
 * @param {string} account
 * @param {string} avatar base64
 * @param {string} imageType gif/jpg/jpeg/png
 */
export function postAvatar(account, avatar, imageType) {
  return axios({
    url: `${URL}/personal_data/avatar`,
    method: 'post',
    data: {
      account: account,
      avatar: avatar,
      image_type: imageType
    },
    transformRequest: [function (data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 *
 * @param {number} pageNum
 * @param {number} dataCount
 * @param {string} account
 */
export function getInvitationList(pageNum, dataCount, account) {
  const data = {
    page_number: pageNum,
    data_count: dataCount,
    account: account
  }
  // return jsonp(`${URL}/home`, data)
  return axios.get(`${URL}/home`, {params: data})
}

/**
 *
 * @param {String} account
 * @param {Object} data
 */
export function releaseInvitation(account, data) {
  return axios({
    url: `${URL}/content`,
    method: 'post',
    data: {
      author_account: account,
      article_msg: data
    },
    transformRequest: [function (data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 回帖
 * @param {String} content 内容
 * @param {String} contentId 帖子id
 * @param {String} user 回复
 */
export function replyContent(content, contentId, account) {
  return axios({
    url: `${URL}/reply`,
    method: 'post',
    data: {
      reply_content: content,
      content_id: contentId,
      reply_from: account
    },
    transformRequest: [function (data) {
        let ret = "";
        for (let it in data) {
          ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 点赞/取消点赞
 * @param {String} content_id 文章id
 * @param {Number} favor_type 1:点赞 0:取消点赞
 * @param {String} account 账户
 */
export function favor(content_id, favor_type, account) {
  const data = {
    content_id: content_id,
    favor_type: favor_type,
    account: account
  }
  // return jsonp(`${URL}/favor`, data)
  return axios(`${URL}/favor`, {params: data})
}

/**
 * 获取个人信息
 * @param {String} account
 */
export function getPersonalMsg(account) {
  const data = {
    account: account
  }
  // return jsonp(`${URL}/personal_msg`, data)
  return axios(`${URL}/personal_msg`, {params: data})
}

/**
 *
 * @param {string} account
 * @param {string} contentId
 */
export function getInvitationDetail(account, contentId) {
  const data = {
    account: account,
    content_id: contentId
  }
  // return jsonp(`${URL}/invitation_detail`, data)
  return axios(`${URL}/invitation_detail`, {params: data})
}

export function test(account) {
  const params = {
    account: account
  }
  return axios
    .get(`${URL}/personal_msg`, {params: params})
    .then(res => res.data)
}
