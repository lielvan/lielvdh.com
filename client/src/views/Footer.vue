<template>
    <section id="footer" class="hero is-light is-small">
        <div class="hero-body">
            <div class="container">
                <p>Let's Touch Base. Best way through <a href="https://www.linkedin.com/in/liel-van-der-hoeven" style="color:#3273dc;">LinkedIn</a>, <a href="https://www.facebook.com/lielvan" style="color:#3273dc;">Facebook</a> or <a href="mailto:lielvdh@gmail.com" style="color:#3273dc;">Email</a></p>
                <p>Currently open to new opportunities within the realm of the evergrowing tech world <img id="mini_computer" src="/images/mini_computer.svg" alt="tech"></p>

                <div class="footer-logos">
                    <a href="https://www.linkedin.com/in/liel-van-der-hoeven"><img src="/images/ln_logo.png" alt="LinkedIn Logo"></a>
                    <a href="https://www.facebook.com/lielvan"><img src="/images/f_logo.png" alt="Facebook Logo"></a>
                </div>

                <div class="cv-download">
                    <a href="/doc/LielVanDerHoeven-CV.pdf" target="_blank">My Curriculum Vitae</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// @ is an alias to /src
import Chapters from "@/views/Chapters.vue";

export default {
    name: "home",
    components: {
      Chapters
    }
};
</script>

<style>
h2.title, h1.title {
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
    padding: 10px 0;
    border-top: 2px solid;
    border-bottom: 2px solid;
}
</style>

