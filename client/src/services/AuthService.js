import axios from 'axios';

const url = 'api/';

class AuthService {
  static login(data) {
    return axios.post(`${url}login`, data, { withCredentials: true });
  }

  static logout() {
    return axios.get(`${url}logout`);
  }

  static getUser() {
    return axios.get(`${url}user`, { withCredentials: true });
  }
}

export default AuthService;