/**
 * @author dajun.jiang
 * @description 常用组件库
 */
const ua = navigator.userAgent.toLowerCase();
const isMobile = /ios|iphone|ipod|ipad|android/.test(ua);
// time是毫秒
const setCookie = (name, value, time) => {
  let exp = new Date();
  exp.setTime(exp.getTime() + time);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};
const getCookie = (name) => {
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  let arr = document.cookie.match(reg);
  if (arr && arr.length) return unescape(arr[2]);
  else return null;
};
const delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
const random = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};
// 并集
const intersection = (originList, list, type) => {
  let obj = {};
  let newList = originList.concat(list);
  let result = newList.reduce((prev, cur) => {
    if (!obj[cur[type]]) {
      obj[cur[type]] = true && prev.push(cur);
    }
    return prev;
  }, []);
  return result;
};
// 差集
const difference = (originList, list, type) => {
  const originListId = originList.map((origin) => {
    return origin[type];
  });
  const listId = list.map((item) => {
    return item[type];
  });
  let newList = originList.concat(list);
  let result = newList.filter((v) => {
    return (
      originListId.indexOf(v[type]) === -1 || listId.indexOf(v[type]) === -1
    );
  });
  return result;
};
const getNowFormatDate = () => {
  const date = new Date();
  const seperator1 = "-";
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  return year + seperator1 + month + seperator1 + strDate;
};
const flexible = (window, callback) => {
  const domEl = window.document.documentElement;
  let timer = null;
  function refresh() {
    let width = domEl.getBoundingClientRect().width;
    if (width > 562.5) width = 450;
    const rem = width / 3.75;
    domEl.style.fontSize = `${rem}px`;
    callback && callback();
  }
  window.addEventListener("resize", function () {
    timer && clearTimeout(timer);
    timer = setTimeout(refresh, 400);
  });

  window.addEventListener("pageshow", function () {
    refresh();
  });
};
const getQueryVariable = (variable) => {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
const getRandomArrayElements = (arr, count) => {
  let shuffled = arr.slice(0);
  let i = arr.length;
  let min = i - count;
  let temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};
const setStorage = (item, value) => {
  sessionStorage.setItem(item, value);
};
const removeStorage = (item) => {
  sessionStorage.removeItem(item);
};
const getStorage = (item) => {
  return sessionStorage.getItem(item);
};
const hasStorage = (item) => {
  return item && item !== "null" && item !== undefined && item !== "undefined";
};
const arrIndexOf = (arr, aValue) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == aValue) {
      return i;
    }
  }
  return -1;
};
const addClass = (obj, className) => {
  if (obj.className == "") {
    obj.className = className;
  } else {
    var arr = obj.className.split(" "); // 利用class间的空格将其拆分为数组
    if (arrIndexOf(arr, className) == -1) {
      // 这个元素里面已经存在另外的class的判断
      obj.className += " " + className;
    }
  }
};
const removeClass = (obj, sClassName) => {
  var arr = obj.className.split(" ");
  if (arrIndexOf(arr, sClassName) != -1) {
    arr.splice(arrIndexOf(arr, sClassName), 1);
    obj.className = arr.join(" ");
  }
};
// 手动添加script标签
const addScript = (src) => {
  let script = document.createElement("script");
  script.type = "text/JavaScript";
  script.src = src;
  document.body.appendChild(script);
};
// 判断是什么环境
const getEnv = () => {
  const uaList = ["Lark", "wxwork"];
  const userAgent = window.navigator.userAgent;
  const isUa = (name) => {
    return userAgent.match(new RegExp(name), "i");
  };
  let ua = uaList.find((name) => {
    // Lark 飞书 wxwork 企微 ua.match(/wxwork/i)
    return isUa(name) ? isUa(name).includes(name) : null;
  });
  return ua;
};
// 单前的rem值
const calcRem = () => {
  const holeWidth = window.document.documentElement.getBoundingClientRect()
    .width;
  let width = holeWidth > 562.5 ? 450 : holeWidth;
  let rem = width / 3.75;
  return rem;
};
const getTransfrom = () => {
  let transform = "",
    // document.createElement() 创建元素节点，
    divStyle = document.createElement("div").style, // 返回的是一组object对象，里面包含了transform
    // 可能涉及到的几种兼容性写法，通过循环，找出浏览器识别的那个
    // 依次为： 全部、Safari 和 Chrome、firefox、ie9、opera
    transformArr = [
      "transfrom",
      "webkitTransform",
      "MozTransform",
      "msTransform",
      "OTransform",
    ];
  for (let i = 0; i < transformArr.length; i++) {
    if (transformArr[i] in divStyle) {
      // 找到以后立刻返回，结束函数
      transform = transformArr[i];
      return transform;
    }
  }
  transform = "transfrom";
  // 如果没有找到，就直接返回空字符串
  return transform;
};
const deepClone = (obj) => {
  const objClone = Array.isArray(obj) ? [] : {};
  // 进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (key in obj) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
};
// 获取位置
const getPos = (curEle) => {
  let totalLeft = null;
  let totalTop = null;
  let par = curEle.offsetParent;
  // 首先把自己本身的进行累加
  totalLeft += curEle.offsetLeft;
  totalTop += curEle.offsetTop;
  // 只要没有找到body，我们就把父级参照物的边框和偏移量累加
  while (par) {
    if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
      // 不是标准的ie8浏览器，才进行边框累加
      // 累加父级参照物边框
      totalLeft += par.clientLeft;
      totalTop += par.clientTop;
    }
    // 累加父级参照物本身的偏移
    totalLeft += par.offsetLeft;
    totalTop += par.offsetTop;
    par = par.offsetParent;
  }
  return { left: totalLeft, top: totalTop };
};
// 获取UUID
const guid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
// 页面刷新
const pageReload = () => {
  const browserRule = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
  if (browserRule.test(navigator.userAgent)) {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }
};
const debounce = (fn, delay) => {
  delay = delay || 600;
  let timer;
  return function () {
    let ctx = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(ctx, args);
    }, delay);
  };
};
const throttle = (fn, delay) => {
  let pre = Date.now();
  return function () {
    let ctx = this;
    let args = arguments;
    let now = Date.now();
    if (now - pre >= delay) {
      fn.apply(ctx, args);
      pre = Date.now();
    }
  };
};
export {
  isMobile,
  setCookie,
  getCookie,
  delCookie,
  random,
  intersection,
  difference,
  getNowFormatDate,
  flexible,
  getQueryVariable,
  getRandomArrayElements,
  hasStorage,
  setStorage,
  removeStorage,
  getStorage,
  addClass,
  removeClass,
  addScript,
  getEnv,
  calcRem,
  getTransfrom,
  deepClone,
  getPos,
  guid,
  pageReload,
  debounce,
  throttle,
};
