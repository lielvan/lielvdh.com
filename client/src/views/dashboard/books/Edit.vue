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
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="image" ref="image" @change="handleFileUpload($event)" placeholder="Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose an image…</span>
              </span>
              <span class="file-name">{{ this.book.image }}</span>
            </label>
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
      formData: new FormData(),
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
    handleFileUpload(event) {
      let image = event.target.files[0];
      console.log(image);
      this.book.image = image.name;
      this.formData.append('image', image);
    },
    editBook() {
      this.formData.append('title', this.book.title);
      this.formData.append('author', this.book.author);
      this.formData.append('description', this.book.description);
      this.formData.append('isbn', this.book.isbn);
      
      this.$store.dispatch('books/editBook', { id: this.$route.params.id, book: this.formData })
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
