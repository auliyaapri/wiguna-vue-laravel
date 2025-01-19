import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';


// Import JavaScript files
import '@/assets/js/slick.js'; // Slick JS
import '@/assets/js/owl.js'; // Owl JS
import '@/assets/dist/owl.carousel.js'; // Owl Carousel JS
import '@/assets/dist/owl.carousel.js'; // Owl Carousel JS


const pinia = createPinia();


router.afterEach((to) => {
  document.title = to.meta.title || 'Default Title'; // Set default title if meta.title is not defined
});
// Create and mount the Vue app
createApp(App)
  .use(router) // Use Vue Router
  .use(pinia)
  .mount('#app');
