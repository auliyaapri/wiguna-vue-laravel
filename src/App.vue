<script setup>
import { RouterView, useRoute } from 'vue-router';

</script>

<template>
  <div id="app">
    <RouterView/>
  </div>
</template>

<style>
/* Import CSS files */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
@import '/src/assets/vendor/bootstrap/css/bootstrap.min.css';
@import '/src/assets/css/ckeditor.css';
@import '/src/assets/css/templatemo-sixteen.css';
@import '/src/assets/css/style.css';

/* Optional: Import external CSS */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
</style>
