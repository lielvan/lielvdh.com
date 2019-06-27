<template>
  <div class="dashboard-chapters-wrapper is-flex">
    <h1>Chapter Table Goes Here</h1>
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
        <tr v-for="(chapter, index) in chapters" v-bind:item="chapter" v-bind:index="index" v-bind:key="chapter._id">
          <td>{{ chapter.title }}</td>
          <td>{{ chapter.subtitle }}</td>
          <td width="55%">{{ chapter.text }}</td>
          <td>{{ chapter.location }}</td>
          <td>{{ chapter.time_frame }}</td>
          <td>
            <router-link :to="{ name: 'edit-chapter', params: { id: chapter._id }}">Edit</router-link>
            <button @click="deleteChapter(chapter._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'dashboard-chapters',
  data() {
    return {
      chapters: [],
      error: '',
    }
  },
  mounted() {
    this.chapters = this.$store.state.chapters;
  },
  methods: {
    deleteChapter(id) {
      this.$store.dispatch('deleteChapter', id)
        .then(() => {
          this.chapters = this.$store.state.chapters;
        })
    }
  }
}
</script>

<style>
.dashboard-chapters-wrapper {
  flex-direction: column;
}
.table thead .table-head th {
  text-align: center;
  font-size: 1.1rem;
}
</style>
