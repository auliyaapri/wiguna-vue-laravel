<script setup>
import { ref } from 'vue';
import axios from 'axios';

const penampungData = ref({
  nama: '',
  path_gambar: null,
});

const imagePreview = ref(null);
const base64Image = ref('');

// Fungsi untuk menangani perubahan file gambar
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

// Fungsi untuk mengirim data ke backend
const handleSubmit = async () => {
  const dataToSend = {
    nama: penampungData.value.nama,
    path_gambar: base64Image.value  // Mengirimkan base64 image ke server
  };

  try {
    const response = await axios.put(
      'http://wiguns-backend.test/api/percobaan-gambar/update/13',
      dataToSend
    );
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="path_gambar">Path Gambar:</label>
      <input type="file" id="path_gambar" class="form-control" @change="handleFileChange" />
      
      <!-- Menampilkan preview gambar -->
      <div v-if="imagePreview" class="mt-2">
        <img :src="imagePreview" alt="Preview Gambar" class="img-thumbnail" width="200" />
      </div>
    </div>
    
    <div class="form-group">
      <label for="nama">Nama Gambar:</label>
      <input type="text" id="nama" class="form-control" v-model="penampungData.nama" />
    </div>

    <button type="submit" class="btn btn-primary">Upload Gambar</button>
  </form>
</template>
