<script setup>
import { useAuthStore } from '@/stores/authStore'; // Import store authStore
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore(); // Inisialisasi store
const user = ref({ ...authStore.user }); // Salin data pengguna
const currentPath = ref('');

// Fungsi untuk mengubah string menjadi format kapital di awal setiap kata
const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

onMounted(async () => {
  const route = useRoute();
  currentPath.value = toTitleCase(route.path.replace(/[-_]/g, ' ').replace(/\//g, '')); // Ubah "profileuser" menjadi "Profile User"

  // Ambil data pengguna berdasarkan ID
  await authStore.fetchUserById(authStore.user.id); // Pastikan fungsi ini ada di store
  Object.assign(user.value, authStore.user); // Perbarui user lokal
});

const handleUpdate = async () => {
  const userId = authStore.user.id;
  await authStore.updateUser(userId, user.value); // Kirim data yang diperbarui
};

</script>


<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item activeBre" aria-current="page">
              <router-link to="/profileUser">
                <span style="color: gray">Profile User</span>
              </router-link>
            </li>            
          </ol>
        </nav>  
      </div>
      <!-- <div class="col-md-4">
        <div class="card">
          <div class="card-header bg-primary text-white text-center">
            <h2>Your Image</h2>
          </div>
          <div class="card-body">
            <form>
              
              <div class="mb-3 text-center">
                <span>
                  <img
                    src="https://cdn.leonardo.ai/users/d06c6046-418b-47da-a4e1-947ad237b38c/generations/8347244b-46ca-4f07-ac47-fe4af229ee03/Leonardo_Phoenix_A_detailed_image_capturing_the_back_of_an_AI_1.jpg?w=512"
                    class="rounded-circle text-center" alt="" style="width: 15rem" />
                </span>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="name" v-model="user.name" placeholder="Change Image">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div> -->
      
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-primary text-white text-center">
            <h2>Edit Profile</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent = "handleUpdate">
              <!-- Nama -->
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="name" v-model="user.name" placeholder="Enter your full name">
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="user.email" placeholder="Enter your email" disabled>
              </div>
              <!-- NO HP -->
              <div class="mb-3">
                <label for="no_hp" class="form-label">no_hp</label>
                <input type="text" class="form-control" id="no_hp" v-model="user.no_hp" placeholder="Enter your phone number">
              </div>
              
              <!-- zip -->
              <div class="mb-3">
                <label for="zip_code" class="form-label">Zip Code</label>
                <input type="text" class="form-control" id="zip_code" v-model="user.zip_code" placeholder="Enter your Zip Code">
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="user.email" placeholder="Enter your email" disabled>
              </div>

              <!-- Alamat -->
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <textarea class="form-control" id="address" v-model="user.address" rows="3"
                  placeholder="Enter your address"></textarea>
              </div>

              
              <!-- Button untuk Submit -->
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom styles (optional) */
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

