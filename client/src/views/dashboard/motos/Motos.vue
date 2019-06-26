<template>
<div class="dashboard-motos-wrapper is-flex">
  <h1>Moto Table Goes Here</h1>
  <table class="table is-bordered is-narrow is-striped">
    <thead>
      <tr class="table-head">
        <th>ID</th>
        <th>Text</th>
        <th>Created At</th>
     </tr>
    </thead>
    <tbody>
      <tr v-for="(moto, index) in motos" v-bind:item="moto" v-bind:index="index" v-bind:key="moto._id">
        <td width="5%">{{ moto._id }}</td>
        <td>{{ moto.text }}</td>
        <td>{{ moto.createdAt }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import MotoService from '@/services/MotoService';

export default {
  name: 'dashboard-motos',
  data() {
    return {
      motos: [],
      error: '',
    }
  },
  async created() {
    this.motos = this.$store.state.motos;
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
