<template>
  <div class="dashboard-wrapper is-flex">
    <div class="table-top is-flex">
      <h1 class="is-flex is-size-4">{{ title }}</h1>
      <router-link class="button is-flex is-success" :to="{ name: new_route }">New</router-link>
    </div>
    <table class="table is-bordered is-narrow is-striped">
      <thead>
        <tr class="table-head">
          <!-- Table metadata headers -->
          <th v-for="data in metadata" v-bind:key="data.title">
            {{ data.title }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" v-bind:index="index" v-bind:key="item._id">
          <!-- Table metadata identifiers -->
          <td v-for="data in metadata" v-bind:key="data.identifier">{{ item[data.identifier] }}</td>
          <td>
            <div class="buttons are-small">
              <router-link class="button is-warning" :to="{ name: edit_route, params: { id: item._id }}">Edit</router-link>
              <button class="button is-danger" @click="deleteItem(item._id)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    items: {
      type: Array,
      required: true
    },
    metadata: {
      type: Array,
      required: true
    },
    new_route: {
      type: String
    },
    edit_route: {
      type: String
    },
    deleteItem: {
      type: Function
    }
  },
};
</script>

<style>
.dashboard-wrapper {
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
.table tbody tr td {
  text-align: center;
  vertical-align: middle;
}
.table tbody tr td .buttons {
  justify-content: space-evenly;
}
</style>
