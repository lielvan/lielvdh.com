<template>
  <div>
    <h1 class="dashboard-title">{{ title }} Form</h1>

    <form @submit.prevent="submit">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="label">Label</label>
          <div class="control">
            <input class="input" type="text" name="label" id="label" v-model="general.label" placeholder="Label">
          </div>
        </div>
      </div>
      <!-- Determine if a file is required, or simply text.
            If file, use input-file
            Otherwise, use input-text -->
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="checkbox">
            <input type="checkbox" v-model="general.is_file">
            Is A File?
          </label>
        </div>
      </div>
      <div v-if="general.is_file" class="columns field">
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="file" ref="file" @change="handleFileUpload($event)" placeholder="File">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a file…</span>
              </span>
              <span class="file-name">{{ this.general.text }}</span>
            </label>
          </div>
        </div>
      </div>
      <div v-else class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text">Text</label>
          <div class="control">
            <textarea class="textarea is-info is-medium" name="text" id="text" v-model="general.text" placeholder="Text"></textarea>
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
    }
  },
  data() {
    return {
      formData: new FormData(),
      general: {
        label: '',
        is_file: false,
        text: ''
      },
      err: '',
    }
  },
  async mounted() {
    if(this.request_type === 'edit') {
      // Get general entry to edit
      await axios.get(`/api/general/${this.$route.params.id}/edit`)
        .then((response) => {
          this.general = response.data
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  methods: {
    submit() {
      this.formData.append('label', this.general.label);
      this.formData.append('is_file', this.general.is_file);
      this.formData.append('text', this.general.text);

      if(this.request_type === 'create') {
        this.$store.dispatch('general/addGeneral', this.formData)
          .then(() => {
            this.$router.push('/dashboard/general');
          });
      } else if(this.request_type === 'edit') {
        this.$store.dispatch('general/editGeneral', { id: this.$route.params.id, general: this.formData })
          .then(() => {
            this.getGenerals();
            this.$router.push('/dashboard/general');
          });
      } else {
        this.err = 'There seems to be an issue with the provided request type.';
      }
    },
    handleFileUpload(event) {
      let file = event.target.files[0];
      console.log(file);
      this.general.text = file.name;
      this.formData.set('file', file);
    },
    ...mapActions('general', ['getGenerals']),
    resetForm() {
      this.newGeneral.label = '';
      this.newGeneral.is_file = false;
      this.newGeneral.text = '';
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
form .checkbox:hover {
  color: rgb(245, 245, 245);
}
</style>