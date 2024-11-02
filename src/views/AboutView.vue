<script setup>
import { useAuthStore } from '@/stores/authStore'; // Import store authStore

const authStore = useAuthStore(); // Inisialisasi store

// Ambil data user secara dinamis
const userEmail = authStore.user?.email; // Pastikan user ada sebelum mengakses email


console.log(typeof userEmail);


</script>

<template>
  <div>
    <!-- Tampilkan data user yang diambil dari Pinia -->
    <h1>Welcome, {{ authStore.user?.name }}</h1>
    <p>Email: {{ authStore.user?.email }}</p>
    <p v-if="authStore.token">Token: {{ authStore.token }}</p>
  </div>
</template>
