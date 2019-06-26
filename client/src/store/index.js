import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;