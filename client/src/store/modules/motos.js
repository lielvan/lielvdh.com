import axios from 'axios';

const url = '/api/';

const state = {
  motos: [],
  totalMotos: 0
}

const getters = {}

const actions = {
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
  },
  // Add Moto
  async addMoto({commit}, moto) {
    return await axios.post(`${url}motos`, moto)
            .then((response) => {
              commit('add_moto', response.data);
            })
            .catch(err => {})
  },
  // Edit Moto
  async editMoto({commit}, {id, moto}) {
    return await axios.put(`${url}motos/${id}`, moto)
            .then((response) => {
              commit('edit_moto', response.data);
            })
            .catch(err => {})
  },
  // Delete Moto
  async deleteMoto({commit}, id) {
    return axios.delete(`${url}motos/${id}`)
            .then((response) => {
              commit('delete_moto', response.data);
            })
            .catch(err => {})
  },
}

const mutations = {
  motos(state, motos) {
    state.motos = motos
  },
  add_moto(state, moto) {
    state.totalMotos = state.motos.push(moto)
  },
  edit_moto(state, moto) {
    state.motos.splice(state.motos.indexOf(moto._id), 1, moto)
  },
  delete_moto(state, moto) {
    state.motos.splice(state.motos.indexOf(moto._id), 1)
    state.totalMotos -= 1;
  },
  total_motos(state, length) {
    state.totalMotos = length
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}