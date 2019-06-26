export default {
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
  chapters(state, chapters) {
    state.chapters = chapters
  },
  motos(state, motos) {
    state.motos = motos
  },
  total_chapters(state, length) {
    state.totalChapters = length
  },
  total_motos(state, length) {
    state.totalMotos = length
  }
}