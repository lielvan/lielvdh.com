<template>
  <div>
    <h1 class="dashboard-title">{{ title }} Form</h1>

    <form @submit.prevent="submit">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title">Title</label>
          <div class="control">
            <input class="input" type="text" name="title" v-model="chapter.title" placeholder="Title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="title_link">Link URL</label>
          <div class="control">
            <input class="input" type="text" name="title_link" v-model="chapter.title_link" placeholder="Title Link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="subtitle">Subtitle</label>
          <div class="control">
            <input class="input" type="text" name="subtitle" v-model="chapter.subtitle" placeholder="Subtitle">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="label has-text-light" for="text">Chapter Text</label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="text" id="text" rows="10" v-model="chapter.text" placeholder="Text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column image-wrapper is-one-fifth">
          <img v-if="imageURL" :src="imageURL">
          <img v-else-if="this.chapter.image" :src="'/images/chapters/' + this.chapter.image" alt="No Image">
          <span v-else id="NoImage">No Image To Display</span>
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="image" ref="image" @change="handleFileUpload($event)" placeholder="Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose an image…</span>
              </span>
              <span class="file-name">{{ this.chapter.image !== '' ? this.chapter.image : 'No Image' }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="location">Location</label>
          <div class="control">
            <input class="input" type="text" name="location" v-model="chapter.location" placeholder="Location">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="label has-text-light" for="time_frame">Time Frame</label>
          <div class="control">
            <input class="input" type="text" name="time_frame" v-model="chapter.time_frame" placeholder="Time Frame">
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control has-text-centered">
          <button class="button is-link" type="submit">{{ title }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex'

export default {
  props: {
    title: {
      type: String,
    },
    request_type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: new FormData(),
      chapter: {
        title: '',
        title_link: '',
        subtitle: '',
        text: '',
        image: '',
        location: '',
        time_frame: ''
      },
      imageURL: '',
      err: '',
    }
  },
  async mounted() {
    if(this.request_type === 'edit') {
      // Get chapter to edit
      await axios.get(`/api/chapters/${this.$route.params.id}/edit`)
        .then((response) => {
          this.chapter = response.data
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  methods: {
    submit(){
      this.formData.append('title', this.chapter.title);
      this.formData.append('title_link', this.chapter.title_link);
      this.formData.append('subtitle', this.chapter.subtitle);
      this.formData.append('text', this.chapter.text);
      this.formData.append('image', this.chapter.image);
      this.formData.append('location', this.chapter.location);
      this.formData.append('time_frame', this.chapter.time_frame);

      if(this.request_type === 'create') {
        this.$store.dispatch('chapters/addChapter', this.formData)
          .then(() => {
            this.$router.push('/dashboard/chapters');
          })
      } else if(this.request_type === 'edit') {
        this.$store.dispatch('chapters/editChapter', { id: this.$route.params.id, chapter: this.formData })
          .then(() => {
            this.getChapters();
            this.$router.push('/dashboard/chapters');
          })
      } else {
        this.err = 'There seems to be an issue with the provided request type.';
      }
    },
    handleFileUpload(event) {
      let image = event.target.files[0];
      console.log(image);
      this.imageURL = URL.createObjectURL(image);
      this.chapter.image = image.name;
      this.formData.set('image', image);
    },
    ...mapActions('chapters', ['getChapters']),
    resetForm() {
      this.chapter.title = ''
      this.chapter.title_link = ''
      this.chapter.subtitle = ''
      this.chapter.text = ''
      this.chapter.image = 'No Image'
      this.chapter.location = ''
      this.chapter.time_frame = ''
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
