import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const url = 'api';
const store = new Vuex.Store({
  state: {
    status: '',
    user: '',
    error: '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading',
      state.error = ''
    },
    auth_success(state, user) {
      state.status = 'success',
      state.user = user
    },
    auth_error(state, error) {
      state.status = 'error',
      state.error = error
    },
    logout(state) {
      state.status = '',
      state.user = '',
      state.error = ''
    }
  },
  actions: {
    login({commit}, data) {
      commit('auth_request');
      return new Promise((resolve, reject) => {
        axios.post(`${url}/login`, data, { withCredentials: true })
          .then((response) => {
            const user = response.data.user;
            resolve(user);
            commit('auth_success', user);
          })
          .catch((err) => {
            const error = err.response.data.message;
            commit('auth_error', error);
            reject(error);
          })
      });
    },
    async logout({commit}) {
      commit('logout');
      await axios.get(`${url}/logout`);
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    authStatus: state => state.status
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;