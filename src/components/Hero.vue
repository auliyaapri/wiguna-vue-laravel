<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";


// const currentUrl = ref("");
// let NewCurrentUrl = 'home';
const route = useRoute();
const currentUrl = ref(route.fullPath); // Mendapatkan path saat ini
let NewCurrentUrl = currentUrl.value.replace('/', 'home');
const getAllProducts = ref([]);
const getAllBanners = ref([]);

const getBanner = () => {
  axios.get("http://wiguns-backend.test/api/banner")
    .then((response) => {
      const filteredBanners = response.data.data.filter(banner => banner.page === NewCurrentUrl);
      getAllBanners.value = filteredBanners;      
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  getBanner();
})
</script>
<template>
  <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner banner header-text">
      <div v-for="(banner, index) in getAllBanners" :key="banner.id"
        :class="['carousel-item', `banner-item-0${index + 1}`, { active: index === 0 }]" >
        <div class="text-content">
          <h4>{{ banner.title }}</h4>
          <h2>{{ banner.content }}</h2>
        </div>
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
