export default {
  isLoggedIn: state => !!state.user,
  authStatus: state => state.status
}