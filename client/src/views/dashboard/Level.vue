<template>
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Chapters</p>
        <p class="title">{{ total_chapters }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Motos</p>
        <p class="title">{{ total_motos }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'dashboard-level',
  data() {
    return {
      total_chapters: 0,
      total_motos: 0
    }
  },
  created() {
    this.total_chapters = this.$store.state.totalChapters;
    this.total_motos = this.$store.state.totalMotos;
  },
}
</script>

<style>
.level {
  padding-top: 2rem;
}
.level-item .title {
  margin-top: 0;
}
</style>
