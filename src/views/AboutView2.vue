<script setup>
import { ref } from 'vue';
const inputText = ref('');

const buttonSubmit = () => {
  localStorage.setItem('user input', inputText.value);

}
</script>

<template>
  <div>
    <br>
    <br>
    <br>
    <form @submit.prevent="buttonSubmit">
      <input type="text" class="form-control" v-model="inputText">
      <button class="btn btn-danger" @click="buttonSubmit">Klik saya</button>
    </form>
  </div>
</template>
