<script setup>
import { createApp, ref, onMounted } from "vue";
import HeaderClothes from "@/components/HeaderClothes.vue";
import axios from "axios";
const getAllProducts = ref([]);
const getAllCategories = ref([]);
const getCategories = () => {
  axios.get('http://wiguns-backend.test/api/category')
    .then(function (response) {
      getAllCategories.value = response.data;
      console.log('Kategori yang didapat:', getAllCategories.value);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });

}

onMounted(() => {
  getCategories(); // Memanggil getCategories untuk mendapatkan kategori
  axios
    .get("http://wiguns-backend.test/api/products")
    .then((response) => {
      getAllProducts.value = response.data.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
});
const truncateDescription = (description) => {
  const maxLength = 150;
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
}
</script>

<template>
  <HeaderClothes />
  <div class="page-heading products-heading header-text">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-content">
            <h4>new arrivals</h4>
            <h2>sixteen products</h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="products">
    <div class="container">

      <div class="row">
        <div class="col-md-12">
          <div class="filters">
            <ul>
              <li class="active" data-filter="*">All Products</li>
              <li v-for="categoryItem in getAllCategories" :key="categoryItem.id" :data-filter="categoryItem.name">
                {{ categoryItem.name }}
              </li>
            </ul>
            
          </div>
        </div>


        <div v-if="getAllProducts.length > 0">

          <div class="col-md-12">
            <div class="filters-content">
              <div class="row grid">
                <div class="col-lg-4 col-md-4 all des" v-for="product in getAllProducts" :key="product.id">
                  <div class="product-item">
                    <router-link v-bind:to="`/detail/${product.id}`">
                      <img v-bind:src="product.galleries[0].photo" alt="fsdf" class="pt-2" />
                    </router-link>
                    <h1>{{ product.photo }}</h1>

                    <!-- <h1>{{product.category.name}}</h1> -->

                    <div class="down-content">
                      <div style="height: 35px;">
                        <div class="d-flex flex-column">
                          <h4 class="lh-sm">{{ product.name }}</h4>
                          <h4 class="lh-sm text-black">Kategori: {{ product.category.name }}</h4>
                        </div>
                        <h6 class="pt-4 text-black">Rp. {{ product.price }}</h6>
                      </div>
                      <p v-html="truncateDescription(product.description)"></p>

                      <div class="d-flex justify-content-between align-items-center">
                        <router-link v-bind:to="`/detail/${product.id}`">
                          <button class="btn btn-danger">Buy</button>
                        </router-link>
                        <span>Reviews (21)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- dd -->
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1>sajdsj</h1>
        </div>
      </div>
    </div>
  </div>
</template>