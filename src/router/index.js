import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SuccessView from '@/views/SuccessView.vue'
import ProductView from '@/views/ProductView.vue'
import DetailProduct from '@/components/DetailProduct.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',      
      component: AboutView
    },
    {
      path: '/products',
      name: 'product',      
      component: ProductView
    },
    {
      path: '/detail',
      name: 'detail',      
      component: DetailProduct
    },
    {
      path: '/cart',
      name: 'cart',      
      component: ShoppingCart
    },
    {
      path: '/success',
      name: 'success',      
      component: SuccessView
    },

  ]
})

export default router
