import axios from 'axios';

const url = '/api/';

const state = {
  generals: [],
  totalGenerals: 0
}

const getters = {}

const actions = {
  // Get Generals
  async getGenerals({commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}general`),
              data = res.data,
              generals = data.map(general => ({
                          ...general,
                          createdAt: new Date(general.createdAt)
                        }));
        commit('generals', generals);
        commit('total_generals', generals.length);
        resolve(generals);
      } catch(err) {
        reject(err);
      }
    })
  },
  // Add General
  async addGeneral({commit}, general) {
    return await axios.post(`${url}general`, general)
            .then((response) => {
              commit('add_general', response.data);
            })
            .catch(err => {})
  },
  // Edit General
  async editGeneral({commit}, {id, general}) {
    return await axios.put(`${url}general/${id}`, general)
            .then((response) => {
              commit('edit_general', response.data);
            })
            .catch(err => {})
  },
  // Delete General
  async deleteGeneral({commit}, id) {
    return axios.delete(`${url}general/${id}`)
            .then((response) => {
              commit('delete_general', response.data);
            })
            .catch(err => {})
  },
}

const mutations = {
  generals(state, generals) {
    state.generals = generals
  },
  add_general(state, general) {
    state.totalGenerals = state.generals.push(general)
  },
  edit_general(state, general) {
    state.generals.splice(state.generals.indexOf(general._id), 1, general)
  },
  delete_general(state, general) {
    state.generals.splice(state.generals.indexOf(general._id), 1)
    state.totalGenerals -= 1;
  },
  total_generals(state, length) {
    state.totalGenerals = length
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}