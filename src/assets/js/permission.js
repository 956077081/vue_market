import Router from "../../router";
import {getToken} from "./auth";
import store from "../../store";

const whiteList = ['/login'];
Router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path == '/login') {
      next({path: '/'})
    } else {
      if (store.getters.userCode) {
        next();//放行
      } else {
          store.dispatch('getUserInfo').then(res => {
          // next({ ...to, replace: true }) //替换路由
          next();//放行
        }).catch(res => {
            store.dispatch('loginOut').then(()=>{   //退出
              next({path: '/'})
            })
        })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) != -1) {//白名单 不需要token 直接跳转到login界面
      next();
    } else {
      next('/login');
    }
  }
})

Router.afterEach(() => {
})
