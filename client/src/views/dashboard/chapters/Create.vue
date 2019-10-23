<template>
  <div>
    <h1 class="dashboard-title">Create Form</h1>

    <form @submit.prevent="createChapter">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title">Title</label>
          <div class="control">
            <input class="input" type="text" name="title" v-model="newChapter.title" placeholder="Title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title_link">Link URL</label>
          <div class="control">
            <input class="input" type="text" name="title_link" v-model="newChapter.title_link" placeholder="Title Link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="subtitle">Subtitle</label>
          <div class="control">
            <input class="input" type="text" name="subtitle" v-model="newChapter.subtitle" placeholder="Subtitle">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="label has-text-light" for="text">Chapter Text</label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="text" id="text" rows="10" v-model="newChapter.text" placeholder="Text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-fifth">
          <img v-if="newImageURL" :src="newImageURL">
          <span id="NoImage" v-else>No Image To Display</span>
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="image" ref="image" @change="handleFileUpload($event)" placeholder="Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose an image…</span>
              </span>
              <span class="file-name">{{ this.newChapter.image }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="location">Location</label>
          <div class="control">
            <input class="input" type="text" name="location" v-model="newChapter.location" placeholder="Location">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="time_frame">Time Frame</label>
          <div class="control">
            <input class="input" type="text" name="time_frame" v-model="newChapter.time_frame" placeholder="Time Frame">
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
      formData: new FormData(),
      newChapter: {
        title: '',
        title_link: '',
        subtitle: '',
        text: '',
        image: 'No Image',
        location: '',
        time_frame: ''
      },
      newImageURL: null,
    }
  },
  methods: {
    handleFileUpload(event) {
      let image = event.target.files[0];
      console.log(image);
      this.newImageURL = URL.createObjectURL(image);
      this.newChapter.image = image.name;
      this.formData.set('image', image);
    },
    createChapter() {
      this.formData.append('title', this.newChapter.title);
      this.formData.append('title_link', this.newChapter.title_link);
      this.formData.append('subtitle', this.newChapter.subtitle);
      this.formData.append('text', this.newChapter.text);
      this.formData.append('location', this.newChapter.location);
      this.formData.append('time_frame', this.newChapter.time_frame);

      this.$store.dispatch('chapters/addChapter', this.formData)
        .then(() => {
          this.$router.push('/dashboard/chapters')
        })
    },
    resetForm() {
      this.newChapter.title = ''
      this.newChapter.title_link = ''
      this.newChapter.subtitle = ''
      this.newChapter.text = ''
      this.newChapter.image = 'No Image'
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
