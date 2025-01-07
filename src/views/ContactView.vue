<script setup>
import HeaderClothes from '@/components/HeaderClothes.vue';
import { useAuthStore } from '@/stores/authStore'; // Import store authStore
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
const authStore = useAuthStore(); // Inisialisasi store
import axios from 'axios';
// Ambil data user secara dinamis
const userEmail = authStore.user?.email; // Pastikan user ada sebelum mengakses email
const getAllBanners = ref([]);
const currentPath = ref('');

const route = useRoute();
let currentUrl = ref(route.fullPath);
let NewCurrentUrl = currentUrl.value.replace('/', '');

// Menampung data dari form
const formData = ref({
  name: '',
  email: '',
  subject: '',
  content: '',
  message: ''
});

console.log(NewCurrentUrl);
const getBanner = () => {
  axios.get("http://wiguns-backend.test/api/banner")
    .then((response) => {
      const filteredBanners = response.data.data.filter(banner => banner.page === NewCurrentUrl);
      getAllBanners.value = filteredBanners;
      console.log(filteredBanners);
    })
    .catch((error) => {
      console.log(error);
    });
};

// button submit 

const submitForm = () => {
  console.log('Form submitted');
  axios.post("http://wiguns-backend.test/api/contact/store", formData.value) 
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(formData.value);
};

onMounted(() => {
  getBanner();
});

</script>

<template>
    <HeaderClothes />
        <div class="page-heading about-heading header-text">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="text-content">
              <!-- <h4>{{ NewCurrentUrl }}</h4> -->
              <!-- <h2>{{ getAllBanners }}</h2> -->
              <div v-for="banner in getAllBanners" :key="banner.id">
                <h4>{{ banner.title }}</h4>
                <h2>{{ banner.content }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="find-us">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>Our Location on Maps</h2>
                    </div>
                </div>
                <div class="col-md-8">                    
                    <div id="map">
                        <iframe
                            src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%" height="330px" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="left-content">
                        <h4>About our office</h4>
                        <p>Kantor Wiguna Store dirancang untuk mendukung kenyamanan dan efisiensi dalam memberikan layanan terbaik kepada pelanggan. Berlokasi strategis, kantor kami menjadi pusat operasional untuk memastikan semua proses berjalan lancar, mulai dari manajemen stok hingga pengiriman barang. <br> <br> Kami mengutamakan suasana kerja yang profesional dan ramah, dengan tim yang berdedikasi untuk memberikan solusi terbaik bagi kebutuhan pelanggan. Kantor kami juga dilengkapi dengan teknologi modern untuk mendukung setiap aspek operasional, sehingga Wiguna Store dapat terus melayani dengan keunggulan dan kualitas tinggi.</p>
                        <ul class="social-icons">
                            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                            <li><a href="#"><i class="fa-brands fa-behance"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="send-message">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>Send us a Message</h2>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="contact-form">
                        <form id="contact" @submit.prevent="submitForm" action="" method="post">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <fieldset>
                                        <input name="name" type="text" class="form-control" id="name" placeholder="Full Name" required="" v-model="formData.name">
                                    </fieldset>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <fieldset>
                                        <input name="email" type="text" class="form-control" id="email"
                                            placeholder="E-Mail Address" required="" v-model="formData.email">
                                    </fieldset>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <fieldset>
                                        <input name="subject" type="text" class="form-control" id="subject"
                                            placeholder="Subject" required="" v-model="formData.subject">
                                    </fieldset>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <fieldset>
                                        <input name="content" type="text" class="form-control" id="content"
                                            placeholder="Content" required="" v-model="formData.content">
                                    </fieldset>
                                </div>
                                <div class="col-lg-12">
                                    <fieldset>
                                        <textarea name="message" rows="6" class="form-control" id="message"
                                            placeholder="Your Message" required="" v-model="formData.message"></textarea>
                                    </fieldset>
                                </div>
                                <div class="col-lg-12">
                                    <fieldset>
                                        <button id="form-submit" class="filled-button" @click="submitForm">Send Message</button>
                                    </fieldset>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>                
            </div>
        </div>
    </div>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="inner-content">
                        <p>Copyright &copy; 2024 Wiguna Store
                            - Design: <a rel="nofollow noopener" href="https://templatemo.com" target="_blank">MR.
                                Auliya</a></p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

</template>