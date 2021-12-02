import instance from "Src/http/instance.js";
import { Notify } from "vant";
import { checkUrl } from "Plugin/constant";
const env = process.env.NODE_ENV;
let baseURL = "/weiH5Api";
class Abstract {
  baseURL = baseURL;
  headers = {
    ContentType: "application/json;charset=UTF-8",
  };
  apiAxios({
    baseURL = this.baseURL,
    headers = this.headers,
    method,
    url,
    data,
    params,
    responseType,
  }) {
    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType,
      })
        .then((res) => {
          const correctStatus = [200, 201, 204];
          // 200:服务端业务处理正常结束
          if (correctStatus.includes(res.status)) {
            const serverCode = [0, 1000];
            const authCode = [401];
            const code = res.data.code;
            if (serverCode.includes(code))
              Notify({ type: "warning", message: res.data.message });
            if (authCode.includes(code))
              env === "development"
                ? Notify({ type: "warning", message: "未授权" })
                : (window.location.href = checkUrl);
            resolve(res.data);
          } else {
            resolve(res.data || url + "请求失败");
          }
        })
        .catch((err) => {
          console.log(err);
          const message = err.data || url + "请求失败";
          reject({ status: false, message, result: null });
        });
    });
  }
  /**
   * GET类型的网络请求
   */
  getReq({ baseURL, headers, url, data, params, responseType }) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "GET",
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * POST类型的网络请求
   */
  postReq({ baseURL, headers, url, data, params, responseType }) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "POST",
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * PUT类型的网络请求
   */
  putReq({ baseURL, headers, url, data, params, responseType }) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "PUT",
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * DELETE类型的网络请求
   */
  deleteReq({ baseURL, headers, url, data, params, responseType }) {
    return this.apiAxios({
      baseURL,
      headers,
      method: "DELETE",
      url,
      data,
      params,
      responseType,
    });
  }
}
export default Abstract;
