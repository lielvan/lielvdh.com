<template>
  <div class="tile is-7 is-parent">
      <div id="chapter" class="chapter tile columns is-flex has-text-centered is-child box">
          <div class="column">
            <h2 class="is-marginless"><a class="title is-size-5-touch is-size-4-desktop has-text-link" :href="chapter.title_link">{{ chapter.title }}</a></h2>
            <h4 id="chapter-subtitle" class="subtitle is-size-6-touch">{{ chapter.subtitle }}</h4>

            <div class="columns is-multiline is-mobile">
              <div class="column is-one-third-mobile is-one-quarter-tablet is-one-quarter-desktop image">
                <img :src="chapter.image" alt="Chapter Image Unavailable">
              </div>

              <div class="column content has-text-left">
                <p v-html="chapter.text" class="is-size-7-mobile is-size-6-tablet">{{ chapter.text }}</p>
              </div>

              <div class="column is-paddingless is-full">
                <div class="chapter-time has-text-right is-size-7-mobile is-size-6-tablet">
                  <span>{{ chapter.location }}</span>
                  <span>{{ chapter.time_frame }}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ChapterComponent',
  props: {
    chapter: {
        type: Object,
        required: true,
    }
  },
}
</script>

<style scoped>
#chapter {
  box-shadow: 0px 0px 7px 1px rgba(0,0,0,0.75);
  border-radius: 20px 100px;
}

.image {
  align-self: center;
}

.image img {
  border-radius: 6px;
}
.content {
  padding: 0.75rem;
}

#chapter-subtitle {
    color: #E19C41;
}

.chapter-time {
  font-style: italic;
}

.chapter-time span{
    display: block;
    padding: 0px 5px;
}
@media only screen and (max-width: 600px) {
  .box {
    padding: 0.75rem;
  }
}
</style>
