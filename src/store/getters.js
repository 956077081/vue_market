import userInfo from "./user";

const getters = {
  token: state => state.userInfo.token,
  userCode: state => state.userInfo.user.userCode,
  userName: state => state.userInfo.user.userName
}
export default getters
