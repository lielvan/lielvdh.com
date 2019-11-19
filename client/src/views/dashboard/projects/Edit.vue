<template>
  <div>
    <h1 class="dashboard-title">Edit Form</h1>

    <form @submit.prevent="editProject">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.github_link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.language">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="text" id="text" rows="10" v-model="project.text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-fifth">
          <img v-if="codeImageURL" :src="codeImageURL">
          <img v-else :src="'/images/projects/' + this.project.code_image" alt="No Image">
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="code_image" ref="code_image" @change="handleFileUpload($event, 'code')" placeholder="Code Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a code image…</span>
              </span>
              <span class="file-name">{{ this.project.code_image }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-fifth">
          <img v-if="gifImageURL" :src="gifImageURL">
          <img v-else :src="'/images/projects/' + this.project.gif_image" alt="No GIF">
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="gif_image" ref="gif_image" @change="handleFileUpload($event, 'gif')" placeholder="GIF Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a GIF...</span>
              </span>
              <span class="file-name">{{ this.project.gif_image }}</span>
            </label>
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
  name: 'project-edit',
  data() {
    return {
      formData: new FormData(),
      project: {},
      error: '',
      codeImageURL: null,
      gifImageURL: null
    }
  },
  async mounted() {
    // Get project to edit
    await axios.get(`/api/projects/${this.$route.params.id}/edit`)
      .then((response) => {
        this.project = response.data
      })
      .catch(err => {
        this.error = err
      })
  },
  methods: {
    handleFileUpload(event, type) {
      let image = event.target.files[0];
      console.log(image);
      if(type === 'code') {
        this.codeImageURL = URL.createObjectURL(image);
        this.project.code_image = image.name;
        this.formData.set('code_image', image);
      }
      if(type === 'gif') {
        this.gifImageURL = URL.createObjectURL(image);
        this.project.gif_image = image.name;
        this.formData.set('gif_image', image);
      }
    },
    editProject() {
      this.formData.append('title', this.project.title);
      this.formData.append('github_link', this.project.github_link);
      this.formData.append('text', this.project.text);
      this.formData.append('language', this.project.language);

      this.$store.dispatch('projects/editProject', { id: this.$route.params.id, project: this.formData })
        .then(() => {
          this.$router.push('/dashboard/projects')
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
