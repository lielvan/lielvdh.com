<template>
  <section id="motos" class="hero">
    <h2 class="title is-2 hidden section-title" v-fadein="'showElement'">Few words <br> I Live By</h2>
    <div class="motos-wrapper hero-body">
      <div class="container">
        <ul>
          <li v-for="(moto, index) in motos" :item="moto" :index="index" :key="moto._id">
              <p class="is-size-6-mobile is-size-5-tablet is-size-4-desktop hidden" v-fadein="'showElement'">{{ moto.text }}</p>
          </li>
        </ul>
      </div>
    </div>
    <parallax :speed-factor="0.3" :fixed="true">
      <img src="/images/lake_wallpaper.jpg" alt="lake image">
    </parallax>
  </section>
</template>

<script>
import Parallax from 'vue-parallaxy';
import MotoService from '../services/MotoService';

export default {
    name: "motos",
    components: {
        Parallax,
    },
    data() {
      return {
        motos: [],
        error: ''
      }
    },
    async created() {
      try {
        this.motos = await MotoService.getMotos();
      } catch(err) {
        this.error = err.message;
      }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');

#motos {
    position: relative;
}
.motos-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 165px;
    margin-right: auto;
    margin-left: auto;
}
#motos .Masthead {
    min-height: 55vh;
}
#motos ul {
    /* font-weight: 900; */
    font-family: 'Audiowide';
    font-size: 23px;
}
ul li {
    padding: 8px 0;
}
@media only screen and (min-width: 400px) {
  #motos ul {
    margin-top: 65px;
  }
}
</style>
