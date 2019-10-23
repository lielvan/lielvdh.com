<template>
  <div>
    <h1 class="dashboard-title">Edit Form</h1>

    <form @submit.prevent="editBook">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title">Title</label>
          <div class="control">
            <input class="input" type="text" name="title" v-model="book.title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="author">Author</label>
          <div class="control">
            <input class="input" type="text" name="author" v-model="book.author">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="label has-text-light" for="description">Description</label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="description" id="description" rows="10" v-model="book.description"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column image-wrapper is-one-fifth">
          <img v-if="imageURL" :src="imageURL">
          <img v-else :src="'/images/books/' + this.book.image" alt="No Image">
        </div>
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
          <label class="label has-text-light" for="isbn">ISBN</label>
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
      imageURL: null,
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
      this.imageURL = URL.createObjectURL(image);
      this.book.image = image.name;
      this.formData.set('image', image);
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
.image-wrapper img {
  max-height: 225px;
}
</style>
