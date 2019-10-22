<template>
  <div>
    <h1>CREATE FORM GOES HERE</h1>

    <form enctype="multipart/form-data" @submit.prevent="createBook">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="title"></label>
          <div class="control">
            <input class="input" type="text" name="title" v-model="newBook.title" placeholder="Title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="author"></label>
          <div class="control">
            <input class="input" type="text" name="author" v-model="newBook.author" placeholder="Author">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="description"></label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="description" id="description" rows="10" v-model="newBook.description" placeholder="Description"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="image"></label>
          <div class="control">
            <input class="input" type="file" name="image" ref="image" v-on:change="handleFileUpload()" placeholder="Image">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="isbn"></label>
          <div class="control">
            <input class="input" type="text" name="isbn" v-model="newBook.isbn" placeholder="ISBN #">
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control has-text-centered">
          <button class="button is-link" type="submit">Create</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'book-new',
  data() {
    return {
      newBook: {
        title: '',
        author: '',
        description: '',
        image: '',
        isbn: '',
      }
    }
  },
  methods: {
    handleFileUpload() {
      this.newBook.image = this.$refs.image;
    },
    createBook() {
      this.$store.dispatch('books/addBook', this.newBook)
        .then(() => {
          this.$router.push('/dashboard/books')
        })
    },
    resetForm() {
      this.newBook.title = ''
      this.newBook.author = ''
      this.newBook.description = ''
      this.newBook.image = ''
      this.newBook.isbn = ''
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
