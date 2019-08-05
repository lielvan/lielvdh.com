import axios from 'axios';

const url = '/api/';

const state = {
  projects: [],
  totalProjects: 0
}

const getters = {}

const actions = {
  // Get Projects
  async getProjects({commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}projects`),
              data = res.data,
              projects = data.map(project => ({
                          ...project,
                          createdAt: new Date(project.createdAt)
                        }));
        commit('projects', projects);
        commit('total_projects', projects.length);
        resolve(projects);
      } catch(err) {
        reject(err);
      }
    })
  },
  // Add Project
  async addProject({commit}, project) {
    return await axios.post(`${url}projects`, project)
            .then((response) => {
              // debugger;
              commit('add_project', response.data);
            })
            .catch(err => {})
  },
  // Edit Project
  async editProject({commit}, {id, project}) {
    return await axios.put(`${url}projects/${id}`, project)
            .then((response) => {
              commit('edit_project', response.data);
            })
            .catch(err => {})
  },
  // Delete Project
  async deleteProject({commit}, id) {
    return axios.delete(`${url}projects/${id}`)
            .then((response) => {
              commit('delete_project', response.data);
            })
            .catch(err => {})
  },
}

const mutations = {
  projects(state, projects) {
    state.projects = projects
  },
  add_project(state, project) {
    state.totalProjects = state.projects.push(project)
  },
  edit_project(state, project) {
    state.projects.splice(state.projects.indexOf(project._id), 1, project)
  },
  delete_project(state, project) {
    state.projects.splice(state.projects.indexOf(project._id), 1)
    state.totalProjects -= 1;
  },
  total_projects(state, length) {
    state.totalProjects = length
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}