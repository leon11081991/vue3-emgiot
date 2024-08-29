import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  /** header */
  const headerTitle = ref<string>('雲端掌櫃')
  /** sidebar */
  const isSidebarOpen = ref<boolean>(false)

  return {
    headerTitle,
    isSidebarOpen
  }
})