import Vue from 'vue'
import App from './App.vue'
import vueScrollTo from 'vue-scrollto';
import 'bulma/css/bulma.css';
import '../src/assets/js/scripts';

Vue.use(vueScrollTo);
Vue.config.productionTip = false

// Custom fade in transition when el in view 
Vue.directive('fadein', {
  isLiteral: true,
  inserted: (el, binding, vnode) => {
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
  render: h => h(App),
}).$mount('#app')
