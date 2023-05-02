<script setup lang="ts">
import { ref } from 'vue'
import { useImageStore } from './Stores/ImageStore'
import Image from './Components/Image.vue';

const imageStore = useImageStore()

// currentImage, default to first image
const currentImage = ref(imageStore.images[0])

// display the first image -> pass image to Image component
// when image is liked, add it to the selected images in the image store
// then display the next image
</script>

<template>
    <div>
        <h1>Like or dislike the image</h1>
        <Image :image="currentImage" />
        <!-- 2 buttons, like and dislike -->
        <div class="container">
            <div id="like">
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
            <div id="dislike">
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
}
</style>