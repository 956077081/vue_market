import {Message} from "view-design";
export function showloading() {
  let mess= Message.loading({
    content:'加载中...',
    background: true,
  })
  // setTimeout(mess.asd,6000);
}
export function closeLoading() {
  Message.destroy();
}
