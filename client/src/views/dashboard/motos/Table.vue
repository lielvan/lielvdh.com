<template>
  <div class="dashboard-motos-wrapper is-flex">
    <h1>Moto Table Goes Here</h1>
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
            <router-link :to="{ name: 'edit-moto', params: { id: moto._id }}">Edit</router-link>
            <button @click="deleteMoto(moto._id)">Delete</button>
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
.table thead .table-head th {
  text-align: center;
  font-size: 1.1rem;
}
</style>
