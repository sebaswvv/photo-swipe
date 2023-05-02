import { defineStore } from 'pinia'

export const useImageStore = defineStore({
  id: 'image',
  state: () => ({
    images: [] as string[],
    selectedImages: [] as string[]
  }),
  actions: {
    addImage(image: string) {
      this.images.push(image)
    },
    clearImages() {
      this.images = []
    },
    selectImage(image: string) {
      this.selectedImages.push(image)
    }
  }
})
