<template>
  <div class="books-wrapper hero-body" v-fadein="'showElement'">
    <div class="books-intro hidden-fade-in-top" v-fadein="'showElement'">
      <div class="reading-list-img">
        <span class="is-hidden">reading list img</span>
      </div>
      <div class="reading-list-text">
        <p class="is-uppercase is-size-6-touch is-size-4-desktop">My Reading List</p>
        <div class="reading-list-arrows">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <carousel :autoplay="true" :autoplayHoverPause="true" :perPageCustom="[[768, 3], [1215, 4], [1407, 5]] " class="hidden-fade-in-top" v-fadein="'showElement'">
      <slide v-for="(book, index) in books" :item="book" :index="index" :key="book._id">
        <div class="book-img-wrapper">
          <img class="book-img" :src="book.image" alt="Book Image Unavailable">
          <div class="book-info">
            <p id="book-description">{{ book.description }}</p>
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
/*********************/
/*   BOOKS INTRO     */
/*********************/
.books-intro {
  margin-bottom: 70px;
}
.reading-list-img {
  background-image: url("/images/books/undraw_reading_list.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  content: '';
  display: flex;
  height: 175px;
  width: 175px;
  margin-right: auto;
  margin-left: auto;
}
.reading-list-text {
  font-family: 'Architects Daughter';
  opacity: 0;
  position: relative;
  transition: opacity 0.5s;
}
.reading-list-text p {
  margin-bottom: 15px;
}
.reading-list-arrows span {
  display: block;
  position: absolute;
  background-color: blue;
  height: 3px;
  width: 20px;
  animation: colorChange 5s infinite;
}
.reading-list-arrows span:nth-child(1) {
  left: calc(50% - 25px);
  transform: rotate(45deg);
}
.reading-list-arrows span:nth-child(2) {
  left: calc(50% - 12px);
  transform: rotate(-45deg);
}
.reading-list-arrows span:nth-child(3) {
  left: calc(50% - 25px);
  bottom: -30px;
  transform: rotate(45deg);
}
.reading-list-arrows span:nth-child(4) {
  left: calc(50% - 12px);
  bottom: -30px;
  transform: rotate(-45deg);
}
@keyframes colorChange {
  0% {background: blue;}
  25% {background: green;}
  50% {background: yellow;}
  75% {background: red;}
  100% {background: blue;}
}
.reading-list-img:hover + .reading-list-text {
  opacity: 1;
}
/*********************/
/*   BOOKS CAROUSEL  */
/*********************/
.book-img {
  box-shadow: 3px 2px 5px 1px rgba(0,0,0,0.75);
  border-radius: 6px;
}
.book-img-wrapper {
  transition: all 0.5s ease;
  width: fit-content;
  position: relative;
  margin-right: auto;
  margin-left: auto;
}
.book-img-wrapper .book-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  padding: 15px;
  left: 10px;
  top: 2.5%;
  height: 355px;
  width: 232px;
  border-radius: 6px;
  color: #000;
  background-color: rgba(255, 255, 255, 0.93);
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
@media only screen and (max-width: 320px) {
  .reading-list-img {
    height: 145px;
    width: 145px;
  }
  .book-img {
    width: 125px;
  }
  .book-img-wrapper .book-info {
    left: 6px;
    height: 179px;
    width: 114px;
  }
  #book-description {
    font-size: 0.5rem;
    line-height: initial;
  }
}
@media only screen and (min-width: 321px) and (max-width: 424px) {
  .book-img {
    width: 150px;
  }
  .book-img-wrapper .book-info {
    left: 6px;
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
    left: 4.5px;
    height: 257px;
    width: 171px;
  }
  #book-description {
    font-size: 0.7rem;
    line-height: initial;
  }
}
@media only screen and (min-width: 1024px) {
  .book-img {
    width: initial;
  }
}
</style>
