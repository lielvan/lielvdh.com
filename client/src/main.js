import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import vueScrollTo from 'vue-scrollto';
import 'bulma/css/bulma.css';
import '../src/assets/js/scripts';
import '../src/assets/css/app.css';
import fadeIn from '../src/assets/js/fade-in';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faFacebookF, faLinkedinIn, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCookies from 'vue-cookies';
import VueCarousel from 'vue-carousel';

library.add(faInstagram, faFacebookF, faLinkedinIn, faGithubAlt, faUpload);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(vueScrollTo);
Vue.use(VueCookies);
Vue.use(VueCarousel);
VueCookies.config('7d')

Vue.config.productionTip = false

// Custom fade-in transition when element in view 
Vue.directive('fadein', fadeIn)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
