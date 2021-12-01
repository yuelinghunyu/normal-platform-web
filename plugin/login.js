import commonApi from "App/plugin/common-api";
import router from "App/router";
import Abstract from "Http/abstract";
const http = new Abstract();
import { OK } from "Plugin/constant";
import { qwJsSdk, feiShuJsSdk } from "Plugin/addSdk";
import { setStorage, getStorage, hasStorage } from "Plugin/utils";
const getSignWx = async (wxSign) => {
  if (!hasStorage(wxSign)) {
    const url = window.location.href.split("#")[0];
    const params = { url: url };
    const sign = await http.getReq({
      url: commonApi.thirdSignatureApi,
      params,
    });
    if (sign && sign.code === OK) await qwJsSdk(sign);
  }
};
const getSignFeishu = async (feishuSign) => {
  if (!hasStorage(feishuSign)) {
    const url = window.location.href.split("#")[0];
    const params = { url: url };
    const sign = await http.getReq({
      url: commonApi.thirdSignatureApi,
      params,
    });
    if (sign && sign.code === OK) await feiShuJsSdk(sign);
  }
};
const getNational = async (isChangelanguage, i18n) => {
  if (!hasStorage(isChangelanguage)) {
    const data = await http.getReq({ url: commonApi.getNationalityApi });
    if (data && data.code == OK) {
      const isChina = data.result.isChina;
      // 是否展示悬浮窗
      const isShowBlue = data.result.isShowBlue;
      const isEsp = data.result.isEsp;
      setStorage("isChangelanguage", "true");
      setStorage("isEsp", isEsp);
      isChina ? (i18n.locale = "zh-CN") : (i18n.locale = "en-US");
      setStorage("language", i18n.locale);
      setStorage("national", isChina);
      setStorage("show_blue", isShowBlue);
    }
  }
};
const getwelcome = async (isWelcome) => {
  if (!hasStorage(isWelcome)) {
    const data = await http.getReq({ url: commonApi.welcomeApi });
    if (data && data.code === OK)
      setStorage("welcome_info", JSON.stringify(data.result));
  }
};
const routerPath = (i18n) => {
  sessionStorage.removeItem("wx_sign_2");
  sessionStorage.removeItem("feishu_sign");
  router.beforeEach(async (to, from, next) => {
    const isChangelanguage = getStorage("isChangelanguage");
    const ua = getStorage("user_agent_env");
    const isWelcome = getStorage("welcome_info");
    // 获取code
    if (hasStorage(ua) && ua === "wxwork") {
      // wxsign
      const wxSign = getStorage("wx_sign_2");
      await getSignWx(wxSign);
    }
    if (hasStorage(ua) && ua === "Lark") {
      // feishusign
      const feishuSign = getStorage("feishu_sign");
      await getSignFeishu(feishuSign);
    }
    //错误页不需要调用接口
    if ("/result" !== to.path) {
      // isChina
      await getNational(isChangelanguage, i18n);
      // 个人信息
      await getwelcome(isWelcome);
    }
    next();
  });
};

export { routerPath };
