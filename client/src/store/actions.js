import axios from 'axios';

const url = '/api/';
// TODO - Refactor actions to separate files
export default {
  // Login
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
  // Logout
  async logout({commit}) {
    commit('logout');
    await axios.get(`${url}/logout`);
  },
  // Get Chapters
  async getChapters({commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}chapters`),
              data = res.data,
              chapters = data.map(chapter => ({
                          ...chapter,
                          createdAt: new Date(chapter.createdAt)
                        }));
        commit('chapters', chapters);
        commit('total_chapters', chapters.length);
        resolve(chapters);
      } catch(err) {
        reject(err);
      }
    })
  },
  // Get Motos
  async getMotos({commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}motos`),
              data = res.data,
              motos = data.map(moto => ({
                          ...moto,
                          createdAt: new Date(moto.createdAt)
                        }));
        commit('motos', motos);
        commit('total_motos', motos.length);
        resolve(motos);
      } catch(err) {
        reject(err);
      }
    })
  }
}