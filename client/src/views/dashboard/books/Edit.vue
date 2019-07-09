<template>
  <div>
    <h1>EDIT FORM GOES HERE</h1>
    <p>{{ $route.params.id }}</p>

    <form @submit.prevent="editBook">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="title"></label>
          <div class="control">
            <input class="input" type="text" name="title" v-model="book.title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="author"></label>
          <div class="control">
            <input class="input" type="text" name="author" v-model="book.author">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="description"></label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="description" id="description" rows="10" v-model="book.description"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="image"></label>
          <div class="control">
            <input class="input" type="text" name="image" v-model="book.image">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="isbn"></label>
          <div class="control">
            <input class="input" type="text" name="isbn" v-model="book.isbn">
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control has-text-centered">
          <button class="button is-link" type="submit">Edit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'book-edit',
  data() {
    return {
      book: {},
      error: '',
    }
  },
  async mounted() {
    // Get book to edit
    await axios.get(`/api/books/${this.$route.params.id}/edit`)
      .then((response) => {
        this.book = response.data
      })
      .catch(err => {
        this.error = err
      })
  },
  methods: {
    editBook() {
      this.$store.dispatch('books/editBook', { id: this.$route.params.id, book: this.book })
        .then(() => {
          this.$router.push('/dashboard/books')
        })
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
