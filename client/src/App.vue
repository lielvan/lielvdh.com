<template>
  <div id="app">
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" v-scroll-to="'#head'">Liel van der Hoeven</a>
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
          <a class="navbar-item" href="http://github.com/lielvan" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'github-alt']"></font-awesome-icon></span>
          </a>
          <a class="navbar-item" href="http://www.linkedin.com/in/liel-van-der-hoeven" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'linkedin-in']"></font-awesome-icon></span>
          </a>
          <a class="navbar-item" href="http://www.facebook.com/lielvan" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'facebook-f']"></font-awesome-icon></span>
          </a>
          <a class="navbar-item" href="http://www.instagram.com/lielvdh" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon></span>
          </a>
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

h1 span, .section-title {
  font-family: 'Architects Daughter';
}

.navbar-nav .nav-link {
  cursor: pointer;
}

.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-enter {
  transform: translateX(35px);
  opacity: 0;
}

/* Custom Fade In Transition */
.hidden {
  opacity: 0;
  transform: translateX(35px);
}
.showElement {
  opacity: 1;
  transform: translate(0, 0);
  transition: all 2s ease;
}

h2.title, h1.title {
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    padding: 10px 0;
    border-top: 2px solid;
    border-bottom: 2px solid;
}
@media only screen and (max-width: 1023px) { 
  .navbar-end .navbar-item {
    display: inline-block;
  }
}
</style>
