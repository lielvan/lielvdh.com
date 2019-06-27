export default {
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
  // CHAPTERS
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
  // MOTOS
  motos(state, motos) {
    state.motos = motos
  },
  add_moto(state, moto) {
    state.totalMotos = state.motos.push(moto)
  },
  total_motos(state, length) {
    state.totalMotos = length
  }
}