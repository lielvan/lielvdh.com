<template>
  <div>
    <h1>CREATE FORM GOES HERE</h1>

    <form @submit.prevent="createMoto">
      <div class="columns field">
        <div class="column is-one-third">
          <label class="is-sr-only" for="text"></label>
          <div class="control">
            <textarea class="textarea is-info is-medium" name="text" id="text" v-model="newMoto.text" placeholder="Text"></textarea>
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
  name: 'moto-new',
  data() {
    return {
      newMoto: {
        text: '',
      }
    }
  },
  methods: {
    createMoto() {
      this.$store.dispatch('motos/addMoto', this.newMoto)
        .then(() => {
          this.$router.push('/dashboard/motos')
        })
    },
    resetForm() {
      this.newMoto.text = ''
    }
  }
}
</script>

<style>
form .columns {
  justify-content: center;
}
</style>
