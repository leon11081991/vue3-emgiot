import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {

  const headerTitle = ref<string>('雲端掌櫃')

  return { headerTitle }
})