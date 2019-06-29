import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios';
import chapters from './modules/chapters';
import motos from './modules/motos';
import auth from './modules/auth';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    chapters,
    motos,
    auth
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;