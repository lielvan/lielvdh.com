<template>
  <div class="books-wrapper hero-body">
    <p class="subtitle is-size-7-mobile is-size-6-tablet">Reading thrillers and fantasy has always been a joy <br> But also self-improvement books (gotta keep that brain active)<br> Here are few of my favorites!</p>
    <carousel :autoplay="false" :perPageCustom="[[768, 3], [1215, 4], [1407, 5]] ">
      <slide v-for="(book, index) in books" :item="book" :index="index" :key="book._id">
        <div class="book-img-wrapper">
          <img class="book-img" :src="book.image" alt="Book Image Unavailable">
          <div class="book-info">
            <!-- <span id="book-rating"><a :href="this.book_link" target="_blank"><img class="goodreads-logo" src="/images/goodreads_logo.png" alt="GoodReads:"></a> {{ rating }} / 5</span> -->
            <p id="book-description" class="is-size-7-tablet">{{ book.description }}</p>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
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
.book-img {
  box-shadow: 3px 2px 5px 1px rgba(0,0,0,0.75);
  border-radius: 6px;
}
.VueCarousel-slide {
  position: relative;
}
.book-img-wrapper {
  transition: all 0.5s ease;
}
.book-img-wrapper .book-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  padding: 15px;
  left: 48px;
  top: 2.5%;
  height: 355px;
  width: 232px;
  border-radius: 6px;
  color: #000;
  background-color: rgba(255, 255, 255, 0.9);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.book-img-wrapper:hover .book-info {
    opacity: 1;
}
#book-description {
  font-size: 0.85rem;
  line-height: 1.5rem;
}
@media only screen and (min-width: 320px) and (max-width: 424px) {
  .book-img {
    width: 150px;
  }
  .book-img-wrapper .book-info {
    left: 22px;
    height: 212px;
    width: 139px;
  }
  #book-description {
    font-size: 0.6rem;
    line-height: initial;
  }

}
@media only screen and (min-width: 425px) and (max-width: 1023px) {
  .book-img {
    width: 180px;
  }
  .book-img-wrapper .book-info {
    left: 34px;
    height: 257px;
    width: 171px;
  }
  #book-description {
    line-height: initial;
  }
}
@media only screen and (min-width: 1024px) {
  .book-img {
    width: initial;
  }
}
@media only screen and (min-width: 1408px) {
  .book-img-wrapper .book-info {
    left: 23px;
  }
}
</style>
