<template>
  <div>
    <h1 class="dashboard-title">Edit Form</h1>

    <form @submit.prevent="editChapter">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title">Title</label>
          <div class="control">
            <input class="input" type="text" name="title" v-model="chapter.title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title_link">Link URL</label>
          <div class="control">
            <input class="input" type="text" name="title_link" v-model="chapter.title_link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="subtitle">Subtitle</label>
          <div class="control">
            <input class="input" type="text" name="subtitle" v-model="chapter.subtitle">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="label has-text-light" for="text">Chapter Text</label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="text" id="text" rows="10" v-model="chapter.text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column image-wrapper is-one-fifth">
          <img v-if="imageURL" :src="imageURL">
          <img v-else :src="'/images/chapters/' + this.chapter.image" alt="No Image">
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="image" ref="image" @change="handleFileUpload($event)" placeholder="Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose an image…</span>
              </span>
              <span class="file-name">{{ this.chapter.image }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="location">Location</label>
          <div class="control">
            <input class="input" type="text" name="location" v-model="chapter.location">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="time_frame">Time Frame</label>
          <div class="control">
            <input class="input" type="text" name="time_frame" v-model="chapter.time_frame">
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
  name: 'chapter-edit',
  data() {
    return {
      formData: new FormData(),
      chapter: {},
      error: '',
      imageURL: null,
    }
  },
  async mounted() {
    // Get chapter to edit
    await axios.get(`/api/chapters/${this.$route.params.id}/edit`)
      .then((response) => {
        this.chapter = response.data
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
      this.chapter.image = image.name;
      this.formData.set('image', image);
    },
    editChapter() {
      this.formData.append('title', this.chapter.title);
      this.formData.append('title_link', this.chapter.title_link);
      this.formData.append('subtitle', this.chapter.subtitle);
      this.formData.append('text', this.chapter.text);
      this.formData.append('location', this.chapter.location);
      this.formData.append('time_frame', this.chapter.time_frame);

      this.$store.dispatch('chapters/editChapter', { id: this.$route.params.id, chapter: this.formData })
        .then(() => {
          this.$router.push('/dashboard/chapters')
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
