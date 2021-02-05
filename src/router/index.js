import login from "../components/index/login";
import main from "../components/index/main";
import custManager from "../components/cust/custManager";
const routers= [
    {
      path: '/',
      name: 'login',
      component: main
    },
  {
    path: '/cust',
    name: 'cust',
    component: custManager
  }
  ]
export default routers;

