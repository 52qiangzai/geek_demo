import axios from "axios";
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
import { getToken } from "./token";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASEURL, // url = base url + request url
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
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
