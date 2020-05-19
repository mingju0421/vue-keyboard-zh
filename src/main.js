import Vue from 'vue'
import App from './App.vue'
import Keyboard from '../index.js'
Vue.use(Keyboard)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
