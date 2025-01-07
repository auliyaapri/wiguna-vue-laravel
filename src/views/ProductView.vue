<script setup>
import { ref, onMounted } from "vue";
import HeaderClothes from "@/components/HeaderClothes.vue";
import axios from "axios";
import { computed } from "vue";
import Hero from "@/components/Hero.vue";
import { useRoute } from "vue-router";

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
      console.log(filteredBanners);
    })
    .catch((error) => {
      console.log(error);
    });
};


const getCategories = () => {
  axios.get("http://wiguns-backend.test/api/category")
    .then((response) => {
      getAllCategories.value = response.data;

      getAllCategories.value.forEach((category) => {
        // Menyimpan ikon kategori
        category.icon = getIconCategory(category.name)


      });
      console.log(iconCategories);
    })
    .catch((error) => {
      console.log(error);
    });
};



onMounted(() => {
  getBanner();
  getCategories();
  axios.get("http://wiguns-backend.test/api/products")
    .then((response) => {
      getAllProducts.value = response.data.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log("Current URL:", currentUrl.value);  // Logging URL saat mounted

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

</script>

<template>
  <HeaderClothes />
  <div class="page-heading about-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-content">
            <h4>{{ NewCurrentUrl }}</h4>
            <!-- <h2>{{ getAllBanners }}</h2> -->
            <div v-for="banner in getAllBanners" :key="banner.id">
              <h2>{{ banner.content }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="products">
    <div class="container">
      <div class="filters">
        <ul>

          <li class="filter-btn" :class="{ active: selectedFilter === 'all' }" @click="selectedFilter = 'all'">
            All Products
          </li>

          <li class="filter-btn filter-text" v-for="categoryItem in getAllCategories" :key="categoryItem.id"
            :data-filter="categoryItem.name" :class="{ active: selectedFilter === categoryItem.name }"
            @click="selectedFilter = categoryItem.name">
            {{ categoryItem.name }}
          </li>
        </ul>
      </div>


      <!-- Daftar Produk -->
      <div class="row grid">
        <div class="col-lg-4 col-md-4 item" v-for="product in filteredProducts" :key="product.id">
          <div class="product-item">
            <img :src="product.galleries?.[0]?.photo" alt="Product Image" />
            <div class="down-content">
              <h4>{{ product.name }}</h4>
              <div class="d-flex justify-content-between align-items-center">
                <h5>{{ formatPrice(product.price) }}</h5>
                <!-- <h4>{{ product.category.name }}</h4> -->
                <!-- <i v-if="product.category.name == product.category.name" :class="'fa' + getIconCategory(product.category.name)"></i> -->
                <i class="icon-category fas fa-male" v-if="product.category.name === 'Pakaian Pria'"></i>
                <i class="icon-category fas fa-female" v-if="product.category.name === 'Pakaian Wanita'"></i>
                <i class="icon-category fas fa-baby" v-if="product.category.name === 'Bayi'"></i>
              </div>
              <!-- <p>{{ truncateDescription(product.description) }}</p> -->
              <p v-html="truncateDescription(product.description)"></p>
              <router-link :to="`/detail/${product.id}`">
                <button class="btn btn-danger">Buy</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  background: rgb(214, 210, 210);
  padding: .6rem;
  border-radius: 10px;
}

i.icon-category {
  text-align: center;
  font-size: 1.2rem;
}
</style>
