import { getEnv } from "Plugin/utils";
import {
  onMenuShareAppMessage,
  onMenuShareWechat,
  onMenuShareTimeline,
  wxLocation,
  openEnterpriseChat,
  invoke,
  shareWechat,
} from "Plugin/setWxShare";
import { feishuShare, feshiLocation } from "Plugin/setFeishuShare";
let ua = getEnv();
const customShare = (title, desc, link, imgUrl) => {
  if (ua === "wxwork") {
    // 转发
    onMenuShareAppMessage(title, desc, link, imgUrl);
    // 微信
    onMenuShareWechat(title, desc, link, imgUrl);
    // 分享到朋友圈
    onMenuShareTimeline(title, desc, link, imgUrl);
  }
};
const customLocation = (successFn, failFn) => {
  if (ua === "wxwork") {
    wxLocation(successFn, failFn);
  } else if (ua === "Lark") {
    feshiLocation(successFn, failFn);
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const l = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        successFn && successFn(l);
      }, failFn);
    } else {
      failFn && failFn();
    }
  }
};

const customOpenEnterpriseChat = (userIds, groupName) => {
  if (ua === "wxwork") {
    openEnterpriseChat(userIds, groupName);
    return true;
  }
  return false;
};

const customInvoke = (title, link, imgUrl) => {
  if (ua === "wxwork") {
    invoke(title, link, imgUrl);
    return true;
  }
  return false;
};

const customOnMenuShareTimeline = (title, desc, link, imgUrl) => {
  if (ua === "wxwork") {
    // 分享到朋友圈
    onMenuShareTimeline(title, desc, link, imgUrl);
  }
  if (ua === "Lark") {
    feishuShare(title, desc, link, imgUrl);
  }
};
const customShareWechat = (title, link, imgUrl) => {
  if (ua === "wxwork") {
    shareWechat(title, link, imgUrl);
    return true;
  }
  if (ua === "Lark") {
    feishuShare(title, "", link, imgUrl);
  }
  return false;
};

export {
  customShare,
  customLocation,
  customOpenEnterpriseChat,
  customInvoke,
  customOnMenuShareTimeline,
  customShareWechat,
};
