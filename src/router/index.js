import main from "../views/index/main";
import login from "../views/index/login";
import custDetails from "../views/cust/custDetails";
import custManager from "../views/cust/custManager";
import marketManager from "../views/market/marketManager";
import markeDetails from "../views/market/markeDetails";
import claimMess from "../views/head/claimMess";
import dataAnaly from "../views/head/dataAnaly";
import Vue from "vue";
import VueRouter from "vue-router";
import custView from "../views/cust/custView";
import contractManager from "../views/contracts/contractManager";
import contractDetails from "../views/contracts/contractDetails";
import contractView from "../views/contracts/contractView";

Vue.use(VueRouter)

const routers = [
  {
    path: '/login',
    name: 'login',
    component: login,
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
  },
  {
    path: '/market',
    name: 'market',
    component: main,
    redirect: '/market/marketManager',
    children: [
      {
        path: 'marketManager',
        name: 'marketManager',
        component: marketManager
      },
      {
        path: 'marketDetails',
        name: 'marketDetails',
        component: markeDetails
      }
    ]
  },
  {
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
    path: '/head',
    name: 'head',
    component: main,
    children: [
      {
        path: 'dataAnaly',
        name: 'dataAnaly',
        component: dataAnaly
      }
    ]
  }

]

const Router = new VueRouter({
  routes: routers
})
export default Router;

