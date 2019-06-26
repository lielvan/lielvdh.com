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
      </tr>
    </thead>
    <tbody>
      <tr v-for="(chapter, index) in chapters" v-bind:item="chapter" v-bind:index="index" v-bind:key="chapter._id">
        <td>{{ chapter.title }}</td>
        <td>{{ chapter.subtitle }}</td>
        <td width="55%">{{ chapter.text }}</td>
        <td>{{ chapter.location }}</td>
        <td>{{ chapter.time_frame }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import ChapterService from '@/services/ChapterService';

export default {
  name: 'dashboard-chapters',
  data() {
    return {
      chapters: [],
      error: '',
    }
  },
  async created() {
    this.chapters = this.$store.state.chapters;
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
