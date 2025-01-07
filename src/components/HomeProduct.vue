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
      // console.log(response);
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
  <div class="latest-products">
    <div class="container">
      <div class="row">
        <div class="col-md-12" data-aos="fade-down">
          <div class="section-heading" data-aos="fade-up">
            <h2>Latest Products</h2>
            <router-link to="/products">view all products <i class="fa fa-angle-right"></i></router-link>
          </div>
        </div>
        <div class="col-lg-4 col-md-4 item" v-for="product in getAllProducts" :key="product.id">
          <div class="product-item">
            <img v-bind:src="product.galleries[0].photo" alt="Image Product" />
            <div class="down-content">
              <h4>{{ product.name }}</h4>
              <div class="d-flex justify-content-between align-items-center">
                <h5>{{ formatPrice(product.price) }}</h5>
                <i class="icon-category fas fa-male" v-if="product.category.name === 'Pakaian Pria'"></i>
                <i class="icon-category fas fa-female" v-if="product.category.name === 'Pakaian Wanita'"></i>
                <i class="icon-category fas fa-baby" v-if="product.category.name === 'Bayi'"></i>
              </div>
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
