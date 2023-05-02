<script setup lang="ts">
import { ref } from 'vue'
import { useImageStore } from '../Stores/ImageStore'

const imageStore = useImageStore()

const folderSelected = ref(false)

const onFileChange = (event: any) => {
    const files = event.target.files
    const fileArray = Array.from(files)

    fileArray.forEach((file: any) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                imageStore.addImage(e.target.result)
            }
            reader.readAsDataURL(file)
        } else {
            console.warn(`File ${file.name} is not an image and was not added.`)
        }
    })

    folderSelected.value = true
}
</script>

<template>
    <div>
        <h1>Select a folder to begin</h1>
        <input type="file" ref="fileInput" @change="onFileChange" directory webkitdirectory>
        <button class="btn" @click="$emit('started')" v-if="folderSelected">Start</button>
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
