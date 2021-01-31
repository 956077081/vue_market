import {getToken, setToken} from "../assets/js/auth";
import {postMgr} from "../assets/js/http";

const userInfo = {
  state: {
    user: {
      userCode: '',
      userName: ''
    },
    token: getToken()
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
    SET_COOKIE(state, tokenstr) {
      state.token = tokenstr;
    }
  },
  actions: {
    Login({commit}, userinfo) {
      postMgr("/admin/login", userinfo).then(res => {
        let tokenstr = res.tokenHead + res.token;
        commit("SET_COOKIE",tokenstr);//vuex 保存usertoken
        setToken(tokenstr);
      })
    }
  }
}

export default userInfo;
