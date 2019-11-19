<template>
  <div class="dashboard-general-wrapper is-flex">
    <div class="table-top is-flex">
      <h1 class="is-flex is-size-4">General</h1>
      <router-link class="button is-flex is-success" :to="{ name: 'new-general' }">New</router-link>
    </div>
    <table class="table is-bordered is-narrow is-striped">
      <thead>
        <tr class="table-head">
          <th>Label</th>
          <th>Text</th>
          <th>Is File?</th>
          <th>Created At</th>
          <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(general, index) in generals" v-bind:item="general" v-bind:index="index" v-bind:key="general._id">
          <td>{{ general.label }}</td>
          <td>{{ general.text }}</td>
          <td class="is-capitalized">{{ general.is_file }}</td>
          <td>{{ general.createdAt }}</td>
          <td>
            <div class="buttons are-small">
              <router-link class="button is-warning" :to="{ name: 'edit-general', params: { id: general._id }}">Edit</router-link>
              <button class="button is-danger" @click="deleteGeneral(general._id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'dashboard-general',
  computed: {
    ...mapState('general', ['generals']),
  },
  methods: {
    ...mapActions('general', ['deleteGeneral'])
  }
}
</script>

<style>
.dashboard-general-wrapper {
  flex-direction: column;
}
.table-top {
  justify-content: space-between;
  margin: 1rem 0;
}
.table thead .table-head th {
  text-align: center;
  font-size: 1.1rem;
}
</style>
