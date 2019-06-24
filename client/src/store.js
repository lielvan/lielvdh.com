import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: '',
    user: ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, user) {
      state.status = 'success',
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = '',
      state.user = ''
    }
  },
  actions: {
    async login({commit}, data) {
      try {
        commit('auth_request');
        let response = await AuthService.login(data);
        const user = response.data.user;
        commit('auth_success', user);
      } catch (error) {
        commit('auth_error', error);
      }
    },
    async logout({commit}) {
      try {
        commit('logout');
        await AuthService.logout();
      } catch (error) {}
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    authStatus: state => state.status
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;