<script setup>
import { ref, onMounted } from "vue";
import HeaderClothes from "@/components/HeaderClothes.vue";
import axios from "axios";
import { computed } from "vue";
import { useRoute } from "vue-router";
import Footer from "@/components/Footer.vue";
import AOS from 'aos';

const getAllProducts = ref([]);
const getAllCategories = ref([]);
const getAllBanners = ref([]);
const selectedFilter = ref("all");

// Menggunakan useRoute untuk mendapatkan URL saat ini
const route = useRoute();
const currentUrl = ref(route.fullPath); // Mendapatkan path saat ini
let NewCurrentUrl = currentUrl.value.replace('/', '');


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


const getCategories = () => {
  axios.get("http://wiguns-backend.test/api/category")
    .then((response) => {
      getAllCategories.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

AOS.init();

onMounted(() => {
  window.scrollTo(0, 0);

  getBanner();
  getCategories();
  axios.get("http://wiguns-backend.test/api/products")
    .then((response) => {
      getAllProducts.value = response.data.data;
      console.log(response);

      console.log(getAllProducts.value);
    })
    .catch((error) => {
      console.log(error);
    });
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price).replace("IDR", "").trim();
};

const truncateDescription = (description) => {
  const maxLength = 150;
  return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
};

const filteredProducts = computed(() => {
  if (selectedFilter.value === "all") {
    return getAllProducts.value;
  }
  return getAllProducts.value.filter(
    (product) => product.category.name === selectedFilter.value
  );
});



const urlStorage = (url) => {
  if (url?.includes('/storage/')) {
    return url.replace('/storage/', '/storage/assets/product/');
  }
  return url;
};

</script>

<template>
  <HeaderClothes />
  <div class="page-heading about-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-content">
            <h4>{{ NewCurrentUrl }}</h4>
            <div v-for="banner in getAllBanners" :key="banner.id">
              <h2>{{ banner.content }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="products py-5 md:py-0">
    <div class="container">
      <!-- Filters Section -->
      <div class="filters mb-4">
        <ul class="nav nav-pills justify-content-center">
          <!-- Filter All Products -->
          <li class="nav-item">
            <a class="nav-link" :class="{ active: selectedFilter === 'all' }" @click="selectedFilter = 'all'">
              All Products
            </a>
          </li>
          <!-- Filter Categories -->
          <li class="nav-item" v-for="categoryItem in getAllCategories" :key="categoryItem.id">
            <a class="nav-link" :class="{ active: selectedFilter === categoryItem.name }"
              @click="selectedFilter = categoryItem.name">
              {{ categoryItem.name }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Product Grid -->
      <div class="row g-4">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="product in filteredProducts" :key="product.id"
          data-aos="fade-up" data-aos-duration="2000">
          <div class="card h-100 shadow-sm">
            <!-- Product Image -->
            <img :src="urlStorage(product.galleries?.[0]?.photo)" alt="Product Image"
              class="card-img-top img-fluid rounded-top-5 image-product" />
            <p>{{ urlStorage(product.galleries?.[0]?.photo) }}</p>
            <!-- Product Details -->
            <div class="card-body d-flex flex-column">
              <!-- Product Name -->
              <h5 class="card-title font-bold text-truncate">{{ product.name }}</h5>
              <!-- Price and Category Icons -->
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

  <Footer />
</template>





<style>
.filter-btn {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
}

.filter-btn.active {
  background-color: #dc3545;
  color: #fff;
}

.icon-category {
  display: flex;
  justify-content: center;
  height: 35px;
  width: 35px;
  line-height: 35px;
  border-radius: 50%;
  background: rgb(214, 210, 210);
}

i.icon-category {
  text-align: center;
  font-size: 1.5rem;
}
</style>
