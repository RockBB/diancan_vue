import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  // 数据仓库,类似vue里面的data
  state: {
    // 购物车数据
    cart:{
      count:0,
    }
  },
  // 数据操作方法,类似vue里面的methods
  mutations: {

  }
});
