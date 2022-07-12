
import globalData from './globalData'
export const Local = {
  // 设置永久缓存
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  // 获取永久缓存
  get(key) {
    let json = window.localStorage.getItem(key);
    return JSON.parse(json);
  },
  // 移除某永久缓存
  remove(key) {
    window.localStorage.removeItem(key);
  },
  // 移除全部永久缓存
  clear() {
    window.localStorage.clear();
  },
};


export const random = function () {
  return Math.round(Math.random() * 10);
};

//防抖函数
export const debounce = (fn, delay) => {
  let timer; // 定时器
  return function (...args) {
    // 形成闭包
    // args 为函数调用时传的参数。
    let context = this;
    timer && clearTimeout(timer); // 当函数再次执行时，清除定时器，重新开始计时
    // 利用定时器，让指定函数延迟执行。
    timer = setTimeout(function () {
      // 执行传入的指定函数，利用apply更改this绑定和传参
      fn.apply(context, args);
    }, delay);
  };
};

export const RegFunc = {
  // 正则判断百分数
  isPercent(str) {
    return /^[0-9]+(.[0-9]{1,2})?%$/.test(str.toString());
  },
};
export const DateAdd = function (interval, number, date) {
  /*
   *   功能:实现VBScript的DateAdd功能.
   *   参数:interval,字符串表达式，表示要添加的时间间隔.
   *   参数:number,数值表达式，表示要添加的时间间隔的个数.
   *   参数:date,时间对象.
   *   返回:新的时间对象.
   *   var   now   =   new   Date();
   *   var   newDate   =   DateAdd( "d ",5,now);
   *---------------   DateAdd(interval,number,date)   -----------------
   */
  switch (interval) {
    case "y ": {
      date.setFullYear(date.getFullYear() + number);
      return date;
      break;
    }
    case "q ": {
      date.setMonth(date.getMonth() + number * 3);
      return date;
      break;
    }
    case "m ": {
      date.setMonth(date.getMonth() + number);
      return date;
      break;
    }
    case "w ": {
      date.setDate(date.getDate() + number * 7);
      return date;
      break;
    }
    case "d ": {
      date.setDate(date.getDate() + number);
      return date;
      break;
    }
    case "h ": {
      date.setHours(date.getHours() + number);
      return date;
      break;
    }
    case "m ": {
      date.setMinutes(date.getMinutes() + number);
      return date;
      break;
    }
    case "s ": {
      date.setSeconds(date.getSeconds() + number);
      return date;
      break;
    }
    default: {
      date.setDate(d.getDate() + number);
      return date;
      break;
    }
  }
};

// 退出删除本地数据方法
export const logoutDel = function () {
  Local.remove(globalData._fbAddress);
  Local.remove(globalData._ethAddress);
};


// 加载动画
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export const ToastTip = function () {
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true,
    message: '加载中...',
    icon: '',
  });
};


export const      // 在console中显示信息
    copyRightConsole = function(packageInfo) {
  /* 样式代码 */
  const projectNameStyle = 'font-size: 20px;font-weight: 600;color: rgb(244,167,89);';
  const descriptionStyle = 'font-style: oblique;font-size:14px;color: rgb(244,167,89);font-weight: 400;';
  const versionStyle = 'color: rgb(30,152,255);padding:8px 0 2px;';
  const dateTimeStyle = 'color: rgb(30,152,255);padding:0 0 5px;';

  /* 内容代码 */
  const projectName = packageInfo.name || '';
  const description = packageInfo.description || '';
  const version = `版 本 号：${packageInfo.version}    【ArcGIS API for JavaScript 版本：${packageInfo?.dependencies?.['@c_arcgis/core'] || packageInfo?.dependencies?.['@arcgis/core']}】`;

  // 空格有意义，不要格式化
  console.log(`%c${description} %c${projectName}
%c${version}`, projectNameStyle, descriptionStyle, versionStyle, dateTimeStyle);
}



