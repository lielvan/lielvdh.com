<template>
  <div>
    <h1 class="dashboard-title">Create Form</h1>

    <form @submit.prevent="createProject">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newProject.title" placeholder="Title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newProject.github_link" placeholder="GitHub Link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newProject.language" placeholder="Programming Language">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="text" id="text" rows="10" v-model="newProject.text" placeholder="Text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-fifth">
          <img v-if="codeImageURL" :src="codeImageURL">
          <span id="NoImage" v-else>No Image To Display</span>
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="code_image" ref="code_image" @change="handleFileUpload($event, 'code')" placeholder="Code Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a code image…</span>
              </span>
              <span class="file-name">{{ this.newProject.code_image }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-fifth">
          <img v-if="gifImageURL" :src="gifImageURL">
          <span id="NoImage" v-else>No GIF To Display</span>
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="gif_image" ref="gif_image" @change="handleFileUpload($event, 'gif')" placeholder="GIF Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a GIF...</span>
              </span>
              <span class="file-name">{{ this.newProject.gif_image }}</span>
            </label>
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
  name: 'project-new',
  data() {
    return {
      formData: new FormData(),
      newProject: {
        title: '',
        github_link: '',
        text: '',
        language: '',
        code_image: 'No Image',
        gif_image: 'No GIF',
      },
      codeImageURL: null,
      gifImageURL: null
    }
  },
  methods: {
    handleFileUpload(event, type) {
      let image = event.target.files[0];
      console.log(image);
      if(type === 'code') {
        this.codeImageURL = URL.createObjectURL(image);
        this.newProject.code_image = image.name;
        this.formData.set('code_image', image);
      }
      if(type === 'gif') {
        this.gifImageURL = URL.createObjectURL(image);
        this.newProject.gif_image = image.name;
        this.formData.set('gif_image', image);
      }
    },
    createProject() {
      this.formData.append('title', this.newProject.title);
      this.formData.append('github_link', this.newProject.github_link);
      this.formData.append('text', this.newProject.text);
      this.formData.append('language', this.newProject.language);

      this.$store.dispatch('projects/addProject', this.formData)
        .then(() => {
          this.$router.push('/dashboard/projects')
        })
    },
    resetForm() {
      this.newProject.title = ''
      this.newProject.github_link = ''
      this.newProject.text = ''
      this.newProject.language = ''
      this.newProject.code_image = 'No Image'
      this.newProject.gif_image = 'No GIF'
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
