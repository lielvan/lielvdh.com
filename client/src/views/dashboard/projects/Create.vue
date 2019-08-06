<template>
  <div>
    <h1>CREATE FORM GOES HERE</h1>

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
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newProject.code_image" placeholder="Code Image">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newProject.gif_image" placeholder="GIF Image">
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
      newProject: {
        title: '',
        github_link: '',
        text: '',
        language: '',
        code_image: '',
        gif_image: '',
      }
    }
  },
  methods: {
    createProject() {
      this.$store.dispatch('projects/addProject', this.newProject)
        .then(() => {
          this.$router.push('/dashboard/projects')
        })
    },
    resetForm() {
      this.newProject.title = ''
      this.newProject.github_link = ''
      this.newProject.text = ''
      this.newProject.language = ''
      this.newProject.code_image = ''
      this.newProject.gif_image = ''
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
