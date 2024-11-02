<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import "../assets/css/auth/login.css";

// Import Pinia Store
import { useAuthStore } from "@/stores/authStore";

const email = ref("");
const password = ref("");
const no_hp = ref("");
const zip_code = ref("");
const password_confirmation = ref("");
const address = ref("");
const name = ref("");
const errorMessage = ref("");
const baseUrl = ref("");
const router = useRouter();
const authStore = useAuthStore(); // Pinia store

const handleRegister = async () => {
    try {
        errorMessage.value = ""; // Reset pesan kesalahan
        const response = await axios.post("http://wiguns-backend.test/api/register", {
            name: name.value,
            email: email.value,
            no_hp: no_hp.value,
            zip_code: zip_code.value,
            address: address.value,
            password: password.value,
            password_confirmation: password_confirmation.value, // Menambahkan password_confirmation
        }, {
            headers: {
                'Content-Type': 'application/json' // Tambahkan header untuk mengirim data JSON
            }
        });

        console.log(response.data);
        // Redirect setelah registrasi berhasil ke halaman login
        router.push("/login");
    } catch (error) {
        // Menampilkan pesan kesalahan dari respons
        if (error.response && error.response.status === 422) {
            // Mengambil pesan error dari respons yang berisi detail error
            errorMessage.value = Object.values(error.response.data.errors).flat().join(', ');
        } else {
            // Menangani kesalahan lain
            errorMessage.value = error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.";
        }
        console.error("Register Error:", error.response?.data || error);
    }
};

onMounted(() => {
    axios
        .get("http://wiguns-backend.test/api/login-images")
        .then((response) => {
            const url = new URL(response.config.url);
            baseUrl.value = `${url.protocol}//${url.host}/`;
            const loginImages = response.data.data;

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



<template>
    <div class="d-lg-flex half">
        <div class="bg order-1 order-md-2" :style="{ backgroundImage: `url('${baseUrl}')` }"></div>
        <div class="contents order-2 order-md-1">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-7">
                        <h3>Register to <strong>Colorlib</strong></h3>
                        <p class="mb-4">
                            Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur
                            adipisicing.
                        </p>
                        <form @submit.prevent="handleRegister">
                            <div class="row">
                                <!-- Nama -->
                                <div class="col-6">
                                    <div class="form-group first">
                                        <label for="name">Name</label>
                                        <input v-model="name" type="text" class="form-control" placeholder="Your Name" id="name" required />
                                    </div>
                                </div>

                                <!-- Email -->
                                <div class="col-6">
                                    <div class="form-group first">
                                        <label for="email">Email</label>
                                        <input v-model="email" type="email" class="form-control" placeholder="your-email@example.com" id="email" required />
                                    </div>
                                </div>

                                <!-- Alamat -->
                                <div class="col-12">
                                    <div class="form-group first">
                                        <label for="address">Address</label>
                                        <textarea v-model="address" class="form-control" placeholder="Enter your address" id="address" rows="5" required></textarea>
                                    </div>
                                </div>

                                <!-- Nomor HP -->
                                <div class="col-8">
                                    <div class="form-group first">
                                        <label for="no_hp">No HP</label>
                                        <input v-model="no_hp" type="text" class="form-control" placeholder="Enter your phone number" id="no_hp" required />
                                    </div>
                                </div>

                                <!-- Kode Pos -->
                                <div class="col-4">
                                    <div class="form-group first">
                                        <label for="zip_code">Zip Code</label>
                                        <input v-model="zip_code" type="text" class="form-control" placeholder="Enter your zip code" id="zip_code" required />
                                    </div>
                                </div>

                                <!-- Password -->
                                <div class="col-6">
                                    <div class="form-group last mb-3">
                                        <label for="password">Password</label>
                                        <input v-model="password" type="password" class="form-control" placeholder="Enter your password" id="password" required />
                                    </div>
                                </div>

                                <!-- Konfirmasi Password -->
                                <div class="col-6">
                                    <div class="form-group last mb-3">
                                        <label for="password_confirmation">Confirm Password</label>
                                        <input v-model="password_confirmation" type="password" class="form-control" placeholder="Confirm your password" id="password_confirmation" required />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-block btn-primary">
                                Register
                            </button>
                        </form>
                        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
}
</style>
