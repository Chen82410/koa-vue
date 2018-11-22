let Utils = {

  /**
 2      * 设置cookie
 3      * @param name cookie的名称
 4      * @param value cookie的值
 5      * @param day cookie的过期时间
 6      */
  setCookie(name, value, day) {
    if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      let expires = day * 24 * 60 * 60 * 1000;
      let date = new Date(+ new Date() + expires);
      document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
      document.cookie = name + "=" + escape(value);
    }
  },

  /**
 2      * 获取对应名称的cookie
 3      * @param name cookie的名称
 4      * @returns {null} 不存在时，返回null
 5      */
  getCookie(name) {
    let arr;
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) 
      return unescape(arr[2]);
    else 
      return null;
  },

  /**
   * 清除cookie
   * @param {string} name 
   */
  clearCookie(name) {
    this.setCookie(name, "", -1)
  },

  /**
   * date: 日期
   * fmt: 格式
   */
  dateFormat(date, fmt) { 
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) 
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) 
      if (new RegExp("(" + k + ")").test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
          ? (o[k])
          : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
}

export default Utils