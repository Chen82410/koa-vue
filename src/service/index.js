import axios from 'axios'
// import URL from './config'
import jsonp from './jsonp'
// import BASE64 from '../utils/base64'


const URL = "http://127.0.0.1:3002"


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
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(data[it]) +
            "&";
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
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(data[it]) +
            "&";
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
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(data[it]) +
            "&";
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
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(data[it]) +
            "&";
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
  return jsonp(`${URL}/home`, data)
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
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(data[it]) +
            "&";
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
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(data[it]) +
            "&";
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
  return jsonp(`${URL}/favor`, data)
}

/**
 * 获取个人信息
 * @param {String} account 
 */
export function getPersonalMsg(account) {
  const data = {
    account: account
  }
  return jsonp(`${URL}/personal_msg`, data)
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
  return jsonp(`${URL}/invitation_detail`, data)
}

export function test(account) {
  const params = {
    account: account
  }
  return axios.get(`${URL}/personal_msg`, {params: params}).then(res => res.data)
}
