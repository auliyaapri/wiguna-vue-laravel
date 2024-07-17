<script setup>
import Footer from "./Footer.vue";
import { ref } from "vue";

const images = ref([
  "https://images.unsplash.com/photo-1721109890030-00faaa68981f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1720831992796-dfce4a96e885?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]);

const mainImageUrl = ref(images.value[0]);
// Untuk thumbnail
const activeThumbnail = ref(mainImageUrl.value);

// Fungsi untuk mengubah URL gambar utama dan thumbnail yang aktif
const changeMainImage = (url) => {
  mainImageUrl.value = url;
  activeThumbnail.value = url; // Set thumbnail aktif
};
</script>


<template>
  <div class="container my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">
          Product Details
        </li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-md-7">
        <img :src="mainImageUrl" class="img-fluid mb-3" alt="Product Image" />
        <div class="row thumbnail-images">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="col-3"
            @click="changeMainImage(image)"
          >
            <img
              :src="image"
              class="img-thumbnail"
              :class="{ active: activeThumbnail === image }"
              :alt="'Thumbnail ' + (index + 1)"
            />
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="product-title">Sofa Ternyaman</div>
        <div class="product-author">By Galih Pratama</div>
        <div class="product-price">$1,409</div>
        <div class="product-description">
          The Nike Air Max 720 SE goes bigger than ever before with Nike's
          tallest Air unit yet for unimaginable, all-day comfort. There's super
          breathable fabrics on the upper, while colours add a modern edge.
        </div>
        <div class="product-description">
          Bring the past into the future with the Nike Air Max 2090, a bold look
          inspired by the DNA of the iconic Air Max 90. Brand-new Nike Air
          cushioning underfoot adds unparalleled comfort while transparent mesh
          and vibrantly coloured details on the upper are blended with timeless
          OG features for an edgy, modernised look.
        </div>
        <button class="btn btn-success mt-3">Add to Cart</button>
      </div>
    </div>

    <div class="review-title">Customer Review (3)</div>
    <div class="review">
      <div class="review-author">Hazza Risky</div>
      <div class="review-content">
        I thought it was not good for living room. I really happy to decided buy
        this product last week now feels like homey.
      </div>
    </div>
    <div class="review">
      <div class="review-author">Anna Sukkirata</div>
      <div class="review-content">
        Color is great with the minimalist concept. Even I thought it was made
        by Cactus industry. I do really satisfied with this.
      </div>
    </div>
    <div class="review">
      <div class="review-author">Dakimu Wangi</div>
      <div class="review-content">
        When I saw at first, it was really awesome to have with. Just let me
        know if there is another upcoming product like this.
      </div>
    </div>
  </div>

  <Footer />
</template>

<style>
body {
  font-family: Arial, sans-serif;
}
.product-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.product-author {
  color: #888;
  margin-bottom: 20px;
}
.product-price {
  font-size: 1.5rem;
  color: red;
}
.product-description {
  margin-top: 20px;
}
.review-title {
  font-weight: bold;
  margin-top: 40px;
}
.review {
  margin-top: 20px;
}
.review-author {
  font-weight: bold;
}
.review-content {
  margin-left: 20px;
}
.thumbnail-images img {
  width: 100%;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>