<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const dataContent = ref([]);
const imageContent = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get("http://wiguns-backend.test/api/pageContent");
    const allData = response.data.data;
    const homeContent = allData.find(item => item.page.name === "home");
    if (homeContent) {
      dataContent.value = homeContent.isi_konten;
      imageContent.value = homeContent.image;
    } else {
      console.error("No content found for 'home'");
    }
  } catch (error) {
    console.error(error);
  }
};
function escapeHtml(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
onMounted(() => {
  fetchData();

});

</script>

<template>
    <div class="best-features">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12">
          <div class="section-heading">
            <h2 data-aos="fade-up">About Wiguna Store</h2>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <div class="left-content ">
            <p v-html="dataContent"></p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="right-image">
            <img :src="`http://wiguns-backend.test/storage/assets/page-content/${imageContent}`" alt=""
              class="img-fluid rounded-5" data-aos="flip-up" data-aos-duration="2000">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>