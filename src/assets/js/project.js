import it from "element-ui/src/locale/lang/it";

export function setCompInfo(compinfo={}) {
  window.sessionStorage.setItem("compInfo",JSON.stringify(compinfo))
}
export function getCompInfo() {
  let item = window.sessionStorage.getItem("compInfo");
  return JSON.parse(item);
}
