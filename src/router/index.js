import Vue from "vue"
import Router from "vue-router"

// 这里导入可以让让用户访问的组件
// 后面这里引入可以被用户访问的页面组件
import Home from "../components/Home"
import Login from "../components/Login"
import Register from '../components/Register'
Vue.use(Router);

export default new Router({
  // 设置路由模式为‘history’，去掉默认的#
  mode: "history",
  routes:[
    // 路由列表
    {
      // name:"路由别名",
      name:"Home",
      // path: "路由地址",
      path: "/",
      // component: 组件类名,
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
  ]
})
