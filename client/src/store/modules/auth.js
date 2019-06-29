import axios from 'axios';

const url = '/api/';

const state = {
  status: '',
  error: '',
  user: ''
}

const getters = {
  isLoggedIn: state => !!state.user,
  authStatus: state => state.status
}

const actions = {
    // Login
    login({commit}, data) {
      commit('auth_request');
      return new Promise((resolve, reject) => {
        axios.post(`${url}login`, data, { withCredentials: true })
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
    // Logout
    async logout({commit}) {
      commit('logout');
      await axios.get(`${url}logout`);
    },
}

const mutations = {
  // AUTH
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
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}