<template>
  <div id="app">
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">Liel van der Hoeven</a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" v-scroll-to="'#head'">Home</a>
          <a class="navbar-item" v-scroll-to="'#chapters'">Chapters</a>
          <a class="navbar-item" v-scroll-to="'#books'">Reading List</a>
          <a class="navbar-item" v-scroll-to="'#motos'">Motos</a>
          <a class="navbar-item" v-scroll-to="'#footer'">Contact</a>
        </div>
        <div class="navbar-end">
          <a class="navbar-item">GitHub</a>
          <a class="navbar-item">LinkedIn</a>
          <a class="navbar-item">Facebook</a>
          <a class="navbar-item">Instagram</a>
        </div>
      </div>
    </nav>

    <Head />
    <Chapters />
    <!-- Hobbies: Lifting/Swimming, Futball, Reading, Gradening, Investing -->
    <Motos />
    <Footer />
    
  </div>
</template>

<script>
import Head from "@/views/Head.vue";
import Chapters from "@/views/Chapters.vue";
import Motos from "@/views/Motos.vue";
import Footer from "@/views/Footer.vue";

export default {
  name: 'app',
  components: {
    Head,
    Chapters,
    Motos,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Architects+Daughter&display=swap');

body{ 
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 span {
  font-family: 'Architects Daughter';
}

.navbar-nav .nav-link {
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(0.1, 1.0, 0.8, 0.1);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(35px);
  opacity: 0;
}

h2.title, h1.title {
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    padding: 10px 0;
    border-top: 2px solid;
    border-bottom: 2px solid;
}
</style>
