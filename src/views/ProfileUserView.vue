<script setup>
import { useAuthStore } from '../stores/authStore';
import { ref, onMounted } from 'vue';
import axios from 'axios';

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
    alert('Gagal mengambil data user');
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

// Fungsi untuk update profile
// const handleSubmit = async () => {
//   const dataToSend = {
//     name: penampungData.value.name,
//     email: penampungData.value.email,
//     no_hp: penampungData.value.no_hp,
//     zip_code: penampungData.value.zip_code,
//     address: penampungData.value.address,
//     image_profile: base64Image.value,
//   };

//   try {
//     await axios.put(
//       `http://wiguns-backend.test/api/users/update/${authStore.user.id}`, dataToSend
//     );
//     console.log('Response:', response.data);
//     alert('Profile berhasil diupdate!');
//   } catch (error) {
      
//   }
// };
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
      alert('Profile berhasil diupdate!');
    } else {
      alert(`Terjadi kesalahan: ${response.status}`);
    }
  } catch (error) {
    // Tampilkan pesan error lebih spesifik
    console.error('Error:', error);
    alert('Gagal mengupdate profile. Periksa koneksi atau coba lagi nanti.');
  }
};

// Panggil getUserData saat komponen dimount
onMounted(() => {
  getUserData();
});
</script>

<template>
  <div class="profile-container">

    <div class="container">
      <!-- <h1>Edit Profile</h1> -->
      <form @submit.prevent="handleSubmit" class="profile-form">

        <!-- <div class="form-group">
          <label for="image_profile">Path Gambar:</label>
          <input type="file" id="image_profile" class="form-control" @change="handleFileChange" />

          Menampilkan preview gambar
          <div v-if="imagePreview" class="mt-2">
            <img :src="imagePreview" alt="Preview Gambar" class="img-thumbnail" width="200" />
          </div>

          <img :src='`http://wiguns-backend.test/storage/profile_image/${getImageUser}`' alt="dsdsds"
            class="rounded-circle image_profile_edit">
        </div> -->

        <div class="form-group">
  <label for="image_profile">Path Gambar:</label>
  <input type="file" id="image_profile" class="form-control" @change="handleFileChange" />
  
  <!-- Menampilkan preview gambar jika ada -->
  <div class="mt-2">
    <img
      :src="imagePreview || `http://wiguns-backend.test/storage/profile_image/${getImageUser}`"
      alt="Preview Gambar"
      class="img-thumbnail rounded-circle image_profile_edit"
      width="200"
    />
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
      </form>
    </div>


  </div>

</template>


<style></style>
