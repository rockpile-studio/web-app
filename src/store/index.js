import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations,
  actions,
  getters,
  modules: {}
})
