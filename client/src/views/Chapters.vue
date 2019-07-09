<template>
  <section id="chapters" class="hero is-primary is-bold is-medium">
    <h2 class="title is-size-2-desktop hidden-fade-in-left section-title" v-fadein="'showElement'">Some of my<br>Defining Chapters</h2>
    <div class="hero-body chapters-wrapper">
      <div class="container">
        <div class="is-flex chapter-wrapper" v-for="(chapter, index) in chapters" v-bind:item="chapter" v-bind:index="index" v-bind:key="chapter._id">
            <ChapterComponent :class="[index % 2 == 0 ? hiddenFadeInLeft: hiddenFadeInRight]" v-fadein="'showElement'" :chapter="chapter"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ChapterComponent from '../components/ChapterComponent';

export default {
  name: 'Chapters',
  components: {
    ChapterComponent
  },
  data() {
    return {
      hiddenFadeInLeft: 'hidden-fade-in-left',
      hiddenFadeInRight: 'hidden-fade-in-right',
      chapters: [],
      error: '',
      text: '',
      inView: false,
    }
  },
  created() {
    this.$store.dispatch('chapters/getChapters')
      .then((chapters) => {
        this.chapters = chapters;
      })
      .catch(err => {
        this.error = err.message;
      })
  },
}
</script>

<style>
#chapters .chapters-wrapper {
  padding: 4rem 0;
}

.title {
  margin-top: 4rem;
}

.chapter-wrapper {
  justify-content: center;
}
</style>
