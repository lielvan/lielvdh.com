<template>
  <div class="dashboard-books-wrapper is-flex">
    <div class="table-top is-flex">
      <h1 class="is-flex is-size-4">Books</h1>
      <router-link class="button is-flex is-success" :to="{ name: 'new-book' }">New</router-link>
    </div>
    <table class="table is-bordered is-narrow is-striped">
      <thead>
        <tr class="table-head">
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Image</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" v-bind:index="index" v-bind:key="book._id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td width="55%">{{ book.description }}</td>
          <td>{{ book.image }}</td>
          <td>{{ book.isbn }}</td>
          <td>
            <div class="buttons are-small">
              <router-link class="button is-warning" :to="{ name: 'edit-book', params: { id: book._id }}">Edit</router-link>
              <button class="button is-danger" @click="deleteBook(book._id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'dashboard-books',
  computed: {
    ...mapState('books', ['books']),
  },
  methods: {
    ...mapActions('books', ['deleteBook'])
  }
}
</script>

<style>
.dashboard-books-wrapper {
  flex-direction: column;
}
.table-top {
  justify-content: space-between;
  margin: 1rem 0;
}
.table thead .table-head th {
  text-align: center;
  font-size: 1.1rem;
}
</style>
