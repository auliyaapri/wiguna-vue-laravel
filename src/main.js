import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
// import './assets/vendor/jquery/jquery.min.js'
import '../src/assets/vendor/jquery/jquery'
import '../src/assets/css/templatemo-sixteen.css'
import '../src/assets/js/custom.js'
import '../src/assets/js/slick.js'
import '../src/assets/dist/owl.carousel.js'

import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

AOS.init();
