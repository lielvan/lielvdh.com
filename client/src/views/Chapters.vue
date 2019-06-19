<template>
  <section id="chapters" class="hero is-primary is-bold is-medium">
    <transition name="slide-fade" appear>
      <h2 class="title is-size-2-desktop">Defining Chapters</h2>
    </transition>
    <div class="hero-body chapters-wrapper">
      <div class="container">
        <div class="is-flex chapter-wrapper" v-for="(chapter, index) in chapters" v-bind:item="chapter" v-bind:index="index" v-bind:key="chapter._id">
          <transition name="slide-fade" appear>
            <ChapterComponent :chapter="chapter"/>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ChapterService from '../services/ChapterService';
import ChapterComponent from '../components/ChapterComponent';

export default {
  name: 'Chapters',
  components: {
    ChapterComponent
  },
  data() {
    return {
      chapters: [],
      error: '',
      text: '',
    }
  },
  async created() {
    try {
      this.chapters = await ChapterService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  }
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

.slide-fade-enter-active {
  transition: all 2s ease;
}

.slide-fade-enter {
  transform: translateX(35px);
  opacity: 0;
}
</style>
