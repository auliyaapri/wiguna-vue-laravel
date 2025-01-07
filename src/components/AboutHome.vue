<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const dataContent = ref([]);
const imageContent = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get("http://wiguns-backend.test/api/pageContent");
    const allData = response.data.data;

    // Filter hanya untuk data dengan page.name = 'home'
    const homeContent = allData.find(item => item.page.name === "home");

    if (homeContent) {
      dataContent.value = homeContent.isi_konten;
      imageContent.value = homeContent.image;
    } else {
      console.error("No content found for 'home'");
    }

    console.log(homeContent); // Opsional: log untuk memeriksa data yang difilter
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  // getName();
  fetchData();
  
});




</script>

<template>
        <div class="best-features">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-heading">
              <h2>About Sixteen Clothing</h2>
            </div>
          </div>
          <div class="col-md-6">
            <div class="left-content ">
              <span>
                {{dataContent}}  

              </span>
              <br>
              <router-link to="/about" class="filled-button">Read More</router-link>            
            </div>
          </div>
          <div class="col-md-6">
            <div class="right-image">
              <img :src="`http://wiguns-backend.test/storage/assets/page-content/${imageContent}`" alt="">

            </div>
          </div>
        </div>
      </div>
    </div>
</template>