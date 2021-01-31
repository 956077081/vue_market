import vuex from "vuex";
import Vue from 'vue'
import userInfo from "./user";
import getters from "./getters";
Vue.use(vuex)//store 必须在加载vuex后创建
const store =new vuex.Store({
  modules:{
    userInfo
  },
  getters
})
export default store;
