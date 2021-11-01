/* eslint-disable no-undef */
const onMenuShareAppMessage = (title, desc, link, imgUrl) => {
  wx.onMenuShareAppMessage({
    title: title || "", // 分享标题
    desc: desc || "", // 分享描述
    link: link || "", // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
    imgUrl: imgUrl || "", // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      console.log("转发成功");
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      console.log("转发失败");
    },
  });
};
const onMenuShareWechat = (title, desc, link, imgUrl) => {
  wx.onMenuShareWechat({
    title: title || "", // 分享标题
    desc: desc || "", // 分享描述
    link: link || "", // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
    imgUrl: imgUrl || "", // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      console.log("转发成功");
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      console.log("转发失败");
    },
  });
};
const onMenuShareTimeline = (title, desc, link, imgUrl) => {
  wx.onMenuShareTimeline({
    title: title || "", // 分享标题
    desc: desc || "", // 分享描述
    link: link || "", // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
    imgUrl: imgUrl || "", // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      console.log("分享到朋友圈成功");
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      console.log("分享到朋友圈失败");
    },
  });
};

const openEnterpriseChat = (userIds, groupName) => {
  wx.openEnterpriseChat({
    // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
    userIds: userIds || "", // 参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
    groupName: groupName || "", // 必填，会话名称。单聊时该参数传入空字符串""即可。
    success: function () {
      // 回调
      console.log("会话逻辑");
    },
    fail: function (res) {
      if (res.errMsg.indexOf("function not exist") > -1) {
        alert("版本过低请升级");
      }
    },
  });
};

const invoke = (title, link, imgUrl) => {
  wx.invoke(
    "shareAppMessage",
    {
      title: title || "", // 分享标题
      link: link || "", // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
      imgUrl: imgUrl || "", // 分享图标
    },
    function (res) {
      if (res.err_msg == "shareAppMessage:ok") {
        console.log("分享成功");
      } else {
        console.log("取消分享");
      }
    }
  );
};
const shareWechat = (title, link, imgUrl) => {
  wx.invoke(
    "shareWechatMessage",
    {
      title: title || "", // 分享标题
      link: link || "", // 分享链接；在微信上分享时，该链接的域名必须与企业某个应用的可信域名一致
      desc: "", // 分享描述
      imgUrl: imgUrl || "", // 分享图标
    },
    function (res) {
      if (res.err_msg == "shareWechatMessage:ok") {
        console.log("分享成功");
      } else {
        console.log("取消分享");
      }
    }
  );
};

const wxLocation = (successFn, failFn) => {
  wx.getLocation({
    type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
      successFn && successFn(res);
    },
    fail: function (res) {
      failFn && failFn(res);
    },
  });
};
export {
  openEnterpriseChat,
  onMenuShareAppMessage,
  onMenuShareWechat,
  onMenuShareTimeline,
  invoke,
  shareWechat,
  wxLocation,
};
