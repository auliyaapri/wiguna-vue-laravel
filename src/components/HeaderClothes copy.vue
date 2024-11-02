
<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { onUnmounted } from "vue";

const authStore = useAuthStore();

const currentUrl = ref();
const router = useRouter();
const jumlahKeranjang = ref(0);

const userName = authStore.user?.name;
const user_role = authStore.user?.role;



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


let intervalId;

onMounted(() => {

  if (authStore?.user) {

  
    const intervalId = setInterval(checkInactivity, 1000);

  
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("click", updateActivity);
    window.addEventListener("keydown", updateActivity);
  }

  const storedKeranjang = localStorage.getItem("keranjangUser");

  console.log("adddddddddd", JSON.parse(storedKeranjang));

  if (storedKeranjang) {
    try {
      const keranjangArray = JSON.parse(storedKeranjang);
      jumlahKeranjang.value = keranjangArray.reduce((total, item) => {
        return total + (item.quantity || 1);
      }, 0);
    } catch (error) {
      console.error("Error parsing JSON from localStorage", error);
    }
  }
  console.log("Jumlah Keranjang:", jumlahKeranjang.value);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  window.removeEventListener("mousemove", updateActivity);
  window.removeEventListener("click", updateActivity);
  window.removeEventListener("keydown", updateActivity);
});
</script>
<!-- About.vue -->
<template>
  <header class="fixed-top">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <!-- <h1>Welcome, {{ authStore.user?.email }}</h1> -->

          <h2>Sixteen <em>Clothing</em></h2>
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

            <li class="nav-item">
              <a class="nav-link navLink-hover" href="about.html">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link navLink-hover" href="contact.html">Contact Us</a>
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
            <li class="nav-item okee">
              <router-link class="nav-link" to="/cart">
                <h3 class="oke">
                  <i class="bi bi-cart-plus"></i>
                  <span class="text-warning">{{ jumlahKeranjang }}</span>
                </h3>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
