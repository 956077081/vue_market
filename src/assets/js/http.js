import {STATIC_CONFIG} from "./config";
import axios from "axios";
import store from "../../store";
import {getToken} from "./auth";
import Qs from 'qs'

axios.defaults.timeout = 60000;//#超时等待时间
// axios 响应拦截
axios.interceptors.response.use(res => {
  return Promise.resolve();
}, error => {
  console.log("请求失败！")
  return Promise.reject(error);
})
// axios 请求拦截器
axios.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})
Promise.prototype.finally = function (callback) {
  let pro = this.constructor;
  return this.then(value => {
    pro.resolve(callback()).then(() => value)
  }, reject => {
    console.log("异步失败！");
    pro.resolve(callback()).then(() => {
      throw reject
    })
  })
}
// 创建axios实例
const service = axios.create({
  baseURL: STATIC_CONFIG.server, // api的base_url
  timeout: 15000 // 请求超时时间
})


const post = function (url, param = {}, files) {
  return new Promise(((resolve, reject) => {
    let headers = {'Content-Type': 'application/json;charset=UTF-8'};
    // let headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    let fileparam = {};
    if (files && files.length > 0) {
      // headers = {'Content-Type': 'multipart/form-data'};
      files.forEach(file => {
        fileparam[file.name] = file;
      })
    }
    param = {...param, ...fileparam};
    service({
      method: 'post',
      url: url,
      data: param,
    }).then(res => {
      resolve(res.data);//成功失败！
    }).catch(err => {
      reject(err);//失败！
    })
  }))
}

const postMgr = function (url, params = {}, files) {
  return post(url, params, files);
}
export {
  postMgr
}
