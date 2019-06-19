import Vue from 'vue'
import App from './App.vue'
import vueScrollTo from 'vue-scrollto';
import 'bulma/css/bulma.css';
import '../src/assets/js/scripts';

Vue.use(vueScrollTo);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
