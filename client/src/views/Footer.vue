<template>
  <section id="footer" class="hero is-primary is-bold is-small">
    <div class="hero-body">
      <div class="container">
        <div class="hidden-fade-in-top" v-fadein="'showElement'">
          <p class="is-size-6-mobile touch-base">Let's Touch Base. Best way through <a class="linkedin" href="https://www.linkedin.com/in/liel-van-der-hoeven">LinkedIn</a>, <a class="facebook" href="https://www.facebook.com/lielvan">Facebook</a> or <a class="email" href="mailto:lielvdh@gmail.com">Email</a></p>
          <p class="is-size-7-mobile">Currently open to new opportunities within the realm of the evergrowing tech world</p>
  
          <div class="cv-download">
            <a :href="`${awsURL}/${this.cv.text}`" target="_blank">My Curriculum Vitae</a>
          </div>
          
          <div class="footer-rights">
            <p class="is-size-7-mobile">&copy; <strong>Liel van der Hoeven</strong>. All Rights Reserved.</p>
            <p class="is-size-7-mobile">Proudly created using the <strong>MEVN</strong> stack. <a id="rumble" href="#" @click.prevent="handlePlay()"><img id="mini_computer" src="/images/mini_computer.svg" alt="tech"><span class="tooltip">Rumble...?</span></a></p>
          </div>
          <p>{{ this.error }}</p>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
    name: "Footer",
    data() {
      return {
        audio: new Audio("/sound/Lets_Get_Ready_To_Rumble.mp3"),
        error: '',
        cv: '',
        awsS3Bucket: process.env.VUE_APP_S3_BUCKET,
      }
    },
    computed: {
    awsURL: function() {
      return `https://s3.amazonaws.com/${this.awsS3Bucket}/general`
    }
  },
    async mounted() {
      await axios.get(`/api/general/liel-cv`)
        .then((response) => {
          this.cv = response.data;
        })
        .catch((err) => {
          this.error = err;
        });
    },
    methods: {
      async playRumble() {
        try {
          await this.audio.play();
          console.log("LETS RUMBLE!!!");
        } catch(err) {
          this.error = err;
        }
      },
      handlePlay() {
        if(this.audio.paused) {
          this.playRumble();
        } else {
          this.audio.pause();
          console.log("Rumble Paused...");
        }
      }
    }
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
#rumble {
  cursor: default;
  position: relative;
  display: inline-block;
}
#rumble .tooltip {
  visibility: hidden;
  position: absolute;
  width: 75px;
  background-color: #555;
  color: #fff;
  padding: 5px 0;
  border-radius: 5px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.6s;
}
#rumble:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
@media only screen and (max-width: 450px) {
  .touch-base {
    margin-bottom: 0.8rem;
  }
  #rumble .tooltip {
    bottom: 118%;
    left: 50%;
    margin-left: -75px;
  }
}
</style>