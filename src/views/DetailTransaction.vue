<script setup>
import router from "@/router";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";

import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';
import Swal from "sweetalert2";


const authStore = useAuthStore();

const user = ref({ ...authStore.user });


const transactions = ref(null);

// Fungsi untuk mengambil data transaksi
const fetchTransactions = async () => {
    try {
        const response = await axios.get(
            `http://wiguns-backend.test/api/transactions`, // Endpoint tanpa ID
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`, // Token otorisasi
                },
            }
        );
        transactions.value = response.data.data; // Simpan data transaksi
        console.log("Data transaksi:", transactions.value);
    } catch (error) {
        console.error("Error fetching transactions:", error.response?.data || error.message);
    }
};





// console.log(authStore.user.address);
console.log(`${authStore.token}`);

onMounted(() => {
    if (!authStore.user) {
Swal.fire({
    title: "You are not allowed to access",
    text: "You need to log in first.",
    icon: "error",
    showConfirmButton: false,
    timer: 2500,
});

        router.push("/");
    } else {
        fetchTransactions();
    }


});
</script>



<template>
    <div class="container my-5">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Detail Transaction
                </li>
                <li class="ms-auto">
                    <h4><i class="bi bi-cart-plus"></i></h4>
                </li>
            </ol>
        </nav>

        <!-- Store Cart Section -->
        <section class="store-cart">
            <div class="container">
                <div class="row" data-aos="fade-up" data-aos-delay="100">
                    <div class="col-12 table-responsive">
                        <table class="table table-bordered table-cart">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nama Produk</th>
                                    <th>Harga</th>
                                    <th>Jumlah</th>
                                    <th>Status Transaksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaction, index) in transactions" :key="transaction.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        <!-- Menampilkan nama produk -->
                                        <div v-for="detail in transaction.details" :key="detail.id">
                                            {{ detail.product.name }}
                                        </div>
                                    </td>
                                    <td>
                                        <!-- Menampilkan harga produk -->
                                        <div v-for="detail in transaction.details" :key="detail.id">
                                            Rp {{ detail.product.price }}
                                        </div>
                                    </td>
                                    <td>
                                        <!-- Menampilkan jumlah produk -->
                                        <div v-for="detail in transaction.details" :key="detail.id">
                                            {{ detail.quantity }}
                                        </div>
                                    </td>
                                    <td>{{ transaction.transaction_status }}</td>
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
