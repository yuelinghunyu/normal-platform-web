const OK = 200;
const env = process.env.NODE_ENV;
const listDev = {
  condition: "dev",
  // 文件地址
  file:
    "https://box-filestorage-uat.niohome.com/api/objects/download?token=5ef07fa62f09f78b91405cc2&slug=",
  // 服务地址
  url: "http://test.inosun.cn",
};

const listTest = {
  condition: "test",
  // 文件地址
  file:
    "https://box-filestorage-uat.niohome.com/api/objects/download?token=5ef07fa62f09f78b91405cc2&slug=",
  // 服务地址
  url: "http://hrss-test.niohome.com/wz2",
};

const listProd = {
  condition: "prod",
  // 文件地址
  file:
    "https://filestorage-bs.niohome.com/api/objects/download?token=5efde1cbb01bc2df502fe32a&slug=",
  // 服务地址
  url: "http://hrwz.niohome.com/wz2",
};

let listEnv = null;
switch (process.env.NODE_ENV) {
  case "development":
    listEnv = listDev;
    break;
  case "production":
    listEnv = listProd;
    break;
  case "test":
    listEnv = listTest;
    break;
}
let checkUrl = null;
if (env === "development")
  checkUrl = "https://hrss-test.niohome.com/weiH5Api/vg/enter";
if (env === "test")
  checkUrl =
    "https://hrss-test.niohome.com/portal/login/check?url=" +
    encodeURIComponent(window.location.href.replace(/&/i, "{xyz}"));
if (env === "production")
  checkUrl =
    "https://hrwz.niohome.com/portal/login/check?url=" +
    encodeURIComponent(window.location.href.replace(/&/i, "{xyz}"));

export { OK, listEnv, checkUrl };
