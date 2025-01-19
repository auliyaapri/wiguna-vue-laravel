<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import AOS from 'aos';
const currentUrl = ref("");
const getAllProducts = ref([]);


const urlStorage = (url) => {
    if (url.includes('/storage/')) {
        return url.replace('/storage/', '/storage/assets/product/');
      }
      return url;
}

onMounted(() => {
  currentUrl.value = window.location.href;
  axios
    axios.get("http://wiguns-backend.test/api/productsHome")
    .then((response) => {
      getAllProducts.value = response.data.data;
      console.log(response);

      console.log(getAllProducts.value);
    })
    .catch((error) => {
      console.log(error);
    });
});

const truncateDescription = (description) => {
  const maxLength = 150;
  return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price).replace("IDR", "").trim();
};


</script>
<template>
  <div class="latest-products py-5 md:py-0" data-aos="fade-down" data-aos-duration="2000">
    <div class="container">
      <div class="row">
        <div class="col-md-12" data-aos="fade-down">
          <div class="section-heading" data-aos="fade-up">
            <h2 data-aos="fade-up">Latest Products</h2>
            <router-link to="/products">view all products <i class="fa fa-angle-right"></i></router-link>
          </div>
        </div>
<!-- 
        <div class="mt3">
          <div v-for="oe in getAllProducts" :key="oe.id">
            <h1>{{ oe.name }}</h1>

          </div>
          
        </div> -->


        <div class="mt-3 md:mt-0 col-12 col-lg-4 col-md-6 item" v-for="product in getAllProducts" :key="product.id">
          <div class="card h-100 shadow-sm rounded-5">
            <img :src="urlStorage(product.galleries[0].photo)" alt="Image Product" class="card-img-top rounded-top-5 img-fluid" data-aos="flip-up" />
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title font-bold text-truncate">{{ product.name }}</h5>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-primary">{{ formatPrice(product.price) }}</h6>
                <span>
                  <i class="fas fa-male text-secondary" v-if="product.category.name === 'Pakaian Pria'"></i>
                  <i class="fas fa-female text-secondary" v-if="product.category.name === 'Pakaian Wanita'"></i>
                  <i class="fas fa-baby text-secondary" v-if="product.category.name === 'Bayi'"></i>
                </span>
              </div>
              <p v-html="truncateDescription(product.description)" class="mb-2"></p>
              <router-link :to="`/detail/${product.id}`" class="mt-auto">
                <button class="btn btn-danger w-100">Buy</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
