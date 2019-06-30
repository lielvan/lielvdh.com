<template>
  <section id="footer" class="hero is-primary is-bold is-small">
    <div class="hero-body">
      <div class="container">
        <div class="hidden" v-fadein="'showElement'">
          <p class="is-size-6-mobile touch-base">Let's Touch Base. Best way through <a class="linkedin" href="https://www.linkedin.com/in/liel-van-der-hoeven">LinkedIn</a>, <a class="facebook" href="https://www.facebook.com/lielvan">Facebook</a> or <a class="email" href="mailto:lielvdh@gmail.com">Email</a></p>
          <p class="is-size-7-mobile">Currently open to new opportunities within the realm of the evergrowing tech world</p>
  
          <div class="cv-download">
            <a href="/doc/LielVanDerHoeven-CV.pdf" target="_blank">My Curriculum Vitae</a>
          </div>
          
          <div class="footer-rights">
            <p class="is-size-7-mobile">&copy; <strong>Liel van der Hoeven</strong>. All Rights Reserved.</p>
            <p class="is-size-7-mobile">Proudly created using the <strong>VENM</strong> stack. <img id="mini_computer" src="/images/mini_computer.svg" alt="tech"></p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style>
p strong {
  color: inherit;
}
a.linkedin, a.facebook, a.email {
  color: white;
  font-weight: bold;
  transition: color .3s;
}
a.linkedin:hover, a.facebook:hover, a.email:hover {
  color:#3273dc;
}
.container #mini_computer {
  position: relative;
  top: 5px;
  height: 1.3rem;
  margin-right: 10px;
  -webkit-animation:spin 4s linear infinite;
  animation: spin 4s linear infinite;
}
@-webkit-keyframes spin { 
  0% { -webkit-transform: rotate(0deg) scale(1.1,1.1); }
  50% { -webkit-transform: rotate(180deg) scale(1,1); }
  100% { -webkit-transform: rotate(360deg) scale(1.1,1.1); }
}
@keyframes spin {
  0% { transform:rotate(0deg) scale(1.1,1.1); }
  50% { transform:rotate(180deg) scale(1,1); }
  100% { transform:rotate(360deg) scale(1.1,1.1); }
}
.cv-download {
  margin-top: 1.5rem;
}
.cv-download a {
  padding: 7px;
  color: #000;
  background-color: rgb(245, 175, 47);
  font-weight: 600;
  font-size: 20px;
  font-family: 'Architects Daughter';
  border-radius: 10px;
  transition: background-color .3s;
}
.cv-download a:hover {
  background-color: rgb(232, 163, 37);
}
.footer-rights {
  margin-top: 1.5rem;
  padding: 1rem 0;
  font-size: 0.9rem;
  border-top: 1px solid hsla(0,0%,100%,.2);
}

@media only screen and (max-width: 450px) {
  .touch-base {
    margin-bottom: 0.8rem;
  }
}
</style>