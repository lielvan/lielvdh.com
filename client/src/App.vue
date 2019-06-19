<template>
  <!-- Home Section w/Nav -->
  <div id="app">
    <section id="home" class="hero is-dark is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <header class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item">Liel van der Hoeven</a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroC">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item" v-scroll-to="'#home'">Home</a>
              <a class="navbar-item" v-scroll-to="'#chapters'">Chapters</a>
              <a class="navbar-item" v-scroll-to="'#books'">Reading List</a>
              <a class="navbar-item" v-scroll-to="'#motos'">Motos</a>
              <a class="navbar-item" v-scroll-to="'#footer'">Contact</a>
            </div>
          </div>
        </header>
      </div>
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <transition name="slide-fade" appear>
            <h1 class="title is-size-1-desktop"><span>Hey, I'm</span><br>Liel van der Hoeven</h1>
          </transition>
        </div>
      </div>
    </section>

    <Chapters />
    <Footer />
    
  </div>
</template>

<script>
import Chapters from "@/views/Chapters.vue";
import Footer from "@/views/Footer.vue";

export default {
  name: 'app',
  components: {
    Chapters,
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
</style>
