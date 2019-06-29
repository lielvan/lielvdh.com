<template>
  <div class="dashboard-motos-wrapper is-flex">
    <div class="table-top is-flex">
      <h1 class="is-flex is-size-4">Motos</h1>
      <router-link class="button is-flex is-success" :to="{ name: 'new-moto' }">New</router-link>
    </div>
    <table class="table is-bordered is-narrow is-striped">
      <thead>
        <tr class="table-head">
          <th>ID</th>
          <th>Text</th>
          <th>Created At</th>
          <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(moto, index) in motos" v-bind:item="moto" v-bind:index="index" v-bind:key="moto._id">
          <td width="5%">{{ moto._id }}</td>
          <td>{{ moto.text }}</td>
          <td>{{ moto.createdAt }}</td>
          <td>
            <div class="buttons are-small">
              <router-link class="button is-warning" :to="{ name: 'edit-moto', params: { id: moto._id }}">Edit</router-link>
              <button class="button is-danger" @click="deleteMoto(moto._id)">Delete</button>
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
  name: 'dashboard-motos',
  computed: {
    ...mapState('motos', ['motos']),
  },
  methods: {
    ...mapActions('motos', ['deleteMoto'])
  }
}
</script>

<style>
.dashboard-motos-wrapper {
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
