/**
 * @author dajun.jiang
 * @description main.js 引用
 */
import VConsole from "vconsole";
import { listEnv } from "Src/plugin/constant";
import { flexible } from "Src/plugin/utils";
import { initRunSdk /**initBaiDuSdk*/ } from "Src/plugin/addSdk";
import initVant from "Src/plugin/vant.js";

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
