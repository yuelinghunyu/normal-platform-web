import axios from 'axios';
import { Notify } from 'vant';
import {
  getCookie,
  redirectCommonSso,
  listEnv,
} from 'yuelinghunyu-common-plugin';
const pending = [];
const CancelToken = axios.CancelToken;

const instance = axios.create({
  timeout: 30000,
  responseType: 'json',
});

const removePending = (config) => {
  for (const key in pending) {
    const item = +key;
    const list = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试');
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};
// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    removePending(request);
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c,
      });
    });
    // 暂时
    if (getCookie('nio_token')) {
      request.headers['DF-User-Token'] = getCookie('nio_token');
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    removePending(response.config);
    return response;
  },
  (error) => {
    console.log(error);
    const response = error.response;
    const errorCode = [401, 403, 500, 502];
    // 根据返回的http状态码做不同的处理
    switch (response.status) {
      case 401:
        redirectCommonSso(listEnv.condition, `${window.location.origin}/login`);
        // token失效
        break;
      case 403:
        Notify(response.statusText || '参数不正确');
        break;
      case 500:
        Notify(response.statusText || '服务500');
        // 服务端错误
        break;
      case 502:
        Notify(response.statusText || '服务502');
        // 服务端错误
        break;
      default:
        break;
    }
    if (errorCode.includes(response.status)) return false;
    // 超时重新请求
    const config = error.config;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [1, 1000];

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.__retryCount++;
      // 创造新的Promise来处理指数后退
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config);
      });
    }
    return Promise.reject(response || { message: error.message });
  }
);

export default instance;
