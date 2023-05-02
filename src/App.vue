<script setup lang="ts">
import { useImageStore } from './Stores/ImageStore'

const imageStore = useImageStore()

const onFileChange = (event: any) => {
  const files = event.target.files
  const fileArray = Array.from(files)

  fileArray.forEach((file: any) => {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      imageStore.addImage(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}
</script>

<template>
  <div>
    <h1>Select a folder to begin</h1>
    <input type="file" ref="fileInput" @change="onFileChange" directory webkitdirectory>
    <div>
      <img v-for="image in imageStore.images" :key="image" :src="image" style="max-width: 100%">
    </div>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 1rem;
}
</style>
