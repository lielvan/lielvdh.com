<template>
  <div>
    <h1>EDIT FORM GOES HERE</h1>
    <p>{{ $route.params.id }}</p>

    <form @submit.prevent="editChapter">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="chapter.title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="chapter.title_link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="chapter.subtitle">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="text" id="text" rows="10" v-model="chapter.text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="chapter.image">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="chapter.location">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="chapter.time_frame">
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
      chapter: {},
      error: '',
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
    editChapter() {
      this.$store.dispatch('editChapter', { id: this.$route.params.id, chapter: this.chapter })
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
