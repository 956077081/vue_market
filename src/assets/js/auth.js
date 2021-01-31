import Cookies from 'js-cookie'

const TokenKey = "loginToken";

function setToken(token) {
  return Cookies.set(TokenKey, token);
}

function getToken() {
  return Cookies.get(TokenKey);
}

function removeToken() {
  return Cookies.remove(TokenKey);
}
function setCookie(key,value,expires) {
    return Cookies.set(key,value,{expires: expires});
}
function getCookie(key){
  return Cookies.get(key);
}
export {setToken,getToken,removeToken,setCookie,getCookie}
