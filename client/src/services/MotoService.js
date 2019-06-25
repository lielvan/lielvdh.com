import axios from 'axios';

const url = '/api/motos/';

class MotoService {
  // Get Moto
  static getMotos() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(moto => ({
            ...moto,
            createdAt: new Date(moto.createdAt)
          }))
        );
      } catch(err) {
        reject(err);
      }
    })
  }

  // Create Moto
  static insertMoto(text) {
    return axios.post(url, {
      text
    });
  }

  // Delete Moto
  static deleteMoto(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default MotoService;