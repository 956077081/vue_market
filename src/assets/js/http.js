import {STATIC_CONFIG} from "./config";
import axios from "axios";
import store from "../../store";
import {getToken} from "./auth";
import {Message} from "view-design";
import da from "element-ui/src/locale/lang/da";
// 创建axios实例
const service = axios.create({
  baseURL: STATIC_CONFIG.server, // api的base_url
  // timeout: 15000 // 请求超时时间
})

// axios 响应拦截
service.interceptors.response.use(resp => {
  const  res= resp.data;
  if(res.code != 200){
    Message.info(res);
    return Promise.reject('error');
  }
  return Promise.resolve(resp.data);
}, error => {
  console.log("请求失败！")
  return Promise.reject(error);
})
// axios 请求拦截器
service.interceptors.request.use(config => {
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
    service({
      method: method,
      url: url,
      data: param1,
      params:param1
    }).then(res => {
      resolve(res);//成功失败！
    }).catch(err => {
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
