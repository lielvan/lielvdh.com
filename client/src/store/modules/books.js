import axios from 'axios';

const url = '/api/';

const state = {
  books: [],
  totalBooks: 0
}

const getters = {}

const actions = {
  // Get Books
  async getBooks({commit}) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}books`),
              data = res.data,
              books = data.map(book => ({
                          ...book,
                          createdAt: new Date(book.createdAt)
                        }));
        commit('books', books);
        commit('total_books', books.length);
        resolve(books);
      } catch(err) {
        reject(err);
      }
    })
  },
  // Add Book
  async addBook({commit}, book) {
    return await axios.post(`${url}books`, book)
            .then((response) => {
              commit('add_book', response.data);
            })
            .catch(err => {})
  },
  // Edit Book
  async editBook({commit}, {id, book}) {
    return await axios.put(`${url}books/${id}`, book)
            .then((response) => {
              commit('edit_book', response.data);
            })
            .catch(err => {})
  },
  // Delete Book
  async deleteBook({commit}, id) {
    return axios.delete(`${url}books/${id}`)
            .then((response) => {
              commit('delete_book', response.data);
            })
            .catch(err => {})
  },
}

const mutations = {
  books(state, books) {
    state.books = books
  },
  add_book(state, book) {
    state.totalBooks = state.books.push(book)
  },
  edit_book(state, book) {
    state.books.splice(state.books.indexOf(book._id), 1, book)
  },
  delete_book(state, book) {
    state.books.splice(state.books.indexOf(book._id), 1)
    state.totalBooks -= 1;
  },
  total_books(state, length) {
    state.totalBooks = length
  }
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}