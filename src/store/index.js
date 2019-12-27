import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  // 数据仓库,类似vue里面的data
  state: {
    // 购物车数据
    cart:{
      count:0,
    },
    user:{
      money:0,
    },
  },
  // 数据操作方法,类似vue里面的methods
  mutations: {
    // data是调用方法,传递的购物车相关的参数
    addcart(state,data){
      // 修改商品课程的总数
      state.cart.count = data.count;
      // state.cart.course_list = data.course_list;
    }
  }
});
