<template>
  <div>
    <h1>Edit FORM GOES HERE</h1>

    <form @submit.prevent="editMoto">
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
          <button class="button is-link" type="submit">Edit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'moto-new',
  data() {
    return {
      moto: {}
    }
  },
  async mounted() {
    // Get moto to edit
    await axios.get(`/api/motos/${this.$route.params.id}/edit`)
      .then((response) => {
        this.moto = response.data
      })
      .catch(err => {
        this.error = err
      })
  },
  methods: {
    editMoto() {
      this.$store.dispatch('motos/editMoto', { id: this.$route.params.id, moto: this.moto })
        .then(() => {
          this.$router.push('/dashboard/motos')
        })
    },
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
