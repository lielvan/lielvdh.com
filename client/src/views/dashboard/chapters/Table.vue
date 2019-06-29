<template>
  <div class="dashboard-chapters-wrapper is-flex">
    <div class="table-top is-flex">
      <h1 class="is-flex is-size-4">Chapters</h1>
      <router-link class="button is-flex is-success" :to="{ name: 'new-chapter' }">New</router-link>
    </div>
    <table class="table is-bordered is-narrow is-striped">
      <thead>
        <tr class="table-head">
          <th>Title</th>
          <th>Subtitlie</th>
          <th>Text</th>
          <th>Location</th>
          <th>Time Frame</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(chapter, index) in chapters" v-bind:index="index" v-bind:key="chapter._id">
          <td>{{ chapter.title }}</td>
          <td>{{ chapter.subtitle }}</td>
          <td width="55%">{{ chapter.text }}</td>
          <td>{{ chapter.location }}</td>
          <td>{{ chapter.time_frame }}</td>
          <td>
            <div class="buttons are-small">
              <router-link class="button is-warning" :to="{ name: 'edit-chapter', params: { id: chapter._id }}">Edit</router-link>
              <button class="button is-danger" @click="deleteChapter(chapter._id)">Delete</button>
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
  name: 'dashboard-chapters',
  computed: {
    ...mapState('chapters', ['chapters']),
  },
  methods: {
    ...mapActions('chapters', ['deleteChapter'])
  }
}
</script>

<style>
.dashboard-chapters-wrapper {
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
