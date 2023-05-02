<script setup lang="ts">
import { ref } from 'vue'
import FolderPicker from './Components/FolderPicker.vue'
import Swiper from './Swiper.vue'

const started = ref(false)
</script>

<template>
  <div>
    <FolderPicker v-if="!started" @started="started = true" />
    <Swiper v-if="started" />
  </div>
</template>

<style scoped></style>
