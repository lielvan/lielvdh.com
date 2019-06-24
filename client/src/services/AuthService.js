import axios from 'axios';

const url = 'api/';

class AuthService {
  static login(data) { // REMOVE
    return axios.post(`${url}login`, data, { withCredentials: true });
  }

  static logout() { // REMOVE
    return axios.get(`${url}logout`);
  }

  static getUser() {
    return axios.get(`${url}user`, { withCredentials: true });
  }
}

export default AuthService;