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

            // Filter hanya untuk data dengan page.name = 'about'
            const aboutContent = allData.find(item => item.page.name === "about");

            if (aboutContent) {
                dataContent.value = aboutContent.isi_konten;
                imageContent.value = aboutContent.image;
            } else {
                console.error("No content found for 'about'");
            }

            console.log(aboutContent); // Opsional: log untuk memeriksa data yang difilter
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

        <div class="best-features about-features">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-heading">
                            <h2>Our Background</h2>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="right-image">
                            <img :src="`http://wiguns-backend.test/storage/assets/page-content/${imageContent}`" alt="">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="left-content">
                            <h4>Who we are &amp; What we do?</h4>
                            <p>
                                {{ dataContent }}
                            </p>
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

        <div class="team-members">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-heading">
                            <h2>Our Team Members</h2>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member">
                            <div class="thumb-container">
                                <img src="@/assets/img/team_01.jpg" alt="">
                                <div class="hover-effect">
                                    <div class="hover-content">
                                        <ul class="social-icons">
                                            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <h4>Johnny William</h4>
                                <span>CO-Founder</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member">
                            <div class="thumb-container">
                                <img src="@/assets/img/team_02.jpg" alt="">
                                <div class="hover-effect">
                                    <div class="hover-content">
                                        <ul class="social-icons">
                                            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <h4>Karry Pitcher</h4>
                                <span>Product Expert</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member">
                            <div class="thumb-container">
                                <img src="@/assets/img/team_03.jpg" alt="">
                                <div class="hover-effect">
                                    <div class="hover-content">
                                        <ul class="social-icons">
                                            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <h4>Michael Soft</h4>
                                <span>Chief Marketing</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member">
                            <div class="thumb-container">
                                <img src="@/assets/img/team_04.jpg" alt="">
                                <div class="hover-effect">
                                    <div class="hover-content">
                                        <ul class="social-icons">
                                            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <h4>Mary Cool</h4>
                                <span>Product Specialist</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member">
                            <div class="thumb-container">
                                <img src="@/assets/img/team_05.jpg" alt="">
                                <div class="hover-effect">
                                    <div class="hover-content">
                                        <ul class="social-icons">
                                            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <h4>George Walker</h4>
                                <span>Product Photographer</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member">
                            <div class="thumb-container">
                                <img src="@/assets/img/team_06.jpg" alt="">
                                <div class="hover-effect">
                                    <div class="hover-content">
                                        <ul class="social-icons">
                                            <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                                            <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <h4>Kate Town</h4>
                                <span>General Manager</span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing itaque corporis nulla.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
