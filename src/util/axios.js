import axios from 'axios';
import { getToken } from './storage';
import { message } from "ant-design-vue";
import { useRouter } from 'vue-router'
const router = useRouter();
// axios 配置
const instance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Token': getToken() || '',
  },
  timeout: 30000,
  baseURL: 'http://192.168.110.241:8080/', //接口请求地址
})
// 添加请求拦截器
instance.interceptors.request.use(config => {
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
  if (res.status === 401 || res.status === 403) {
    // 登录过期 跳转登录
    router.replace({
      path: '/user/login',
    });
  } else if (res.status === 200) {
    return result;
  } else {
    message.error({
      content: result.errorMsg,
      duration: 1
    })
  }
}, error => {
  // 对响应错误做点什么
  const { errorCode, errorMsg } = error.response.data;
  if (errorCode === 4) {
    router.replace('/user/login');
  }
  message.error({content: errorMsg, duration: 1});
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
  instance({
    method: 'get',
    url,
    params: data,
  }).then(res => {
    resolve(res)
  }).catch(err => {
    reject(err);
  })
}

export default instance;