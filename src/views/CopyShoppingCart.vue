<script setup>
import router from "@/router";
import axios from "axios";
import { ref, onMounted, watch, toRaw } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from "@/stores/Cart";

const authStore = useAuthStore();
console.log('Token:', authStore.token);


const cartStore = useCartStore();

const user = ref({ ...authStore.user });
const totalHarga = ref(0);
const pajak = ref(0);


const removeItem = async (id) => {
  try {
    const response = await axios.delete(`http://wiguns-backend.test/api/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    console.log("Item removed successfully:", response.data);
    // window.location.reload();
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,  // Mengatur agar tidak ada angka desimal
    maximumFractionDigits: 0,
  }).format(value).replace('Rp', 'Rp.');
};


const checkout = async () => {
  try {
    // Menghitung total harga dan pajak
    const transactionTotal = cartStore.total; // Total dari cart
    // const pajakValue = total * 0.1; // Menghitung pajak 10%
    // const transactionTotal = total + pajakValue; // Total akhir

    // Mengirim data transaksi ke API
    const transactionResponse = await axios.post('http://wiguns-backend.test/api/transactions', {
      // Payload yang dikirim ke API
      transaction: {
        uuid: `TRX${Date.now()}`, // UUID yang unik
        user_id: authStore.user.id, // Menggunakan ID pengguna yang login
        transaction_status: 'UNPAID', // Status transaksi
        transaction_total: transactionTotal, // Total transaksi
      },
      transaction_details: cartStore.items.map(item => ({
        product_id: item.product_id, // ID produk
        quantity: item.quantity, // Jumlah produk
      }))
    }, {
      headers: {
        Authorization: `Bearer ${authStore.token}`, // Menyertakan token otentikasi
      },
    });

    console.log("Transaction successful:", transactionResponse.data);
    const snapToken = transactionResponse.data.snapToken;

    if (snapToken) {
      // Menggunakan snap.embed untuk menampilkan pembayaran
      window.snap.embed(snapToken, {
        embedId: 'snap-container', // ID elemen kontainer untuk menampilkan pembayaran
        onSuccess: function (result) {
          console.log('Payment Success!', result);
          alert("Pembayaran berhasil!");
          cartStore.clearCart(); // Mengosongkan keranjang
        },
        onPending: function (result) {
          console.log('Waiting for payment confirmation!', result);
          alert("Pembayaran masih menunggu konfirmasi.");
        },
        onError: function (result) {
          console.log('Payment Failed!', result);
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: function () {
          alert('Anda menutup pop-up tanpa menyelesaikan pembayaran');
        }
      });
    } else {
      console.error("Snap token tidak valid");
      alert("Kesalahan: Snap token tidak valid.");
    }

  } catch (error) {
    console.error("Error during checkout:", error);
    alert("Terjadi kesalahan saat melakukan transaksi: " + error.message);
  }

  // Reset keranjang setelah transaksi berhasil
  // cartStore.clearCart(); // Pastikan Anda memiliki metode untuk mengosongkan keranjang

  // Tampilkan pesan sukses atau redirect
  // alert("Transaksi berhasil! ID Transaksi: " + transactionResponse.data.transaction.uuid);
  // router.push('/'); // Redirect ke halaman utama atau halaman yang diinginkan

};


// Lifecycle hook yang dijalankan saat komponen di-mount
onMounted(() => {
  if (authStore.user) {
  } else {
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
    <nav aria-label="breadcrumb" class="">
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
  </div>

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
                  <!-- Kolom jumlah produk -->
                  <td>
                    <div class="d-flex align-items-center">
                      <button class="btn btn-secondary btn-sm" @click="decreaseQuantity(item.id)">-</button>
                      <span class="px-2">{{ item.quantity }}</span>
                      <button class="btn btn-secondary btn-sm" @click="increaseQuantity(item.id)">+</button>
                    </div>
                  </td>
                  <!-- Kolom menu aksi -->
                  <td>
                    <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Remove {{ item.id }}</button>
                  </td>
                </tr>

              </template>
              <tr>
                <td colspan="4" class="text-center align-content-center">Total Harga <b>{{
                  formatCurrency(cartStore.total) }}</b>
                </td>
                <td><button class="btn btn-success" @click="checkout()">Checkout</button> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Table 2 -->
        <div class="col-12">
          <h4>Alamat Anda</h4>
          <div class="mb-3 mt-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="user.name" disabled />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              v-model="user.email" disabled />
          </div>
          <div class="mb-3">
            <label for="noHp" class="form-label">No HP</label>
            <input type="text" class="form-control" id="noHp" v-model="user.no_hp" disabled />
          </div>
          <div class="mb-3">
            <label for="zip" class="form-label">Kode Pos</label>
            <input type="text" class="form-control" id="zip" v-model="user.zip_code" disabled />
          </div>
          <div class="mb-3">
            <label for="state" class="form-label">Alamat Lengkap</label>
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
              style="height: 100px" v-model="user.address" disabled></textarea>
          </div>
          <router-link></router-link>
          <router-link class="btn btn-warning" to="/profileUser"><i class="fas fa-pencil-square"></i> Edit</router-link>
        </div>

      </div>
      <div id="snap-container"></div>
    </div>
  </section>
</template>
