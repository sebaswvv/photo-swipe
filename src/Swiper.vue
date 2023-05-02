<script setup lang="ts">
import JSZip from 'jszip';
import axios from 'axios';
import { computed, ref } from 'vue'
import { useImageStore } from './Stores/ImageStore'
import Image from './Components/Image.vue';

const imageStore = useImageStore()

const ended = ref(false)
const loading = ref(false)
const imageIndex = ref(0)

// use computed to update the image when the index changes
const currentImage = computed(() => {
    return imageStore.images[imageIndex.value]
})


const likeImage = () => {
    if (checkIfLastImage()) {
        ended.value = true
        return
    }
    imageIndex.value++
    imageStore.selectImage(currentImage.value)
}

const dislikeImage = () => {
    if (checkIfLastImage()) {
        ended.value = true
        return
    }
    imageIndex.value++
}

const checkIfLastImage = () => {
    return imageIndex.value === imageStore.images.length - 1
}

const downloadImages = () => {
    loading.value = true
    const zip = new JSZip();

    imageStore.selectedImages.forEach((image, index) => {
        const imageName = `image${index}.png`
        const imageUrl = image

        axios.get(imageUrl, { responseType: 'arraybuffer' })
            .then((response) => {
                const imageBlob = new Blob([response.data], { type: 'image/png' })
                zip.file(imageName, imageBlob)
                if (index === imageStore.selectedImages.length - 1) {
                    zip.generateAsync({ type: 'blob' })
                        .then((content) => {
                            const url = window.URL.createObjectURL(content)
                            const link = document.createElement('a')
                            link.download = 'yourlikedimages.zip'
                            link.href = url
                            link.click()
                        });
                }
            });
    });

};
</script>

<template>
    <div v-if="!ended">
        <h1>Like or dislike the image</h1>
        <div class="container">
            <div @click="likeImage" id="like">
                <svg width="64px" height="64px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#4fff42" stroke="#4fff42">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>like [#4fff42]</title>
                        <desc>Created with Sketch.</desc>
                        <defs> </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-259.000000, -760.000000)" fill="#4fff42">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path
                                        d="M203,620 L207.200006,620 L207.200006,608 L203,608 L203,620 Z M223.924431,611.355 L222.100579,617.89 C221.799228,619.131 220.638976,620 219.302324,620 L209.300009,620 L209.300009,608.021 L211.104962,601.825 C211.274012,600.775 212.223214,600 213.339366,600 C214.587817,600 215.600019,600.964 215.600019,602.153 L215.600019,608 L221.126177,608 C222.97313,608 224.340232,609.641 223.924431,611.355 L223.924431,611.355 Z"
                                        id="like-[#4fff42]"> </path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <div @click="dislikeImage" id="dislike">
                <svg width="64px" height="64px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff4242" stroke="#ff4242" transform="rotate(180)">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>like [#ff4242]</title>
                        <desc>Created with Sketch.</desc>
                        <defs> </defs>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-259.000000, -760.000000)" fill="#ff4242">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path
                                        d="M203,620 L207.200006,620 L207.200006,608 L203,608 L203,620 Z M223.924431,611.355 L222.100579,617.89 C221.799228,619.131 220.638976,620 219.302324,620 L209.300009,620 L209.300009,608.021 L211.104962,601.825 C211.274012,600.775 212.223214,600 213.339366,600 C214.587817,600 215.600019,600.964 215.600019,602.153 L215.600019,608 L221.126177,608 C222.97313,608 224.340232,609.641 223.924431,611.355 L223.924431,611.355 Z"
                                        id="like-[#ff4242]"> </path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <Image :image="currentImage" />
        <!-- 2 buttons, like and dislike -->
    </div>
    <div v-if="ended">
        <h1>Thats all, now you can download the liked Images</h1>
        <div v-if="loading">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                style="margin: auto; display: block; shape-rendering: auto;" width="100px" height="100px"
                viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g>
                    <circle cx="60" cy="50" r="4" fill="#bbcedd">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1"
                            begin="-0.67s"></animate>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1"
                            keyTimes="0;0.2;1" begin="-0.67s"></animate>
                    </circle>
                    <circle cx="60" cy="50" r="4" fill="#bbcedd">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1"
                            begin="-0.33s"></animate>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1"
                            keyTimes="0;0.2;1" begin="-0.33s"></animate>
                    </circle>
                    <circle cx="60" cy="50" r="4" fill="#bbcedd">
                        <animate attributeName="cx" repeatCount="indefinite" dur="1s" values="95;35" keyTimes="0;1"
                            begin="0s">
                        </animate>
                        <animate attributeName="fill-opacity" repeatCount="indefinite" dur="1s" values="0;1;1"
                            keyTimes="0;0.2;1" begin="0s"></animate>
                    </circle>
                </g>
                <g transform="translate(-15 0)">
                    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#85a2b6" transform="rotate(90 50 50)"></path>
                    <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#85a2b6">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                            values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                    </path>
                    <path d="M50 50L20 50A30 30 0 0 1 80 50Z" fill="#85a2b6">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
                            values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1"></animateTransform>
                    </path>
                </g>
                <!-- [ldio] generated by https://loading.io/ -->
            </svg>
        </div>
        <button class="btn" @click="downloadImages">Download</button>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    margin-top: -10px;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#like,
#dislike:hover {
    cursor: pointer;
}

#like,
#dislike {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
}
</style>