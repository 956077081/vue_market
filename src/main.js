// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import ivew from 'view-design'
import locale from 'view-design/dist/locale/zh-CN';

import VueRouter from 'vue-router'
import 'view-design/dist/styles/iview.css';
import {postMgr} from "./assets/js/http";
import './assets/global.css'
import store from "./store";
Vue.config.productionTip = false
Vue.use(ivew,{locale})
Vue.use(VueRouter)
Vue.prototype.$postMgr =postMgr

const Router = new VueRouter({
  routes: routers
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:Router,
  store:store,
  components: { App },
  template: '<App/>'
})
