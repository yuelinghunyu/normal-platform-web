import commonApi from "Src/api/common-api";
import router from "Src/router";
import Abstract from "Src/http/abstract";
const http = new Abstract();
import { OK } from "Src/plugin/constant";
import { qwJsSdk, feiShuJsSdk } from "Src/plugin/addSdk";
import { setStorage, getStorage } from "Src/plugin/utils";
const getSignWx = async (wxSign) => {
  if (!wxSign) {
    const url = window.location.href.split("#")[0];
    const params = { url: url };
    const sign = await http.getReq({
      url: commonApi.thirdSignatureApi,
      params,
    });
    if (sign.code === OK) await qwJsSdk(sign);
  }
};
const getSignFeishu = async (feishuSign) => {
  if (!feishuSign) {
    const url = window.location.href.split("#")[0];
    const params = { url: url };
    const sign = await http.getReq({
      url: commonApi.thirdSignatureApi,
      params,
    });
    if (sign.code === OK) await feiShuJsSdk(sign);
  }
};
const getNational = async (isChangelanguage, i18n) => {
  if (!isChangelanguage) {
    const data = await http.getReq({ url: commonApi.getNationalityApi });
    if (data.code == 200) {
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
const routerPath = (i18n) => {
  router.beforeEach(async (to, from, next) => {
    const isChangelanguage = getStorage("isChangelanguage");
    const ua = getStorage("user_agent_env");
    // 获取code
    if (ua === "wxwork") {
      // wxsign
      const wxSign = getStorage("wx_sign_2");
      await getSignWx(wxSign);
    }
    if (ua === "Lark") {
      // feishusign
      const feishuSign = getStorage("feishu_sign");
      await getSignFeishu(feishuSign);
    }
    // isChina
    await getNational(isChangelanguage, i18n);
    next();
  });
};

export { routerPath };
