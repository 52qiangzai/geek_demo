import router from "@/router";
import axios from "axios";
import nprogress from "nprogress";
import { Toast } from "vant";
// 引入进度条样式
import "nprogress/nprogress.css";
import { getToken, removeToken } from "./token";
// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  timeout: 20000, // request timeout
});

//请求拦截器：携带的token字段
service.interceptors.request.use(
  (config) => {
    let res = getToken();
    if (res) {
      const { token } = JSON.parse(res);
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    nprogress.start();
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  (response) => {
    nprogress.done();
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error.response);
    switch (error.response.status) {
      case 401:
        Toast.fail("请登录后操作");
        router.replace({
          name: "login",
        });
        break;
      case 500:
        Toast.fail("登录失效，请重新登录");
        removeToken();
        router.replace({
          name: "login",
        });
        break;
    }
    return Promise.reject(error);
  }
);

export default service;
