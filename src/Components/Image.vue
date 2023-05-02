<script setup lang="ts">
// import { ref } from 'vue'

defineProps({
    image: String
})
</script>

<template>
    <div>
        <img :src="image">
    </div>
</template>

<style scoped>
img {
    max-width: 80%;
    max-height: 80%;
    margin-bottom: 20px;
    border-radius: 5px;
}
</style>