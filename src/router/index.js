import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SuccessView from '@/views/SuccessView.vue'
import ProductView from '@/views/ProductView.vue'
import DetailProduct from '@/components/DetailProduct.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileUserView from '@/views/ProfileUserView.vue'
import AboutView2 from '@/views/AboutView2.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home - Sixteen Clothing' }, // Title untuk rute ini
    },
    {
      path: '/about',
      name: 'about',      
      component: AboutView,
      meta: { title: 'About - Sixteen Clothing' }, // Title untuk rute ini
    },
    {
      path: '/about2',
      name: 'about2',      
      component: AboutView2,
      meta: { title: 'About - Sixteen Clothing' }, // Title untuk rute ini
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login - Sixteen Clothing' }, // Title untuk rute ini
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { title: 'register - Sixteen Clothing' }, // Title untuk rute ini
    },
    {
      path: '/products',
      name: 'product',      
      component: ProductView,
      meta: { title: 'Products - Sixteen Clothing' }, // Title untuk rute ini
    },
    {
      path: '/profileUser',
      name: 'profile',      
      component: ProfileUserView,
      meta: { title: 'Profile User - Sixteen Clothing' }, // Title untuk rute ini
    },
    {
      path: '/detail/:id',
      name: 'detail',
      props: true,
      component: DetailProduct,
      meta: { title: 'Detail - Sixteen Clothing' }, // Title untuk rute ini
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
