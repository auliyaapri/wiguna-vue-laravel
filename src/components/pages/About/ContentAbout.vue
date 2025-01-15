    <script setup>
    import HeaderClothes from '@/components/HeaderClothes.vue';
    import { useAuthStore } from '@/stores/authStore'; // Import store authStore
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    const authStore = useAuthStore(); // Inisialisasi store
    import axios from 'axios';
    // Ambil data user secara dinamis
    const userEmail = authStore.user?.email; // Pastikan user ada sebelum mengakses email
    const getAllBanners = ref([]);
    const dataContent = ref([]);
    const imageContent = ref([]);

    const route = useRoute();
    let currentUrl = ref(route.fullPath);
    let NewCurrentUrl = currentUrl.value.replace('/', '');

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

    const fetchData = async () => {
        try {
            const response = await axios.get("http://wiguns-backend.test/api/pageContent");
            const allData = response.data.data;
            const aboutContent = allData.find(item => item.page.name === "about");

            if (aboutContent) {
                dataContent.value = aboutContent.isi_konten;
                imageContent.value = aboutContent.image;
            } else {
                console.error("No content found for 'about'");
            }
            console.log(aboutContent);
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {        
        fetchData();
        getBanner();
    });

</script>
<template>
    <div>
        <HeaderClothes />
        <div class="page-heading about-heading header-text">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-content">
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

        <div class="abouts">
            <div class="best-features about-features md:py-0">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12" data-aos="fade-up" data-aos-duration="2000">
                            <div class="section-heading">
                                <h2>Our Background</h2>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="right-image">
                                <img :src="`http://wiguns-backend.test/storage/assets/page-content/${imageContent}`"
                                    alt="" style="border-radius: 10px;" class="image-about" data-aos="fade-up" data-aos-duration="2000">
                            </div>
                        </div>
                        <div class="col-lg-6 mt-md-3 mt-lg-0">
                            <div class="left-content">
                                <h4 class="fs-5" data-aos="fade-up" data-aos-duration="2000">Who we are &amp; What we do?</h4>
                                <div data-aos="fade-right" data-aos-duration="2000" v-html="dataContent"></div>
                                <ul class="social-icons">
                                    <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                                    <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
