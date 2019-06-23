import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import vueScrollTo from 'vue-scrollto';
import 'bulma/css/bulma.css';
import '../src/assets/js/scripts';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faFacebookF, faLinkedinIn, faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faInstagram, faFacebookF, faLinkedinIn, faGithubAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(vueScrollTo);
Vue.config.productionTip = false

// Custom fade in transition when el in view 
Vue.directive('fadein', {
  isLiteral: true,
  inserted: (el, binding) => {
    let f = () => {
      let rect = el.getBoundingClientRect()
      let inView = (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      )
      if (inView) {
        el.classList.add(binding.value)
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
    f()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
