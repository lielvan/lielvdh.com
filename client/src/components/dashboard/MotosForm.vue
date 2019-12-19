<template>
  <div>
    <h1 class="dashboard-title">{{ title }} Form</h1>

    <form @submit.prevent="submit">
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <textarea class="textarea is-info is-medium" name="text" id="text" rows=10 v-model="moto.text" placeholder="Text"></textarea>
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
      type: String
    },
    request_type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      moto: {
        text: '',
      },
      err: '',
    }
  },
  async mounted() {
    if(this.request_type === 'edit') {
      // Get moto entry from db to edit
      await axios.get(`/api/motos/${this.$route.params.id}/edit`)
        .then((response) => {
          this.moto = response.data;
        })
        .catch(err => {
          this.error = err;
        })
    }
  },
  methods: {
    submit() {
      if(this.request_type === 'create') {
        this.$store.dispatch('motos/addMoto', this.moto)
          .then(() => {
            this.$router.push('/dashboard/motos')
          });
      } else if(this.request_type === 'edit') {
        this.$store.dispatch('motos/editMoto', { id: this.$route.params.id, moto: this.moto })
          .then(() => {
            // Refresh 'motos' array in vuex and redirect to motos table
            this.getMotos();
            this.$router.push('/dashboard/motos')
          });
      }
      else {
        this.err = 'There seems to be an issue with the provided request type.';
      }
    },
    ...mapActions('motos', ['getMotos']),
    resetForm() {
      this.newMoto.text = '';
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
