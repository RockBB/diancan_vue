import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart:{
      count:0,
    },
    user:{
      money:0,
    },
  },
  mutations: {
    addcart(state,data){
      state.cart.count = data;
    },
    newmoney(state,data){
      state.user.money = data;
    }
  }
});
