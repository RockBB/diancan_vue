// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index';
// elementUI 导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
// 调用插件
//Vue.use(ElementUI);
Vue.use(ElementUI, { locale });

import axios from 'axios'
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

// 手动的自定义全局配置
import settings from "./settings"
Vue.prototype.$settings = settings;

Vue.config.productionTip = false;

import store from './store/index';
// Vue.prototype.$store = store;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
