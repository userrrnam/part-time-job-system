import axios from 'axios';
import { getToken } from './storage';
import { message } from "ant-design-vue";
import router from '@/router'
// axios 配置
const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Token': getToken(),
  },
  timeout: 10000,
  baseURL: 'http://192.168.110.241:8080/', //接口请求地址
})
// 添加请求拦截器
instance.interceptors.request.use(config => {
  let token = getToken();
  if (token) {
    config.headers['Access-Token'] = token;
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(res => {
  // 对响应数据做点什么
  const result = res?.data;
  //判断状态code是否为指定数值(200).
  if (res.status !== 200) {
    message.error({
      content: result.errorMsg,
      duration: 1
    })
  }
  return result;
}, error => {
  // 对响应错误做点什么
  if (error.message ?.indexOf('Network Error') !== -1) {
    message.error("请求超时, 请检查网络!");
  }
  if (error.response) {
    if (error.response.status === 401) {
      router.replace('/user/login');
      message.error('登录过期，重新登录!', 1);
    } else {
       const { errorMsg } = error.response.data;
      message.error({ content: errorMsg, duration: 1 });
    }
  }
  return error;
});

export function post(url, data) {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export function get(url, data) {
  return new Promise((resolve, reject) => { 
      instance({
        method: 'get',
        url,
        params: data,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err);
      })
    })
}

export default instance;