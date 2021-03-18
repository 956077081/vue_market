import main from "../views/index/main";
import login from "../views/index/login";
import custDetails from "../views/cust/custDetails";
import custManager from "../views/cust/custManager";
import claimMess from "../views/head/claimMess";
import Vue from "vue";
import VueRouter from "vue-router";
import custView from "../views/cust/custView";
import contractManager from "../views/contracts/contractManager";
import contractDetails from "../views/contracts/contractDetails";
import contractView from "../views/contracts/contractView";
import error from "../views/index/error";
import employeeManager from "../views/system/employeeManager";

Vue.use(VueRouter)

const routers = [
  {
    "path": '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/error',
    name: 'error',
    component: error
  },
  {
    path: '/',
    name: 'admin',
    component: main,
    redirect: '/claimMess',
    children: [{
      path: '/claimMess',
      name: 'claimMess',
      component: () => import('@/views/head/claimMess'),
    }]
  },
  {
    path: '/cust',
    name: 'cust',
    component: main,
    redirect: '/cust/custmanager',
    children: [
      {
        path: 'custmanager',
        name: 'custmanager',
        component: custManager
      }, {
        path: 'custDetails',
        name: 'custDetails',
        component: custDetails
      },
      {
        path: 'custView',
        name: 'custView',
        component: custView
      }
    ]
  },{
    path: "/contract",
    name: 'contract',
    component: main,
    redirect: '/contract/contractManager',
    children: [
      {
        path: 'contractManager',
        name: 'contractManager',
        component: contractManager
      },
      {
        path: 'contractDetails',
        name: 'contractDetails',
        component: contractDetails
      },
      {
        path: 'contractView',
        name: 'contractView',
        component: contractView
      }
    ]
  },
  {
    path: '/employee',
    name: 'employee',
    component: main,
    redirect: employeeManager,
    children: [
      {
        path: 'employeeManager',
        name: 'employeeManager',
        component: employeeManager
      }
    ]
  }

]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const Router = new VueRouter({
  routes: routers
})

export default Router;

