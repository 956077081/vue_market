import {getToken, removeToken, setToken} from "../assets/js/auth";
import {postMgr} from "../assets/js/http";

const userInfo = {
  state: {
    user: {
      userCode: '',
      userName:''
    },
    token: getToken(),
    menus:[]
  },
  mutations: {
    updateUserInfo(state, userinfo = {}) {
      if (Object.keys(userinfo).length != 0) {
        state.user = {...state.user, userinfo};
      } else {
        state.user = {};
        sessionStorage.clear();//清空本地用户
      }
    },
    SET_TOKEN(state, tokenstr) {
      state.token = tokenstr;
    },
    SET_USERCODE(state, usercode) {
      state.user.userCode = usercode;
    },
    SET_USERNAME(state, userName) {
      state.user.userName = userName;
    },
    SET_MENUS(state,menus){
      state.user.menus=menus;
    }
  },
  actions: {
    Login({commit}, userinfo) {
      return  postMgr("/admin/login", userinfo).then(res => {
        let tokenstr = res.data.tokenHead + res.data.token;
        commit("SET_TOKEN", tokenstr);//vuex 保存usertoken
        setToken(tokenstr);

      })
    },
    getUserInfo({commit}) {
      return  postMgr("/admin/userinfo").then(res => {
        commit('SET_USERCODE', res.data.userCode);
        commit('SET_USERNAME', res.data.userName);
      })
    },
    loginOut({commit, state}) {
      commit('SET_TOKEN','');
      commit('SET_USERCODE','');
      removeToken();
    }
  }
}

export default userInfo;
