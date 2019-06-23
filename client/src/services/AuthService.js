import axios from 'axios';

const url = 'api/';

class AuthService {
  static login(data) {
    return axios.post(`${url}/login`, data, { withCredentials: true });
  }
}

export default AuthService;