<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";

const currentUrl = ref("");
const getAllProducts = ref([]);

onMounted(() => {
  currentUrl.value = window.location.href;
  console.log(currentUrl.value); // Menampilkan currentUrl di console
  axios
    .get("http://wiguns-backend.test/api/products")
    .then((response) => {
      // handle success
      getAllProducts.value = response.data.data.data;
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
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
            <router-link to="/products">view all products <i class="fa fa-angle-right"></i></router-link>
          </div>
        </div>
        <div class="col-md-4" v-for="product in getAllProducts" :key="product.id">
          <!-- <RouterLink :to="`/detail/${product.id}`"> -->
          <RouterLink v-bind:to="`/detail/${product.id}`">
            <div class="product-item">
              <a href="#"><img v-bind:src="product.galleries[0].photo" alt="Image Product" /></a>
              <div class="down-content">
                <div style="height: 35px;">
                  <h4 class="lh-sm">{{ product.name }}</h4>
                  <h6 class="pt-4 text-black">Rp. {{ product.price }}</h6>
                </div>
                <p>
                  Lorem ipsume dolor sit amet, adipisicing elite. Itaque,
                  corporis nulla aspernatur.
                </p>
                <div class="d-flex justify-content-between align-items-center">
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
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- https://drive.google.com/drive/folders/1agW61K1K1ej-YilSc8qNI8wU1G_N9tO4 2 -->