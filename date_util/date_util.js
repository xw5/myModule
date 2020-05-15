/**
 * 传入秒数输入余多少天多少小时多少秒
 * @param {Number} countdown 总秒数
 * @param {Array} separate 分隔符,默认为["天","小时","分","秒"]
 * @param {Boolean} isAll 是否要显示全部,不传则会忽略不0的项
 */
function getDDHHMMSS(countdown, separate, isAll) {
  var separate = separate ? separate : ["天", "小时", "分", "秒"];
  var day = Math.floor(countdown / 86400);
  countdown -= day * 86400;
  var hour = Math.floor(countdown / 3600);
  countdown -= hour * 3600;
  var minite = Math.floor(countdown / 60);
  var seconds = countdown - minite * 60;
  if (isAll) {
    return ("00" + day).slice(-2) + separate[0] + ("00" + hour).slice(-2) + separate[1] + ("00" + minite).slice(-2) + separate[2] + ("00" + seconds).slice(-2) + separate[3];
  } else {
    if (day > 0) {
      return resultStr = ("00" + day).slice(-2) + separate[0] + ("00" + hour).slice(-2) + separate[1] + ("00" + minite).slice(-2) + separate[2] + ("00" + seconds).slice(-2) + separate[3];
    }

    if (hour > 0) {
      return resultStr = ("00" + hour).slice(-2) + separate[1] + ("00" + minite).slice(-2) + separate[2] + ("00" + seconds).slice(-2) + separate[3];
    }

    if (minite > 0) {
      return resultStr = ("00" + minite).slice(-2) + separate[2] + ("00" + seconds).slice(-2) + separate[3];
    }
    return ("00" + seconds).slice(-2) + separate[3];
  }
  return resultStr;
}

/**
 * 获得今日日期时间字符串，格式:2019-01-08 10:20:05
 * @param {Number} times 毫秒数
 * @param {Array} separate 分隔符 默认为["-",":"]
 */
function getYMD_HHMMSS(times, separate) {
  var now = null,
  separate = separate ? separate : ["-", ":"];
  if (times && typeof times == "number") {
    now = new Date(times)
  } else {
    now = new Date()
    separate = times ? times : ["-", ":"];
  }
  return now.getFullYear().toString().toString() + separate[0] +
    ("00" + (now.getMonth() + 1).toString()).slice(-2) + separate[0] +
    ("00" + now.getDate().toString()).slice(-2) + " " +
    ("00" + now.getHours().toString()).slice(-2) + separate[1] +
    ("00" + now.getMinutes().toString()).slice(-2) + separate[1] +
    ("00" + now.getSeconds().toString()).slice(-2);
}

/**
* 获得多少小时以前
* @param {Number} pastTime 事件发生时的毫秒数
*/
function getPastTimeStr(pastTime) {
  var remain = (Date.now() - pastTime) / 1000;
  var y = Math.floor(remain / 31104000);
  remain = remain % 31104000;
  var M = Math.floor(remain / 2592000);
  remain = remain % 2592000;
  var d = Math.floor(remain / 86400);
  remain = remain % 86400;
  var h = Math.floor(remain / 3600);
  remain = remain % 3600;
  var m = Math.floor(remain / 60);
  if (y > 1) {
    return parseInt(m) + "年前";
  }
  if (M > 1) {
    return parseInt(M) + "月前";
  }
  if (d > 1) {
    return parseInt(d) + "天前";
  }
  if (h > 1) {
    return parseInt(h) + "小时前";
  }
  if (m > 1) {
    return parseInt(m) + "分钟前";
  }
  return "刚刚"
}

/**
 * 将剩余秒数切割，返回[x,x,x,x]，分别表述天、小时、分、秒
 * @param {Number} second 剩余秒数
 */
function sliceTime(second) {
  if (!second) {
    return [0, 0, 0, 0]
  }

  var remain = second;
  var d = Math.floor(remain / 86400);
  remain = remain % 86400;
  var h = Math.floor(remain / 3600);
  remain = remain % 3600;
  var m = Math.floor(remain / 60);
  remain = remain % 60;
  var s = remain;

  return [("00" + d).slice(-2), ("00" + h).slice(-2), ("00" + m).slice(-2), ("00" + s).slice(-2)];
}

/**
 * 返回星期几
 * @param {Date | number} day
 */
function getWeekDay(day) {
  let weekName = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  if (day instanceof Date) {
    return weekName[day.getDay()];
  } else {
    return weekName[day];
  }
}

/**
 * 返回integer： 20180102
 * @param {Date} date 日期对象
 */
function getDayNumber(date) {
  date = date ? date : new Date();
  return date.getFullYear() * 10000 + (date.getMonth()+1) * 100 + date.getDate();
}

/**
 * 格式 3'23''
 * @param {Number} secs 秒
 */
function getSpeed(second){
  var h = Math.floor(second / 3600);
  var m = Math.floor((second / 60 % 60));
  var s = Math.floor((second % 60));
  let result = "0'00\"";
  if (h < 1) {
      result = m + "\'" + s + "\"";
  } else {
      result = h * 60 + m + "\'" + s + "\"";
  }
  return result;
}


module.exports = {
  getDDHHMMSS: getDDHHMMSS,
  getYMD_HHMMSS: getYMD_HHMMSS,
  getPastTimeStr: getPastTimeStr,
  getWeekDay: getWeekDay,
  getDayNumber: getDayNumber,
  getSpeed: getSpeed
};