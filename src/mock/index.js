import Mock from "mockjs";
// import easyApi from "./data/esay";

Mock.setup({
  timeout: 1000,
});

// Mock.mock("/app/esay/apps", "get", easyApi.getAppTypeList);
export default Mock;
