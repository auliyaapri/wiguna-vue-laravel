<script setup>
import router from "@/router";
import axios from "axios";
import { ref, onMounted, watch, toRaw } from "vue";
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from "@/stores/Cart";

// State untuk menyimpan jumlah item dalam keranjang
// const keranjangUser = ref([]);
const authStore = useAuthStore(); // Inisialisasi store

// ==== Untuk melihat keranjang berdasarkan token login 
const cartStore = useCartStore();

const user = ref({ ...authStore.user }); // Salin data pengguna
const totalHarga = ref(0);
const pajak = ref(0);


// Lifecycle hook yang dijalankan saat komponen di-mount
onMounted(() => {

  cartStore.fetchCart(); //

  // Ambil data keranjang dari localStorage
  // const storedKeranjang = localStorage.getItem("keranjangUser");
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
      <!-- Table -->
      <div class="row" data-aos="fade-up" data-aos-delay="100">
        <div class="col-8 table-responsive">
          <h3>User yang sekarang login <div class="text-danger"> {{ user.name }}</div>
          </h3>

          <table class="table table-bordered table-cart">
            <thead>
              <tr>
                <td>Image</td>
                <td>Name &amp; Seller</td>
                <td>Price</td>
                <td>Jumlah</td>
                <td>Menu</td>
              </tr>
            </thead>

            <tbody>
              <div v-if="cartStore.items.length > 0">


                <tr v-for="item in cartStore.items" :key="item.id">
          
                  <td style="width: 35%">
                    <div class="product-title">{{ item.name }}</div>
                    <div class="product-subtitle">By Andi Sukka</div>
                  </td>
                  <td style="width: 35%">
                    <div class="product-title">{{ item.priceProduct }}</div>
                    <div class="product-subtitle">USD</div>
                  </td>
                  <!-- <td>{{ item.quantity}}</td> -->
                  <td>
                    <div class="d-flex align-items-center">

                      <button class="btn btn-secondary btn-sm" @click="decreaseQuantity(item.id)">-</button>
                      <span class="pl-2 pr-2">{{ item.quantity }}</span>

                      <button class="btn btn-secondary btn-sm" @click="increaseQuantity(item.id)">+</button>
                    </div>
                  </td>

                  <td style="width: 20%">
                    <button class="btn btn-danger" @click="removeItem(item.id)">
                      Remove
                    </button>
                  </td>
                </tr>

              </div>

              <tr>
                <th scope="row" colspan="2" class="text-center">
                  Total Belanja
                </th>
                <td colspan="3" class="text-center"><b>{{ totalHarga }}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-4">
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>ID Transaksi</td>
                <td>12345</td>
              </tr>
              <tr>
                <td>Total Belanja</td>
                <td>Rp. {{ (totalHarga + pajak).toLocaleString('id-ID') }}</td>
              </tr>
              <tr>
                <td>Pajak</td>
                <td>10% / Rp. {{ pajak.toLocaleString('id-ID') }}</td>
              </tr>
              <tr>
                <td>Tanggal</td>
                <td>2024-07-17</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Shippinf detail -->
      <h1 class="mt-5 pt-5 mb-3">Detail Alamat</h1>
      <form class="mb-3" @submit.prevent="checkout">
        <div class="mb-3">
          <label for="name" class="form-label">name</label>
          <input type="text" class="form-control" id="name" v-model="user.name" />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            v-model="user.email" />
        </div>
        <div class="mb-3">
          <label for="noHp" class="form-label">No HP</label>
          <input type="text" class="form-control" id="noHp" v-model="user.no_hp" />
        </div>
        <div class="mb-3">
          <label for="zip" class="form-label">Zip Code</label>
          <input type="text" class="form-control" id="zip" v-model="user.zip_code" />
        </div>
        <div class="mb-3">
          <label for="state" class="form-label">Alamat Lengkap</label>
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
            v-model="user.address"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </section>

  <div v-if="cartStore.items.length > 0">
    <ul>
      <li v-for="item in cartStore.items" :key="item.id">
        <div>
          <h2>Produk ID: {{ item.product_id }}</h2>
          <p>Jumlah: {{ item.quantity }}</p>
          <p>Harga: {{ item.price }}</p>
        </div>
      </li>
    </ul>
    <h3>Total Harga: {{ cartStore.total }}</h3>
  </div>
  <div v-else>
    <p>Keranjang Anda kosong.</p>
  </div>

</template>