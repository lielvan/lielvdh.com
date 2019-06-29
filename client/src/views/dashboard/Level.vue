<template>
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Chapters</p>
        <p class="title">{{ totalChapters }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Motos</p>
        <p class="title">{{ totalMotos }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'dashboard-level',
  computed: {
    ...mapState('chapters', ['totalChapters']),
    ...mapState('motos', ['totalMotos'])
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
