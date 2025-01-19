<script setup>
import { useAuthStore } from '../stores/authStore';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from "@/router";

const authStore = useAuthStore();
const getImageUser = ref('');

const penampungData = ref({
  name: '',
  email: '',
  no_hp: '',
  zip_code: '',
  address: '',
  image_profile: null,
});

const imagePreview = ref(null);
const base64Image = ref('');
// Fungsi untuk mengambil data user
const getUserData = async () => {
  try {
    const response = await axios.get(`http://wiguns-backend.test/api/users/${authStore.user.id}`);
    const userData = response.data.data;

    // Update formData dengan data dari server
    penampungData.value = {
      name: userData.name,
      email: userData.email,
      no_hp: userData.no_hp,
      zip_code: userData.zip_code,
      address: userData.address,
      image_profile: userData.image_profile,
    };

    getImageUser.value = userData.image_profile;

  } catch (error) {
    
  }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    penampungData.value.path_gambar = file;

    // Membaca file gambar dan mengubahnya menjadi base64
    const reader = new FileReader();
    reader.onloadend = () => {
      base64Image.value = reader.result;  // Menyimpan gambar sebagai base64 string
      imagePreview.value = URL.createObjectURL(file);  // Untuk menampilkan preview
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async () => {
  const dataToSend = {
    name: penampungData.value.name,
    email: penampungData.value.email,
    no_hp: penampungData.value.no_hp,
    zip_code: penampungData.value.zip_code,
    address: penampungData.value.address,
    image_profile: base64Image.value,
  };

  try {
    // Tangkap response dari API
    const response = await axios.put(
      `http://wiguns-backend.test/api/users/update/${authStore.user.id}`,
      dataToSend
    );

    // Periksa status respons untuk memastikan sukses
    if (response.status === 200 || response.status === 201) {      
      Swal  // Tampilkan pesan sukses
        .fire({
          title: 'Profile berhasil diupdate!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        .then(() => {
          // Redirect ke halaman home
          router.push('/profile');
        });
    } else {
      alert(`Terjadi kesalahan: ${response.status}`);
    }
  } catch (error) {
    // Tampilkan pesan error lebih spesifik
    console.error('Error:', error);
  }
};

// Panggil getUserData saat komponen dimount
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
  }
  getUserData();
});
</script>

<template>
  <div class="profile-container">

    <div class="container">
      <!-- <h1>Edit Profile</h1> -->
      <form @submit.prevent="handleSubmit" class="profile-form">
        <div class="form-group">
          <label for="image_profile">Upload Gambar:</label>
          <input type="file" id="image_profile" class="form-control" @change="handleFileChange" />


          <div class="mt-2">
            <img :src="imagePreview || `http://wiguns-backend.test/storage/profile_image/${getImageUser}`"
              alt="Preview Gambar" class="img-thumbnail rounded-circle image_profile_edit" width="200" />
          </div>
        </div>

        <div class="form-group">
          <label>Nama:</label>
          <input type="text" v-model="penampungData.name" required class="form-control">
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="penampungData.email" required class="form-control">
        </div>

        <div class="form-group">
          <label>No HP:</label>
          <input type="text" v-model="penampungData.no_hp" required class="form-control">
        </div>

        <div class="form-group">
          <label>Kode Pos:</label>
          <input type="text" v-model="penampungData.zip_code" required class="form-control">
        </div>

        <div class="form-group">
          <label>Alamat:</label>
          <textarea v-model="penampungData.address" required class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Update Profile</button>
        <router-link to="/" class="ms-2 btn btn-danger">Kembali</router-link>
      </form>
      
    </div>


  </div>

</template>


<style></style>

