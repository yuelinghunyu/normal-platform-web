/**
 * @author dajun.jiang
 * @description main.js 引用
 */
import VConsole from "vconsole";
import { listEnv } from "Plugin/constant";
import { flexible } from "Plugin/utils";
import { initRunSdk /**initBaiDuSdk*/ } from "Plugin/addSdk";
import initVant from "Plugin/vant.js";

const initCommon = () => {
  if (listEnv.condition === "test") new VConsole();
  flexible(window);
  initVant();
};
const initFunc = async () => {
  await initRunSdk();
  // await initBaiDuSdk();
};

export { initCommon, initFunc };
