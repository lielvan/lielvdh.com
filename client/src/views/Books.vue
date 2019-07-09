<template>
  <section class="hero">
    <h2 class="title is-2 hidden-fade-in-left section-title" v-fadein="'showElement'">How I Waste <br> My Spare Time</h2>
    <div class="books-wrapper hero-body">
      <carousel :autoplay="true" :autoplayHoverPause="true" :perPageCustom="[[768, 4], [1024, 5]]">
        <slide v-for="(book, index) in books" :item="book" :index="index" :key="book._id">
          <img :src="book.image" alt="Book Image Unavailable">
        </slide>
      </carousel>
    </div>
  </section>
</template>

<script>
export default {
  name: "books",
  data() {
    return {
      books: [],
      error: ''
    }
  },
  created() {
    this.$store.dispatch('books/getBooks')
      .then((books) => {
        this.books = books;
      })
      .catch(err => {
        this.error = err.message;
      })
  }
};
</script>

<style>
/* .VueCarousel-slide {
  background-color: blue;
  border: 1px solid black;
} */
</style>
