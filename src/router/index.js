import main from "../views/index/main";
import login from "../views/index/login";
const routers= [
    {
      path: '/',
      name: 'login',
      component: login,

    },
  {
    path: '/11',
    name: 'admin',
    component: main,
    children: [{
      path: 'cust',
      name: 'cust',
      component: () => import('@/views/cust/custManager'),
    }]
  }
  ]
export default routers;

