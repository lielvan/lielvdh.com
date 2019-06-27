<template>
  <div>
    <h1>CREATE FORM GOES HERE</h1>

    <form @submit.prevent="createChapter">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newChapter.title" placeholder="Title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newChapter.title_link" placeholder="Title Link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newChapter.subtitle" placeholder="Subtitle">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <textarea class="textarea is-info is-medium" name="text" id="text" v-model="newChapter.text" placeholder="Text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newChapter.image" placeholder="Image">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newChapter.location" placeholder="Location">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="newChapter.time_frame" placeholder="Time Frame">
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
  name: 'chapter-new',
  data() {
    return {
      newChapter: {
        title: '',
        title_link: '',
        subtitle: '',
        text: '',
        image: '',
        location: '',
        time_frame: ''
      }
    }
  },
  methods: {
    createChapter() {
      this.$store.dispatch('addChapter', this.newChapter)
        .then(() => {
          this.$router.push('/dashboard/chapters')
        })
    },
    resetForm() {
      this.newChapter.title = ''
      this.newChapter.title_link = ''
      this.newChapter.subtitle = ''
      this.newChapter.text = ''
      this.newChapter.image = ''
      this.newChapter.location = ''
      this.newChapter.time_frame = ''
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
