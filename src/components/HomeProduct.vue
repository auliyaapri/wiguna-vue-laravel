<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const currentUrl = ref('');

onMounted(() => {
  currentUrl.value = window.location.href;

});
</script>
<template>
  
  
  <div class="latest-products">
    <div class="container">
      <div class="row">
        <div class="col-md-12" data-aos="fade-down">
          <div class="section-heading" data-aos="fade-up">
            <h2>Latest Products</h2>            
            <!-- {{ window.location.href }} -->
            <a href="products.html"
              >view all products <i class="fa fa-angle-right"></i
            ></a>
          </div>
        </div>
        <div class="col-md-4">
          <RouterLink to="/detail">
          <div class="product-item">
            <a href="#"><img src="@/assets/img/product_02.jpg" alt="" /></a>
            <div class="down-content">
              <a href="#"><h4>Tittle goes here</h4></a>
              <h6>$30.25</h6>
              <p>
                Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis
                nulla aspernatur.
              </p>
              <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
              </ul>
              <span>Reviews (21)</span>
            </div>
          </div>
        </RouterLink>
        </div>
        <div class="col-md-4">
          <RouterLink to="/detail">
          <div class="product-item">
            <a href="#"><img src="@/assets/img/product_02.jpg" alt="" /></a>
            <div class="down-content">
              <a href="#"><h4>Tittle goes here</h4></a>
              <h6>$30.25</h6>
              <p>
                Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis
                nulla aspernatur.
              </p>
              <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
              </ul>
              <span>Reviews (21)</span>
            </div>
          </div>
        </RouterLink>
        </div>

        <div class="col-md-4">
          <RouterLink to="/detail">
          <div class="product-item">
            <a href="#"><img src="@/assets/img/product_02.jpg" alt="" /></a>
            <div class="down-content">
              <a href="#"><h4>Tittle goes here</h4></a>
              <h6>$30.25</h6>
              <p>
                Lorem ipsume dolor sit amet, adipisicing elite. Itaque, corporis
                nulla aspernatur.
              </p>
              <ul class="stars">
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
              </ul>
              <span>Reviews (21)</span>
            </div>
          </div>
        </RouterLink>
        </div>
     
      </div>
    </div>
  </div>
</template>

<!-- https://drive.google.com/drive/folders/1agW61K1K1ej-YilSc8qNI8wU1G_N9tO4 2 -->