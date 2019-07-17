<template>
  <div id="home">
    <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
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
          <!-- <a class="navbar-item" v-scroll-to="'#books'">Hobbies</a> -->
          <a class="navbar-item" v-scroll-to="'#motos'">Motos</a>
          <a class="navbar-item" v-scroll-to="'#footer'">Contact</a>
        </div>
        <div class="navbar-end">
          <a id="github-logo" class="navbar-item" href="http://github.com/lielvan" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'github-alt']"></font-awesome-icon></span>
          </a>
          <a id="linkedin-logo" class="navbar-item" href="http://www.linkedin.com/in/liel-van-der-hoeven" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'linkedin-in']"></font-awesome-icon></span>
          </a>
          <a id="facebook-logo" class="navbar-item" href="http://www.facebook.com/lielvan" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'facebook-f']"></font-awesome-icon></span>
          </a>
          <a id="instagram-logo" class="navbar-item" href="http://www.instagram.com/lielvdh" target="__blank">
            <span class="icon fas fa-lg"><font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon></span>
          </a>
        </div>
      </div>
    </nav>

    <Head />
    <Chapters />
    <!-- Hobbies: Lifting/Swimming, Futball, Reading, Gradening, Investing -->
    <section class="hero">
      <h1 class="title is-size-2-desktop hidden-fade-in-left section-title" v-fadein="'showElement'">How I Waste <br> My Spare Time</h1>
      <Books />
    </section>
    <Motos />
    <Footer />
    
  </div>
</template>

<script>
import Head from "@/views/Head.vue";
import Chapters from "@/views/Chapters.vue";
import Books from "@/views/Books.vue";
import Motos from "@/views/Motos.vue";
import Footer from "@/views/Footer.vue";

export default {
  name: 'home',
  components: {
    Head,
    Chapters,
    Books,
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
h1 span, .section-title {
  font-family: 'Architects Daughter';
}
.navbar-nav .nav-link {
  cursor: pointer;
}
h2.title, h1.title {
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    padding: 10px 0;
    border-top: 2px solid;
    border-bottom: 2px solid;
}
#github-logo, #linkedin-logo, #facebook-logo, #instagram-logo {
  transition: all .3s;
}
#github-logo:hover {
  background: rgb(125, 187, 230);
}
#linkedin-logo:hover {
  background: rgb(0, 119, 181);
}
#facebook-logo:hover {
  background: rgb(60,90,153);
}
#instagram-logo:hover { 
  /* Currently grandient transition isn't supported */
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);
}
@media only screen and (max-width: 1023px) { 
  .navbar-end .navbar-item {
    display: inline-block;
  }
}
</style>
