import Vue from "vue";
import VueI18n from "vue-i18n";
// 添加公共样式
import "Styles/css/index.scss";
import App from "Src/App.vue";
import router from "Src/router";
import { zh, en } from "Src/language";
import { initCommon, initFunc } from "Plugin/config";
// import { routerPath } from "Plugin/login";
import { getStorage, hasStorage } from "Plugin/utils";
import http from "@/http";
// 初始化加载js
initCommon();
initFunc();
const env = process.env.NODE_ENV;
if (env === "development") require("./mock/index");
Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.prototype.$http = http;
const language = getStorage("language");
const lang = hasStorage(language) ? getStorage("language") : "zh-CN";
const i18n = new VueI18n({
  locale: lang,
  messages: {
    "zh-CN": zh, // 中文语言包
    "en-US": en, // 英文语言包
  },
});
// routerPath(i18n);
new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
