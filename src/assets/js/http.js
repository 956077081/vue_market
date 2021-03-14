import {STATIC_CONFIG} from "./config";
import axios from "axios";
import store from "../../store";
import {getToken, removeToken} from "./auth";
import {closeLoading, showloading} from "./common";
// 创建axios实例
const service = axios.create({
  baseURL: STATIC_CONFIG.server, // api的base_url
  // timeout: 15000 // 请求超时时间
})

// 请求执行顺序 先加载Promise的finally-》 service.interceptors.request-》service.interceptors.response-》axios.then
// axios 响应拦截
service.interceptors.response.use(resp => {
  const  res= resp.data;
  if(res.code != 200){
    return Promise.reject(resp);
  }
  if(res.code== 401){//登录过期
      this.$Message.info({
        content:'您的登录时间已过期请重新登录',
        duration:3,
        background: true
      })
      this.$store.loginOut();
  }
  return Promise.resolve(resp.data);
}, error => {
  console.log("响应失败！",error);
  return Promise.reject(error.data);
})
// axios 请求拦截器
service.interceptors.request.use(config => {
  config.headers['COMPCODE']=window.sessionStorage.getItem('COMPCODE');
  if (store.getters.token) {
    config.headers['Authorization'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log("请求失败",error) // for debug
  return Promise.reject(error)
})
// Promise.prototype.finally = function (callback) {
//   console.log(callback)
//   let pro = this.constructor;
//   return this.then(value => {
//     pro.resolve(callback()).then(() => value)
//   }, reject => {
//     console.log("异步失败！",reject);
//     pro.resolve(callback()).then(() => {
//       throw reject
//     })
//   })
// }
const post = function (url, param = {},action, files) {
  return new Promise(((resolve, reject) => {
    let fileparam = {};
    if (files && files.length > 0) {
      // headers = {'Content-Type': 'multipart/form-data'};
      files.forEach(file => {
        fileparam[file.name] = file;
      })
    }
    let method ='post';
    let param1 ={};
    if(action){
      method =action;
      param1 = param;
    }else{
      param1 = {...param, ...fileparam};
    }
    closeLoading();//先关闭
    showloading();//在开启
    service({
      method: method,
      url: url,
      data: param1,
      params:param1
    }).then(res => {
      closeLoading();
      resolve(res);//成功！
    }).catch(err => {
      closeLoading();
      reject(err);//失败！
    })
  }))
}

const postMgr = function (url, params = {}, action,files) {
  return post(url, params,action ,files);
}
export {
  postMgr
}
