<template>
  <div>
    <h1 class="dashboard-title">{{ title }} Form</h1>

    <form enctype="multipart/form-data" @submit.prevent="submit">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title">Title</label>
          <div class="control">
            <input class="input" type="text" name="title" v-model="book.title" placeholder="Title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="author">Author</label>
          <div class="control">
            <input class="input" type="text" name="author" v-model="book.author" placeholder="Author">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="label has-text-light" for="description">Description</label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="description" id="description" rows="10" v-model="book.description" placeholder="Description"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column image-wrapper is-one-fifth">
          <!-- Check if 'image' exists and display it if so. If not, show span -->
          <img v-if="imageURL" :src="imageURL">
          <img v-else-if="this.book.image" :src="`https://s3.amazonaws.com/${awsS3Bucket}/books/${this.book.image}`" alt="No Image">
          <span v-else id="NoImage">No Image To Display</span>
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="image" @change="handleFileUpload($event)" placeholder="Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose an image…</span>
              </span>
              <span class="file-name">{{ this.book.image !== '' ? this.book.image : 'No Image' }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="isbn">ISBN</label>
          <div class="control">
            <input class="input" type="text" name="isbn" v-model="book.isbn" placeholder="ISBN #">
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
import axios from 'axios';
import { mapActions } from 'vuex';
import awsS3 from '@/assets/js/aws_s3.js';

export default {
  props: {
    title: {
      type: String
    },
    request_type: {
      type: String,
      required: true
    },
  },
  async mounted() {
    if(this.request_type === 'edit') {
      // Get book entry from db to edit
      await axios.get(`/api/books/${this.$route.params.id}/edit`)
        .then((response) => {
          this.book = response.data
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  data() {
    return {
      book: {
        title: '',
        author: '',
        description: '',
        image: '',
        isbn: '',
      },
      imageURL: '',
      err: '',
      awsS3Bucket: process.env.VUE_APP_S3_BUCKET,
    }
  },
  methods: {
    submit() {
      if(this.request_type === 'create'){
        this.$store.dispatch('books/addBook', this.book)
        .then(() => {
          this.$router.push('/dashboard/books');
        })
      } else if(this.request_type === 'edit'){
        this.$store.dispatch('books/editBook', { id: this.$route.params.id, book: this.book })
        .then(() => {
          this.getBooks();
          this.$router.push('/dashboard/books');
        })
      } else {
        this.err = 'There seems to be an issue with the provided request type.';
      }
    },
    /*
      Use Javascript URL core object helper to create image preview.
      Then, upload file(image) to AWS S3 bucket.
    */
    handleFileUpload(event) {
      let image = event.target.files[0];
      console.log(image);
      this.imageURL = URL.createObjectURL(image);
      let s3_folder = 'books';
      awsS3.getSignedRequest(image, s3_folder);
      this.book.image = encodeURIComponent(image.name);
    },
    ...mapActions('books', ['getBooks']),
    resetForm() {
      this.book.title = ''
      this.book.author = ''
      this.book.description = ''
      this.book.image = ''
      this.book.isbn = ''
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
.image-wrapper img {
  max-height: 225px;
}
#NoImage {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
