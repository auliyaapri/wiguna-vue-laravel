<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const currentUrl = ref();
const router = useRouter();

onMounted(() => {
  currentUrl.value = window.location.href;
});

</script>


<!-- About.vue -->
<template>
     <header class="fixed-top">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="/"><h2>Sixteen <em>Clothing</em></h2></a>          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item" :class="{'active':router.currentRoute.value.path === '/'}" >
                <a class="nav-link" href="/">Home
                  <span class="sr-only">(current)</span>
                </a>
              </li> 

              <li class="nav-item" :class="{'active':router.currentRoute.value.path === '/products'}" >
                <a class="nav-link" href="products">Our Products</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact Us</a>
              </li>

              <h4 class="align-content-center ps-4 pb-2"><i class="text-white bi bi-cart-plus"></i> <span class="text-warning">1</span></h4>
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
    
    

  </template>
