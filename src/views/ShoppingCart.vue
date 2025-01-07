<script setup>
import router from "@/router";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from "@/stores/Cart";

const authStore = useAuthStore();
const cartStore = useCartStore();
const user = ref({ ...authStore.user });

// Fungsi untuk menghapus item dari keranjang
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
        uuid: `TRX${Date.now()}`, // UUID unik untuk transaksi
        user_id: authStore.user.id, // ID pengguna
        transaction_status: 'pending', // Status transaksi
        transaction_total: transactionTotal, // Total transaksi
      },
      transaction_details: cartStore.items.map(item => ({
        product_id: item.product_id, // ID produk
        quantity: item.quantity, // Jumlah produk
      }))
    }, {
      headers: {
        Authorization: `Bearer ${authStore.token}`, // Mengirimkan Bearer Token di header
      },
    });

    console.log("Transaction successful:", transactionResponse.data);

    const paymentUrl = transactionResponse.data.paymentUrl;
    console.log('Payment URL:', paymentUrl);

    if (paymentUrl) {
      // Redirect pengguna ke halaman pembayaran Midtrans
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
// Lifecycle hook yang dijalankan saat komponen di-mount
onMounted(() => {
  if (!authStore.user) {
    router.push("/");
  }
  cartStore.fetchCart();

  const script = document.createElement('script');
  script.src = "https://app.midtrans.com/snap/snap.js";
  script.setAttribute('data-client-key', 'SB-Mid-client-tIYEa5vhFG3DM4hE'); // Ganti dengan kunci klien Anda
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
                      <img :src="item.product.galleries[0].photo" alt="Product Image" class="img-thumbnail"
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
                        <button class="btn btn-secondary btn-sm" @click="decreaseQuantity(item.id)">-</button>
                        <span class="px-2">{{ item.quantity }}</span>
                        <button class="btn btn-secondary btn-sm" @click="increaseQuantity(item.id)">+</button>
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Remove {{ item.id }}</button>
                    </td>
                  </tr>
                </template>
                <tr>
                  <td colspan="4" class="text-center align-content-center">Total Harga <b>{{
                    formatCurrency(cartStore.total) }}</b>
                  </td>
                  <td><button class="btn btn-success" @click="checkout()">Checkout</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Kontainer untuk menampilkan pop-up pembayaran -->
      <div id="snap-container"></div>
    </section>
  </div>
</template>
