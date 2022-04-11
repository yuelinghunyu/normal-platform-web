/**
 * @author dajun.jiang
 * @description main.js 引用
 */
import VConsole from "vconsole";
import { listEnv, flexible } from "yuelinghunyu-common-plugin";
import initVant from "Plugin/vant.js";

const initCommon = () => {
  if (listEnv.condition === "test") new VConsole();
  flexible();
  initVant();
};
const initFunc = async () => { };

export { initCommon, initFunc };
