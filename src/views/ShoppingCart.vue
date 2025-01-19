<script setup>
import router from "@/router";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from "@/stores/Cart";
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======
>>>>>>> 09455d458d42311d3de0785e196de13fe96210c2

const authStore = useAuthStore();
const cartStore = useCartStore();
const user = ref({ ...authStore.user });

<<<<<<< HEAD
// console.log(authStore.user.address);  // Jika 'name' ada dalam objek user
=======
console.log(authStore.user.address);  // Jika 'name' ada dalam objek user
>>>>>>> 09455d458d42311d3de0785e196de13fe96210c2


const removeItem = async (id) => {
  try {
    const response = await axios.delete(`http://wiguns-backend.test/api/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    console.log("Item removed successfully:", response.data);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

// Format mata uang
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace('Rp', 'Rp.');
};

// Fungsi checkout
const checkout = async () => {
  try {
    const transactionTotal = cartStore.total;

    // Mengirim permintaan untuk membuat transaksi
    const transactionResponse = await axios.post('http://wiguns-backend.test/api/checkout', {
      transaction: {
        uuid: `TRX${Date.now()}`,
        user_id: authStore.user.id,
        transaction_status: 'pending',
        transaction_total: transactionTotal,
      },

      transaction_details: cartStore.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }))
    }, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });


    // console.log("Transaction successful:", transactionResponse.data.datdsdsddsdsda);
    // console.log("Transaction successful:", transactionResponse.data.user);
    // console.log("Transaction successful:", transactionResponse.data.data2);
    // console.log("ini untuk product :", transactionResponse.data.itemDetails);

    // console.log("ini untuk product :", transactionResponse.data.firstName);
    // console.log("ini untuk product :", transactionResponse.data.lastName);

    const paymentUrl = transactionResponse.data.paymentUrl;
    if (paymentUrl) {

      window.location.href = paymentUrl;
    } else {
      console.error("Tidak ada URL pembayaran yang diberikan.");
      alert("Kesalahan: Tidak ada URL pembayaran yang diberikan.");
    }

  } catch (error) {
    console.error("Error during checkout:", error);
    alert("Terjadi kesalahan saat melakukan transaksi: " + error.message);
  }
};

const urlStorage = (url) => {
  if (url.includes('/storage/')) {
    return url.replace('/storage/', '/storage/assets/product/');
  }
  return url;
}

const increaseQuantity = async (id) => {
  // Mengambil data item untuk keperluan debugging/logging
  const itemData = cartStore.items.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity + 1,
  }));

  console.log("Current cart items:", itemData[0]); // Hanya untuk debugging

  try {
    // Mengirimkan permintaan untuk menambah quantity produk
    const response = await axios.put(
      `http://wiguns-backend.test/api/carts/${id}`,
      itemData[0],  // Mengirimkan objek itemData[0]
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`, // Token otorisasi
        },
      }
    );
    console.log("Item quantity increased:", response.data);
    cartStore.fetchCart(); // Memuat ulang data keranjang
  } catch (error) {
    console.error("Error increasing item quantity:", error.response?.data || error.message);
  }
};

const decreaseQuantity = async (id) => {
  // Mengambil data item untuk keperluan debugging/logging
  const itemData = cartStore.items.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity - 1,
  }));

  console.log("Current cart items:", itemData[0]); // Hanya untuk debugging

  try {
    // Mengirimkan permintaan untuk menambah quantity produk
    const response = await axios.put(
      `http://wiguns-backend.test/api/carts/${id}`,
      itemData[0],  // Mengirimkan objek itemData[0]
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`, // Token otorisasi
        },
      }
    );
    console.log("Item quantity increased:", response.data);
    cartStore.fetchCart(); // Memuat ulang data keranjang
  } catch (error) {
    console.error("Error increasing item quantity:", error.response?.data || error.message);
  }
};


// Pastikan `useCartStore` digunakan dengan benar


onMounted(() => {
  if (!authStore.user) {
<<<<<<< HEAD
    Swal.fire({
      title: "You are not allowed to access",
      text: "You need to log in first.",
      icon: "error",
      showConfirmButton: false,
      timer: 2500,
    });
=======
>>>>>>> 09455d458d42311d3de0785e196de13fe96210c2
    router.push("/");
  }
  cartStore.fetchCart();

  const script = document.createElement('script');
  script.src = "https://app.midtrans.com/snap/snap.js";
  script.setAttribute('data-client-key', 'SB-Mid-client-tIYEa5vhFG3DM4hE');
  script.async = true;
  document.body.appendChild(script);
});
</script>

<template>
  <div class="container my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Product Details
        </li>
        <li class="ms-auto">
          <h4><i class="bi bi-cart-plus"></i></h4>
        </li>
      </ol>
    </nav>

    <section class="store-cart">
      <div class="container">
        <div class="row" data-aos="fade-up" data-aos-delay="100">
          <div class="col-12 table-responsive">
            <table class="table table-bordered table-cart">
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name &amp; Seller</td>
                  <td>Price</td>
                  <td>Jumlah</td>
                  <td>Aksi</td>
                </tr>
              </thead>
              <tbody>
                <template v-if="cartStore.items.length > 0">
                  <tr v-for="item in cartStore.items" :key="item.id">
                    <td>
                      <img :src="urlStorage(item.product.galleries[0].photo)" alt="Product Image" class="img-thumbnail"
                        style="width: 200px; height: 150px;" />
                    </td>
                    <td>
                      <div class="product-title">{{ item.product.name }}</div>
                      <div class="product-subtitle">{{ item.product.seller }}</div>
                    </td>
                    <td>
                      <div class="product-title">{{ formatCurrency(item.price) }}</div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
<<<<<<< HEAD
                        <button v-if="item.quantity > 1" class="btn btn-secondary btn-sm"
                          @click="decreaseQuantity(item.id)">
                          -
                        </button>

                        <button v-if="item.quantity <= 1" class="btn btn-secondary btn-sm" disabled>
                          -
                        </button>
=======
                        <button
  v-if="item.quantity > 1"
  class="btn btn-secondary btn-sm"
  @click="decreaseQuantity(item.id)"
>
  -
</button>

<button
  v-if="item.quantity <= 1"
  class="btn btn-secondary btn-sm"
  disabled
>
  -
</button>
>>>>>>> 09455d458d42311d3de0785e196de13fe96210c2

                        <span class="px-2">{{ item.quantity }}</span>
                        <button class="btn btn-secondary btn-sm" @click="increaseQuantity(item.id)">+</button>
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Remove {{ item.id }}</button>
                    </td>
                  </tr>
                </template>
<<<<<<< HEAD

=======
>>>>>>> 09455d458d42311d3de0785e196de13fe96210c2
                <tr>
                  <td colspan="4" class="text-center align-content-center">Total Harga <b>{{
                    formatCurrency(cartStore.total) }}</b>
                  </td>
<<<<<<< HEAD
                  <!-- <td v-if="authStore.user.address == null"> -->
                  <td v-if="authStore.user">
                    <span v-if="authStore.user.address === null">
                      <button class="btn btn-warning" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">Checkout</button>
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              <p class="text-dark">Alamat belum diisi, silahkan pergi ke halaman
                                <a @click="goToProfile" href="#" class="text-primary">Profile User</a>
                                untuk isi alamat pengiriman anda!
                              </p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>

=======
                  <td v-if="authStore.user.address == null">
                    <button class="btn btn-warning" data-bs-toggle="modal"
                      data-bs-target="#exampleModal">Checkout</button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <p class="text-dark">Alamat belum diisi, silahkan pergi ke halaman
                              <a @click="goToProfile" href="#" class="text-primary">Profile User</a>
                              untuk isi alamat pengiriman anda!
                            </p>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
>>>>>>> 09455d458d42311d3de0785e196de13fe96210c2
                  </td>
                  <td v-else>
                    <button class="btn btn-success" @click="checkout()">Checkout</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="snap-container"></div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    goToProfile() {
      const modal = document.querySelector('.modal');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
      this.$router.push('/profileUser');
    }
  }
}
</script>
