<template>
  <section id="motos" class="hero">
    <h2 class="title is-size-2-desktop hidden-fade-in-left section-title" v-fadein="'showElement'">Few words <br> I Live By</h2>
    <div class="motos-wrapper hero-body">
      <div class="container">
        <ul>
          <li v-for="(moto, index) in motos" :item="moto" :index="index" :key="moto._id">
              <p class="is-size-6-mobile is-size-5-tablet is-size-4-desktop hidden-fade-in-bottom" v-fadein="'showElement'">{{ moto.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "motos",
  data() {
    return {
      motos: [],
      error: ''
    }
  },
  created() {
    this.$store.dispatch('motos/getMotos')
      .then((motos) => {
        this.motos = motos;
      })
      .catch(err => {
        this.error = err.message;
      })
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');

#motos {
    position: relative;
    background-image: url("/images/lake_wallpaper.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
#motos ul {
    font-family: 'Audiowide';
    font-size: 23px;
}
ul li {
    padding: 8px 0;
}
</style>
