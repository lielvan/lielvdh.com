<template>
  <div class="dashboard-projects-wrapper is-flex">
    <div class="table-top is-flex">
      <h1 class="is-flex is-size-4">Projects</h1>
      <router-link class="button is-flex is-success" :to="{ name: 'new-project' }">New</router-link>
    </div>
    <table class="table is-bordered is-narrow is-striped">
      <thead>
        <tr class="table-head">
          <th>Title</th>
          <th>Language</th>
          <th>Text</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projects" v-bind:index="index" v-bind:key="project._id">
          <td>{{ project.title }}</td>
          <td>{{ project.language }}</td>
          <td width="55%">{{ project.text }}</td>
          <td>
            <div class="buttons are-small">
              <router-link class="button is-warning" :to="{ name: 'edit-project', params: { id: project._id }}">Edit</router-link>
              <button class="button is-danger" @click="deleteProject(project._id)">Delete</button>
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
  name: 'dashboard-projects',
  computed: {
    ...mapState('projects', ['projects']),
  },
  methods: {
    ...mapActions('projects', ['deleteProject'])
  }
}
</script>

<style>
.dashboard-projects-wrapper {
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
