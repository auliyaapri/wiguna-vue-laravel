<template>
    <div class="d-lg-flex half">
        <div class="bg order-1 order-md-2" :style="{ backgroundImage: `url('${baseUrl}')` }"></div>
        <div class="contents order-2 order-md-1">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-12 col-lg-7 login_container pt-5 lg:py-0">
                        <h3 class="mb-3">{{ titleLogin }}</h3>
                        <p class="mb-4">
                            {{ contentLogin }}
                        </p>
                        <form @submit.prevent="handleLogin" method="post">
                            <div class="form-group first">
                                <label for="Email">Email</label>
                                <input v-model="email" type="text" class="form-control" placeholder="your-email@gmail.com" id="username" required/>
                                <p v-if="errorMessage.includes('Email tidak ditemukan')" class="error-message">
                                    {{ errorMessage }}
                                </p>
                            </div>
                            <div class="form-group last mb-3">
                                <label for="password">Password</label>
                                <input v-model="password" type="password" class="form-control" placeholder="Your Password" id="password" required />
                            </div>
                            <p v-if="errorMessage.includes('Password salah.')" class="error-message">
                                {{ errorMessage }}
                            </p>
                            <router-link to="/register"> Don't have an account? Register now!</router-link>
                            <button type="submit" class="mt-2 btn btn-block btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import "../assets/css/auth/login.css";
// Import Pinia Store
import { useAuthStore } from "@/stores/authStore";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const baseUrl = ref("");
const contentLogin = ref("");
const titleLogin = ref("");

const setCobaAja = ref(''); // Deklarasikan setCobaAja dengan benar
const router = useRouter();
const authStore = useAuthStore(); // Pinia store

const handleLogin = async () => {
    try {
        errorMessage.value = ""; // Reset pesan kesalahan
        const response = await axios.post("http://wiguns-backend.test/api/login", {
            email: email.value,
            password: password.value,
        });
        console.log(response.data);
        

        if (response.data.access_token) {
            const token = response.data.access_token;          
            // Ambil data pengguna dengan token yang didapat
            const userResponse = await axios.get("http://wiguns-backend.test/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Simpan data pengguna dan token ke store Pinia
            authStore.setUser({
                id: userResponse.data.id,
                name: userResponse.data.name,
                email: userResponse.data.email,
                address: userResponse.data.address,
                no_hp: userResponse.data.no_hp,
                zip_code: userResponse.data.zip_code,
                role: userResponse.data.role, // Jika ada
            }, token);
            setCobaAja.value = 'ini coba';
        }
        router.push("/");
    } catch (error) {
        errorMessage.value = error.response?.data?.message || "Login failed."; // Tampilkan pesan kesalahan
        console.error("Login Error:", error); 
    }
};

onMounted(() => {
    axios
        .get("http://wiguns-backend.test/api/login-images")
        .then((response) => {
            // console.log(response.data.data);
            const url = new URL(response.config.url);
            baseUrl.value = `${url.protocol}//${url.host}/`;
            const loginImages = response.data.data;            
            // ambil data description dari api
            contentLogin.value = response.data.data[0].description;            
            titleLogin.value = response.data.data[0].name_page_image;
            if (response.data.status === "success" && loginImages.length > 0) {
                const mediaContent = loginImages[0].media_content;
                console.log("Media Content:", mediaContent);
                baseUrl.value += `storage/bgImage/${mediaContent}`;
            } else {
                console.log("Data tidak ditemukan atau status gagal.");
            }
        })
        .catch((error) => {
            console.error(
                "Error:",
                error.response ? error.response.data : error.message
            );
        });
});

</script>

<style>
.error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}
</style>
