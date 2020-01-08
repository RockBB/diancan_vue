import Vue from "vue"
import Router from "vue-router"

import Home from "../components/Home"
import Login from "../components/Login"
import Register from '../components/Register'
import Foods from '../components/Foods'
import Cart from '../components/Cart'
import Order from '../components/Order'
import UserOrder from '../components/UserOrder'
Vue.use(Router);

export default new Router({
  mode: "history",
  routes:[
    {
      name:"Home",
      path: "/",
      component: Home,
    },{
      name:"Home",
      path: "/home",
      component: Home,
    },
    {
     name:"Login",
     path:"/login",
     component: Login,
   },
    {
      path: "/register",
      name: "Register",
      component:Register,
    },
    {
      path: "/foods",
      name: "Foods",
      component:Foods,
    },
    {
      path: "/cart",
      name: "Cart",
      component:Cart,
    },
    {
       path:"/orders/:order",
      name: "Order",
      component:Order,
    },
    {
      name:"UserOrder",
      path:"/my/order",
      component: UserOrder,
    },
  ]
})
