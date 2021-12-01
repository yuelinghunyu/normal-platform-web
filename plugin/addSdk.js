/* eslint-disable no-undef */
import {
  addScript,
  setStorage,
  getStorage,
  isMobile,
  getEnv,
} from "Plugin/utils";
const env = process.env.NODE_ENV;

// 加载企业微信或者飞书sdk
const initRunSdk = () => {
  const ua = getEnv();
  const feiShuSdk = "//s3.bytecdn.cn/ee/lark/js_sdk/h5-js-sdk-1.4.13.js";
  const qiWeiSdk = "//res.wx.qq.com/open/js/jweixin-1.2.0.js";
  let sdkSrc = "";
  switch (ua) {
    case "Lark":
      sdkSrc = feiShuSdk;
      break;
    case "wxwork":
      sdkSrc = qiWeiSdk;
      break;
  }
  return new Promise((resolve) => {
    if (ua) setStorage("user_agent_env", ua);
    else if (isMobile) setStorage("user_agent_env", "mobile");
    else setStorage("user_agent_env", "pc");
    if (sdkSrc) addScript(sdkSrc);
    return resolve();
  });
};

// 加载百度sdk
const initBaiDuSdk = () => {
  let ak = "";
  if (env === "development") ak = "8bTd6HCw1yDTs7KzaRvfFhRY74GS3LSS";
  else ak = "bO7j0oCwBSapWaIvA02ptm9s3oLfifX6";
  const baiDhSdk = `//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=onBMapCallback`;
  return new Promise((resolve) => {
    if (typeof BMap !== "undefined") {
      resolve(BMap);
      return true;
    }
    // 百度地图异步加载回调处理
    window.onBMapCallback = () => {
      console.log("百度地图脚本初始化成功");
      resolve(BMap);
    };
    if (baiDhSdk) addScript(baiDhSdk);
  });
};

// 初始化企业微信 js sdk 方法
const qwJsSdk = (data) => {
  return new Promise((resolve, reject) => {
    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.result.appId, // 必填，企业微信的corpID
      timestamp: data.result.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.result.nonceStr, // 必填，生成签名的随机串
      signature: data.result.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: [
        // 隐藏右上角菜单接口
        "hideOptionMenu",
        "showOptionMenu",
        "hideMenuItems",
        "showMenuItems",
        "onMenuShareAppMessage",
        "onMenuShareWechat",
        "onMenuShareTimeline",
        "openLocation",
        "getLocation",
      ], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    });
    wx.ready(() => {
      wx.hideMenuItems({
        menuList: [
          "menuItem:favorite",
          "menuItem:openWithSafari",
          "menuItem:share:email",
        ], // 要隐藏的菜单项
      });
      setStorage("wx_sign_2", "wxSign");
      return resolve(getStorage("wx_sign_2"));
    });
    wx.error((err) => {
      console.log(err);
      return reject({ wx: "wx api注册失败" });
    });
    wx.complete(() => {
      console.log("调试");
    });
  }).catch((error) => {
    console.log(error);
  });
};

// 初始化飞书 js sdk 方法
const feiShuJsSdk = (data) => {
  return new Promise((resolve, reject) => {
    window.h5sdk.config({
      appId: "", // 必填，应用ID
      timeStamp: data.timeStamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名
      jsApiList: ["device.geolocation.get", "biz.util.share"],
    });
    window.h5sdk.error((err) => {
      console.log("wxapi注册失败:" + JSON.stringify(err));
      return reject(getStorage("feishu_sign"));
    });
    window.h5sdk.ready(() => {
      console.log("wxapi注册成功:");
      setStorage("feishu_sign", "feishuSign");
      return resolve(getStorage("feishu_sign"));
    });
  }).catch((error) => {
    console.log(error);
  });
};
export { initRunSdk, initBaiDuSdk, qwJsSdk, feiShuJsSdk };
