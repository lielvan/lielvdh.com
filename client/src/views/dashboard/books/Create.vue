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
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="image" ref="image" @change="handleFileUpload($event)" placeholder="Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose an image…</span>
              </span>
              <span class="file-name">{{ this.newBook.image }}</span>
            </label>
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
      formData: new FormData(),
      newBook: {
        title: '',
        author: '',
        description: '',
        image: 'No Image',
        isbn: '',
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      console.log(event.target.files[0]);
      this.formData.set('image', event.target.files[0]);
    },
    createBook() {
      this.formData.append('title', this.newBook.title);
      this.formData.append('author', this.newBook.author);
      this.formData.append('description', this.newBook.description);
      this.formData.append('isbn', this.newBook.isbn);

      this.$store.dispatch('books/addBook', this.formData)
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
.file .file-name {
  text-align: center;
}
</style>
