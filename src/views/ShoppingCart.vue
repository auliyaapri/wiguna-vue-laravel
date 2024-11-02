<script setup>
import router from "@/router";
import axios from "axios";
import { ref, onMounted, watch, toRaw } from "vue";
import { useAuthStore } from '@/stores/authStore';
// State untuk menyimpan jumlah item dalam keranjang
const keranjangUser = ref([]);
const keranjangBorderd = ref([]);
const authStore = useAuthStore(); // Inisialisasi store

const user = ref({ ...authStore.user }); // Salin data pengguna
const totalHarga = ref(0);
const pajak = ref(0);

const frekuensiId = ref({});

const hitungFrekuensiId = (keranjangArray) => {
  console.log("Data Keranjang Array:", keranjangArray);

  const frekuensi = {};

  console.log(`fddfdfdfdfds`, frekuensi);



  keranjangArray.forEach((item) => {
    const id = item.id;
    if (frekuensi[id]) {
      frekuensi[id]++;
    } else {
      frekuensi[id] = 1;
    }
  });
  // Menampilkan frekuensi ID ke console
  frekuensiId.value = frekuensi; // Simpan hasil perhitungan frekuensi ke dalam state
}


// ==== Hapus keranjang item ====
const removeItem = (id) => {
  keranjangUser.value = keranjangUser.value.filter((item) => item.id !== id);
  localStorage.setItem("keranjangUser", JSON.stringify(keranjangUser.value));
  console.log(`Item dengan id ${id} telah dihapus`);
  updateTotalHarga();
  router.push({ path: '/' });

};

// ==== Total Harga keranjang ====
const sum = (items) => {
  return items.reduce((total, item) => total + item.priceProduct, 0);
};
const updateTotalHarga = () => {
  totalHarga.value = sum(keranjangUser.value);
};

const bayarPajak = () => {
  pajak.value = totalHarga.value * 10 / 100;
  console.log('pajak bre', pajak.value);
}

const decreaseQuantity = (id) => {
  const item = keranjangUser.value.find((product) => product.id === id);
  if (item && item.quantity > 1) {
    item.quantity--; // Mengurangi kuantitas
    localStorage.setItem("keranjangUser", JSON.stringify(keranjangUser.value)); // Simpan perubahan di localStorage
    updateTotalHarga(); // Update total harga
  } else {
    console.log('Quantity sudah minimum'); // Jika quantity sudah 1, tidak bisa dikurangi
  }
};

const increaseQuantity = (id) => {
  const item = keranjangUser.value.find((product) => product.id === id);
  item.quantity++;
  localStorage.setItem("keranjangUser", JSON.stringify(keranjangUser.value));
  updateTotalHarga();
};


const checkout = () => {
  if (!user.value.no_hp) {
    alert('Anda Masih ada data yang kosong, segera update bre')
    router.push('/profileUser')
  }
}

// Lifecycle hook yang dijalankan saat komponen di-mount
onMounted(() => {

  // Ambil data keranjang dari localStorage
  const storedKeranjang = localStorage.getItem("keranjangUser");

  if (storedKeranjang) {
    try {
      const parsedKeranjang = JSON.parse(storedKeranjang);
      // console.log(`ini adalah parsedKeranjang`, parsedKeranjang);

      keranjangUser.value = JSON.parse(storedKeranjang);
      keranjangBorderd.value = parsedKeranjang;
      const keranjangArray = JSON.parse(storedKeranjang);

      // console.log(`ini merupakan keranjangBorderd`, toRaw(keranjangBorderd.value));


      // console.log("dibawah adalah id get yaa");
      console.log(keranjangUser.value.map((item) => item.priceProduct + 5000));

      const frekuensi = new Map();

      keranjangUser.value.forEach((item) => {
        const id = item.id;
        frekuensi.set(id, (frekuensi.get(id) || 0) + 1);
      });

      hitungFrekuensiId(keranjangArray);

      updateTotalHarga();

      bayarPajak();
      // Hitung total harga
      const totalHarga = sum(keranjangUser.value);
      const totalHargaPajak = pajak.value + totalHarga;
      console.log(`Harga. ${totalHarga}`);

      // console.log("Frekuensi id:", [...frekuensi.entries()]);
      // console.log('keranjang', keranjangArray);
      // HASILNYA INI 

    } catch (error) {
      console.error("Error parsing JSON from localStorage", error);
    }
  }

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
              <tr v-for="item in keranjangUser" :key="item.id">
                <td style="width: 20%">
                  <img :src="`${item.photoProduct}`" alt="" class="cart-image w-100" />
                </td>
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
          <input type="text" class="form-control" id="name" v-model="user.name"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="user.email"/>
        </div>
        <div class="mb-3">
          <label for="noHp" class="form-label">No HP</label>
          <input type="text" class="form-control" id="noHp" />
        </div>
        <div class="mb-3">
          <label for="zip" class="form-label">Zip Code</label>
          <input type="text" class="form-control" id="zip" />
        </div>
        <div class="mb-3">
          <label for="state" class="form-label">Alamat Lengkap</label>
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="user.address"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </section>
</template>