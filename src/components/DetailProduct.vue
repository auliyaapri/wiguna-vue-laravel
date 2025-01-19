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
const idProduct = route.params.id;
const images = ref([]);
const mainImageUrl = ref(images.value[0]);
const quantity = ref(0);
const productDetails = ref({});
const activeThumbnail = ref(null);
const jumlah = ref(1);
// console.log(jumlahKeranjang);



// Fungsi untuk mengubah URL gambar utama dan thumbnail yang aktif
const changeMainImage = (url) => {
  mainImageUrl.value = url;
  activeThumbnail.value = url;
  console.log("+++++++++++++++++++++++");

  console.log(activeThumbnail);
};

const checkQuantity = () => {
  const inputRealtime = jumlah.value;
  console.log(`Jumlah yang diinput:`, inputRealtime);

  if (jumlah.value > quantity.value) {
    jumlah.value = quantity.value;
  } else if (jumlah.value < 1) {
    jumlah.value = 1
  }
  

}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace('IDR', '')
    .trim();
};

const saveKeranjang = async (product, priceProduct, jumlahInput) => {

  let productStored = {
    product_id: product,
    quantity: jumlahInput,
    price: priceProduct,
  };
  console.log('okeeeep', productStored);

  try {
   
    const response = await axios.post(
      'http://wiguns-backend.test/api/carts',
      productStored,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        }
      }
    );


    console.log("Response:", response.data);
    if (response.data.status === 'success') {
      productDetails.value.quantity -= jumlahInput;
      alert('Berhasil menambahkan ke keranjang');
    } else {
      alert('Terjadi kesalahan saat menambahkan ke keranjang.');
    }
    window.location.reload();

  } catch (error) {
    console.error("Error:", error);
    alert('Terjadi kesalahan saat mengirim data.');
  }
};

// const urlStorage = (urlStorage) => {
//     if (urlStorage.includes('/storage/')) {
//         return urlStorage.replace('/storage/', '/storage/assets/product/');
//       }
//       return urlStorage;
// }


const urlStorage = (urlStorage) => {
  // Pastikan nilai bukan undefined atau null
  if (!urlStorage) return ''; 

  // Lakukan replace hanya jika '/storage/' ditemukan dalam string
  if (urlStorage.includes('/storage/')) {
    return urlStorage.replace('/storage/', '/storage/assets/product/');
  }

  // Kembalikan URL asli jika tidak ada perubahan
  return urlStorage;
};




onMounted(() => {

  if (!authStore.token) {
    const disabledButton = document.getElementById('addToCart');
    if (disabledButton) {
      disabledButton.classList.add('disabled');
    }
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


}); // end


</script>

<template>
  <br>
  <br>
  <br>
  <HeaderClothes :jumlahKeranjang="jumlahKeranjang" />


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

    <p>{{ urlStorage(mainImageUrl) }}</p>
    <div class="row">
      <div class="col-md-7">
        <img :src="urlStorage(mainImageUrl)" class="img-fluid mb-3 rounded-5" alt="Product Image" />
        <div class="row thumbnail-images">
          <div v-for="(image, index) in images" :key="index" class="col-3" @click="changeMainImage(image)">
            <img :src="urlStorage(image)" class="img-thumbnail rounded-2" :class="{ active: activeThumbnail === image }"
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
          <div class="product-price">{{ formatPrice(productDetails.price) }}</div>
          <div class="product-author">Stok : {{ productDetails.quantity }}</div>
        </div>
        <div class="product-description" v-html="productDetails.description"></div>
        <div class="d-flex align-items-center">
          <div class="mt-3">            
            <input type="number" class="form-control w-75" v-model="jumlah" @input="checkQuantity" min="1" />

          </div>


          <!-- Button di template -->
          <button id="addToCart" class="btn btn-success mt-3" @click="
            saveKeranjang(
              productDetails.id,
              productDetails.price,
              jumlah
            )
            ">
            Add to Cart
          </button>
        </div>
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