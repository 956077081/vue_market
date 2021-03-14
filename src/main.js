// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import ivew from 'view-design'
import locale from 'view-design/dist/locale/zh-CN'
import 'view-design/dist/styles/iview.css'
import './assets/global.css'
import  './assets/js/permission'
import {postMgr} from "./assets/js/http"
import store from "./store";
import {getDictLable} from "./assets/js/dict";
Vue.config.productionTip = false
Vue.use(ivew,{locale})
Vue.prototype.$postMgr =postMgr
Vue.prototype.$getDictLable =getDictLable

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:Router,
  store:store,
  components: { App },
  template: '<App/>'
})
