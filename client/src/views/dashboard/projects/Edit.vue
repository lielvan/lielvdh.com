<template>
  <div>
    <h1>EDIT FORM GOES HERE</h1>
    <p>{{ $route.params.id }}</p>

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
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.code_image">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.gif_image">
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
      project: {},
      error: '',
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
    editProject() {
      this.$store.dispatch('projects/editProject', { id: this.$route.params.id, project: this.project })
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
