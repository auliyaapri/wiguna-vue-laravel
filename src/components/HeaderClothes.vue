
<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { onUnmounted } from "vue";
import { useCartStore } from "@/stores/Cart";

const authStore = useAuthStore();

const currentUrl = ref();
const router = useRouter();
const cartStore = useCartStore();
const totalQuantity = computed(() => cartStore.totalQuantity);
const userName = authStore.user?.name;
const user_role = authStore.user?.role;
const userName2 = computed(() => authStore.user?.name);


const checkInactivity = () => {

  if (!authStore?.user) {
    return;
  }

  const lastActivity =
    parseInt(localStorage.getItem("lastActivity")) || Date.now();
  const currentTime = Date.now();
  const timeout = 30 * 60 * 1000; // 30 menit dalam milidetik

  if (currentTime - lastActivity > timeout) {
    alert("Anda telah di-logout karena tidak ada aktivitas selama 30 menit.");
    authStore.clearUser();
    router.push("/");
    
  }
};

const updateActivity = () => {
  if (authStore?.user) {
    localStorage.setItem("lastActivity", Date.now().toString());
  }
  authStore.updateActivity();
};

// ====================================
const handleLogout = async () => {
  const isConfirmed = confirm("Apakah anda yakin, Logout ?");
  if (!isConfirmed) {
    return;
  }
  try {
    const token = authStore.token;
    console.log("Token:", token);
    // Kirim permintaan logout dengan Axios
    const response = await axios.post(
      "http://wiguns-backend.test/api/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Log respons dari permintaan logout
    console.log("Logout response:", response.data); 
    authStore.clearUser();
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  
  }
};

// Mengatur agar ketika belum login maka, akan ke arah login
const notUser = () => {
  if (!authStore.user) {
    alert('You have to Login First!')
    router.push('/login')
  }
}



onMounted(() => {
  // notUser()
  console.log(userName2.value);
  cartStore.fetchCart();
  checkInactivity();
});

</script>
<!-- About.vue -->
<template>
  <Hero />

  <header class="fixed-top">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid mx-lg-5">
        <a class="navbar-brand" href="/">
          <h2>Wiguna <em>Store</em></h2>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto d-flex align-items-start">
            <li class="nav-item" :class="{ active: router.currentRoute.value.path === '/' }">
              <router-link to="/" class="nav-link navLink-hover">Home</router-link>
            </li>
            
            <li class="nav-item" :class="{
              active:
                router.currentRoute.value.path === '/products' ||
                router.currentRoute.value.path.startsWith('/detail/'),
            }">
              <router-link to="/products" class="nav-link navLink-hover">Our Products</router-link>
            </li>

            <li class="nav-item" :class="{ active: router.currentRoute.value.path === '/about' }">
              <router-link to="/about" class="nav-link navLink-hover">About Us</router-link>
            </li>
            <li class="nav-item" :class="{ active: router.currentRoute.value.path === '/contact' }">
              <router-link to="/contact" class="nav-link navLink-hover">Contact Us</router-link>
            </li>

            <li v-if="!authStore.user" class="nav-item"
              :class="{ active: router.currentRoute.value.path === '/login' }">
              <router-link to="/login" class="nav-link navLink-hover">Login / Register</router-link>
            </li>

            <li v-if="authStore.user" class="nav-item pt-1">
              <div class="dropdown">
                <button style="background: none; border: none" class="text-white dropdown-toggle" type="button"
                  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <span>
                    <img
                      src="https://cdn.leonardo.ai/users/d06c6046-418b-47da-a4e1-947ad237b38c/generations/8347244b-46ca-4f07-ac47-fe4af229ee03/Leonardo_Phoenix_A_detailed_image_capturing_the_back_of_an_AI_1.jpg?w=512"
                      class="rounded-circle" alt="" style="width: 2.5rem" />
                  </span>
                  <span class="pl-2">{{userName}}</span>
                  <span class="pl-2">{{user_role}}</span>
                </button>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <!-- <a class="dropdown-item" href="#"><i class="fas fa-sign-out"></i>Profile User</a> -->
                    <router-link class="dropdown-item" to="/profileUser"><i class="fas fa-sign-out"></i>Profile User</router-link>
                    <a class="dropdown-item" href="#" @click.prevent="handleLogout"><i class="fas fa-sign-out"></i>Logout</a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="nav-item okee" @click="notUser">
              <router-link class="nav-link" to="/cart">
                <h3 class="oke">
                  <i class="bi bi-cart-plus"></i>
                  <span class="text-warning">{{totalQuantity}}</span>
                </h3>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
