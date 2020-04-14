<template>
    <section id="head" class="hero is-dark is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="is-loading hidden-fade-in-left" v-fadein="'showElement'">
            <h1 class="title is-size-1-desktop" style="margin-top: 0;"><span>Hey, I'm</span><br>Liel van der Hoeven</h1>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name: "Head",
    mounted() {
      document.querySelector('.is-loading').classList.remove('is-loading');
    }
};
</script>

<style scoped>
h1.title {
  display: inline-block;
  width: fit-content;
  margin-top: 0;
  margin-right: auto;
  margin-left: auto;
  padding: 10px 0;
  border-top: none;
  border-bottom: none;
  transform: scale(1);
}
.is-loading h1::before, .is-loading h1::after {
  width: 0%;
}
h1::before {
  top: 0;
  left: 0;
}
h1::after {
  bottom: 0;
  right: 0;
}
h1::before, h1::after {
  transition: width 1.5s ease;
  transition-delay: 2.7s;
  background-color: #fff;
  content: '';
  display: block;
  height: 2px;
  position: absolute;
  width: 100%;
}
</style>