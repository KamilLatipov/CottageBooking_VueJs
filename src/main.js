import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Axios from 'axios'

//import './assets/modal-img'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')

Vue.prototype.$http.defaults.headers.common['Authorization'] = token


Vue.component('')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
