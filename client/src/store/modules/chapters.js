import axios from 'axios';

const url = '/api/';

const state = {
  chapters: [],
  totalChapters: 0
}

const getters = {}

const actions = {
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
  // Add Chapter
  async addChapter({commit}, chapter) {
    return await axios.post(`${url}chapters`, chapter)
            .then((response) => {
              // debugger;
              commit('add_chapter', response.data);
            })
            .catch(err => {})
  },
  // Edit Chapter
  async editChapter({commit}, {id, chapter}) {
    return await axios.put(`${url}chapters/${id}`, chapter)
            .then((response) => {
              commit('edit_chapter', response.data);
            })
            .catch(err => {})
  },
  // Delete Chapter
  async deleteChapter({commit}, id) {
    return axios.delete(`${url}chapters/${id}`)
            .then((response) => {
              commit('delete_chapter', response.data);
            })
            .catch(err => {})
  },
}

const mutations = {
  chapters(state, chapters) {
    state.chapters = chapters
  },
  add_chapter(state, chapter) {
    state.totalChapters = state.chapters.push(chapter)
  },
  edit_chapter(state, chapter) {
    state.chapters.splice(state.chapters.indexOf(chapter._id), 1, chapter)
  },
  delete_chapter(state, chapter) {
    state.chapters.splice(state.chapters.indexOf(chapter._id), 1)
    state.totalChapters -= 1;
  },
  total_chapters(state, length) {
    state.totalChapters = length
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}