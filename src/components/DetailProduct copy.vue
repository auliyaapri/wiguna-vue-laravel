<script setup>
import { useRoute } from "vue-router";
import Footer from "./Footer.vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import HeaderClothes from "./HeaderClothes.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();





// Mendapatkan route saat ini dan mengambil parameter `id` dari URL
const route = useRoute();
const idProduct = route.params.id; // Mengakses parameter rute 'id' yang diterima
const images = ref([]);
const mainImageUrl = ref(images.value[0]);

const quantity = ref(0); // Menggunakan 0 sebagai nilai awal untuk quantity

const keranjangUser = ref([]);
const productDetails = ref({});
const activeThumbnail = ref(null); // Inisialisasi activeThumbnail dengan ref
const jumlah = ref(1);
const jumlahKeranjang = computed(() => keranjangUser.value.length);
// console.log(jumlahKeranjang);



// Fungsi untuk mengubah URL gambar utama dan thumbnail yang aktif
const changeMainImage = (url) => {
  mainImageUrl.value = url;
  activeThumbnail.value = url; // Set thumbnail aktif
  console.log("+++++++++++++++++++++++");

  console.log(activeThumbnail);
};

const checkQuantity = () => {
  const inputRealtime = jumlah.value;
  console.log(`Jumlah yang diinput:`, inputRealtime); // Menampilkan nilai secara real-time

  if (jumlah.value > quantity.value) {
    jumlah.value = quantity.value; // Batasi input agar tidak lebih dari stok    
  } else if (jumlah.value < 1) {
    jumlah.value = 1
  }
}

const saveKeranjang = (product, nameProduct, priceProduct, photoProduct, jumlahInput) => {
  let productStored = {
    id: product,
    name: nameProduct,
    quantity: jumlahInput,
    priceProduct: priceProduct,
    photoProduct: photoProduct,
  };

  
  keranjangUser.value.push(productStored);

  
  localStorage.setItem("keranjangUser", JSON.stringify(keranjangUser.value));
  
  console.log('Product saved:', productStored);
  console.log('All products in cart:', JSON.parse(localStorage.getItem("keranjangUser")));

  // window.location.reload(); // Reload halaman jika diperlukan, tetapi sebaiknya diletakkan setelah semua logika
};

onMounted(() => {
  
if (!authStore.token) {
  const okee = document.getElementById('addToCart');
  if (okee) {
    okee.classList.add('disabled');
  }
}
  const storedKeranjang = localStorage.getItem("keranjangUser");
  if (storedKeranjang) {
    keranjangUser.value = JSON.parse(storedKeranjang);
  }
  axios
    .get("http://wiguns-backend.test/api/products?id=" + idProduct)
    .then((response) => {
      // handle success
      const product = response.data.data;
      images.value = product.galleries;
      quantity.value = product.quantity;

      productDetails.value = response.data.data;
      images.value = product.galleries.map((gallery) => gallery.photo);
      if (images.value.length > 0) {
        mainImageUrl.value = images.value[0];
        activeThumbnail.value = images.value[0];
      }
      console.log(images.value);

      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <HeaderClothes :jumlahKeranjang="jumlahKeranjang" />
  <br />
  <br />

  <div class="container my-5 mt-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">
            <a>Home</a>
          </router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Product Details
        </li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-md-7">
        <img :src="mainImageUrl" class="img-fluid mb-3" alt="Product Image" />
        <div class="row thumbnail-images">
          <div v-for="(image, index) in images" :key="index" class="col-3" @click="changeMainImage(image)">
            <img :src="image" class="img-thumbnail" :class="{ active: activeThumbnail === image }"
              :alt="'Thumbnail ' + (index + 1)" />
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="d-flex justify-content-between">
        <div class="product-title">{{ productDetails.name }}</div>
        <div class="product-title" v-if="productDetails.category">{{ productDetails.category.name }}</div>
      </div>
        <!-- <div class="product-author">{{ productDetails.type }}</div> -->
        <div class="d-flex justify-content-between pt-2">
          <div class="product-price">Rp. {{ productDetails.price }}</div>
          <div class="product-author">Stok : {{ productDetails.quantity }}</div>
        </div>
        <div class="product-description" v-html="productDetails.description"></div>
        <div class="d-flex align-items-center">
          <div class="mt-3">
            <!-- <input type="number" class="form-control w-75" v-model="jumlah" @input="checkQuantity" /> -->
            <input type="number" class="form-control w-75" v-model="jumlah" @input="checkQuantity" min="1" />

          </div>


          <button id="addToCart" class="btn btn-success mt-3" @click="
            saveKeranjang(
              productDetails.id,
              productDetails.name,
              productDetails.price,
              productDetails.galleries[0].photo,
              jumlah
            )
            ">
            Add to Cart
          </button>

          <!-- <p>Jumlah yang dimasukkan: {{ jumlah }}</p> -->
        </div>
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
      <div class="review-author">Dakimdsadu Wangi</div>
      <div class="review-content">
        When I saw at first, it was really awesome to have with. Just let me
        know if there is another upcoming product like this. Lorem ipsum dolor
        sit amet consectetur, adipisicing elit. Alias natus placeat incidunt
        rerum quae voluptas neque laboriosam libero sequi officia?
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