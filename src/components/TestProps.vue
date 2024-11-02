<script setup>
const props = defineProps({
    namaBro: {
    type: String,
    required: true
  }
});
</script>

<template>
    <h1>{{ namaBro }}</h1>
</template>
