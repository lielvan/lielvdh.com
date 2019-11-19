<template>
  <div>
    <h1 class="dashboard-title">Create Form</h1>

    <form @submit.prevent="createGeneral">
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="label">Label</label>
          <div class="control">
            <input class="input" type="text" name="label" id="label" v-model="newGeneral.label" placeholder="Label">
          </div>
        </div>
      </div>
      <!-- Determine if a file is required, or simply text.
            If file, use input-file
            Otherwise, use input-text -->
      <div class="columns field">
        <div class="column is-one-quarter">
          <label class="checkbox">
            <input type="checkbox" v-model="newGeneral.is_file">
            Is A File?
          </label>
        </div>
      </div>
      <div v-if="newGeneral.is_file" class="columns field">
        <div class="column is-one-quarter">
          <div class="file has-name is-centered is-boxed is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" name="file" ref="file" @change="handleFileUpload($event)" placeholder="file">
              <span class="file-cta">
                <span class="file-icon"><font-awesome-icon icon="upload"></font-awesome-icon></span>
                <span class="file-label">Choose a file…</span>
              </span>
              <span class="file-name">{{ this.newGeneral.text }}</span>
            </label>
          </div>
        </div>
      </div>
      <div v-else class="columns field">
        <div class="column is-one-quarter">
          <label class="is-sr-only" for="text">Text</label>
          <div class="control">
            <textarea class="textarea is-info is-medium" name="text" id="text" v-model="newGeneral.text" placeholder="Text"></textarea>
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
  name: 'general-new',
  data() {
    return {
      formData: new FormData(),
      newGeneral: {
        label: '',
        is_file: false,
        text: ''
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      let file = event.target.files[0];
      console.log(file);
      this.newGeneral.text = file.name;
      this.formData.set('file', file);
    },
    createGeneral() {
      this.formData.append('label', this.newGeneral.label);
      this.formData.append('is_file', this.newGeneral.is_file);
      this.formData.append('text', this.newGeneral.text);

      this.$store.dispatch('general/addGeneral', this.formData)
        .then(() => {
          this.$router.push('/dashboard/general')
        })
    },
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