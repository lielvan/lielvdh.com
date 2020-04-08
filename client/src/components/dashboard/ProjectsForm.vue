<template>
  <div>
    <h1 class="dashboard-title">{{ title }} Form</h1>

    <form @submit.prevent="submit">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.title" placeholder="Title">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.github_link" placeholder="GitHub Link">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <input class="input" type="text" v-model="project.language" placeholder="Programming Language">
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <textarea class="textarea is-info is-small" name="text" id="text" rows="10" v-model="project.text" placeholder="Text"></textarea>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-fifth">
          <img v-if="codeImageURL" :src="codeImageURL">
          <img v-else-if="this.project.code_image" :src="`https://s3.amazonaws.com/${awsS3Bucket}/projects/${this.project.code_image}`" alt="No Image">
          <span v-else id="NoImage">No Image To Display</span>
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="code_image" ref="code_image" @change="handleFileUpload($event, 'code')" placeholder="Code Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a code image…</span>
              </span>
              <span class="file-name">{{ this.project.code_image !== '' ? this.project.code_image : 'No Image' }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns field">
        <div class="column is-one-fifth">
          <video v-if="gifImageURL" :src="gifImageURL">
            <source :src="gifImageURL" type="video/mp4">
          </video>
          <video v-else-if="this.project.gif_image" controls autoplay loop>
            <source :src="`https://s3.amazonaws.com/${awsS3Bucket}/projects/${this.project.gif_image}`" type="video/mp4">
          </video>
          <span v-else id="NoImage">No Image To Display</span>
        </div>
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="gif_image" ref="gif_image" @change="handleFileUpload($event, 'gif')" placeholder="GIF Image">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a GIF...</span>
              </span>
              <span class="file-name">{{ this.project.gif_image !== '' ? this.project.gif_image : 'No Image' }}</span>
            </label>
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
import { mapActions } from 'vuex';
import awsS3 from '@/assets/js/aws_s3.js';

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
      project: {
        title: '',
        github_link: '',
        text: '',
        language: '',
        code_image: '',
        gif_image: '',
      },
      codeImageURL: '',
      gifImageURL: '',
      err: '',
      awsS3Bucket: process.env.VUE_APP_S3_BUCKET,
    }
  },
  async mounted() {
    if(this.request_type === 'edit') {
      // Get project to edit
      await axios.get(`/api/projects/${this.$route.params.id}/edit`)
        .then((response) => {
          this.project = response.data;
        })
        .catch(err => {
          this.error = err;
        })
    }
  },
  methods: {
    submit() {
      if(this.request_type === 'create') {
        this.$store.dispatch('projects/addProject', this.project)
          .then(() => {
            this.$router.push('/dashboard/projects');
          });
      } else if(this.request_type === 'edit') {
        this.$store.dispatch('projects/editProject', { id: this.$route.params.id, project: this.project })
          .then(() => {
            this.getProjects();
            this.$router.push('/dashboard/projects');
          });
      } else {
        this.err = 'There seems to be an issue with the provided request type.';
      }

    },
    handleFileUpload(event, type) {
      let image = event.target.files[0];
      let s3_folder = 'projects';
      console.log(image);
      if(type === 'code') {
        this.codeImageURL = URL.createObjectURL(image);
        awsS3.getSignedRequest(image, s3_folder);
        this.project.code_image = encodeURIComponent(image.name);
      }
      if(type === 'gif') {
        this.gifImageURL = URL.createObjectURL(image);
        awsS3.getSignedRequest(image, s3_folder);
        this.project.gif_image = encodeURIComponent(image.name);
      }
    },
    ...mapActions('projects', ['getProjects']),
    resetForm() {
      this.project.title = ''
      this.project.github_link = ''
      this.project.text = ''
      this.project.language = ''
      this.project.code_image = ''
      this.project.gif_image = ''
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
