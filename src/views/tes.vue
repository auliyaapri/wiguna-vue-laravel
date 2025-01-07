<script setup>
import { ref, onMounted } from "vue";
import HeaderClothes from "@/components/HeaderClothes.vue";
import axios from "axios";

const getAllProducts = ref([]); // Produk yang dimuat dari API
const getAllCategories = ref([]); // Kategori yang dimuat dari API
const selectedFilter = ref("all"); // Filter yang dipilih (default: all)

// Ambil data kategori dari API
const getCategories = () => {
  axios.get("http://wiguns-backend.test/api/category")
    .then((response) => {
      getAllCategories.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Ambil data produk dari API
onMounted(() => {
  getCategories();
  axios.get("http://wiguns-backend.test/api/products")
    .then((response) => {
      getAllProducts.value = response.data.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
});

// Format harga untuk menampilkan dalam format Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price).replace("IDR", "").trim();
};

// Potong deskripsi panjang
const truncateDescription = (description) => {
  const maxLength = 150;
  return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
};

// Produk yang difilter berdasarkan kategori
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
  <div class="products">
    <div class="container">
      <!-- Filter Kategori -->
      <div class="filters">
        <ul>
          <li
            class="filter-btn"
            :class="{ active: selectedFilter === 'all' }"
            @click="selectedFilter = 'all'"
          >
            All Products
          </li>
          <li
            class="filter-btn"
            v-for="category in getAllCategories"
            :key="category.id"
            :class="{ active: selectedFilter === category.name }"
            @click="selectedFilter = category.name"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>

      <!-- Daftar Produk -->
      <div class="row grid">
        <div
          class="col-lg-4 col-md-4 item"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <div class="product-item">
            <img :src="product.galleries?.[0]?.photo" alt="Product Image" />
            <div class="down-content">
              <h4>{{ product.name }}</h4>
              <h6>Rp. {{ formatPrice(product.price) }}</h6>
              <p>{{ truncateDescription(product.description) }}</p>
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
</style>
