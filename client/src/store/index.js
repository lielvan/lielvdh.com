import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios';
import projects from './modules/projects';
import chapters from './modules/chapters';
import books from './modules/books';
import motos from './modules/motos';
import auth from './modules/auth';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    projects,
    chapters,
    books,
    motos,
    auth
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;