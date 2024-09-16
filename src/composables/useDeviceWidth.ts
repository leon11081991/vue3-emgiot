import type { widthType } from '@/models/types/mapping.types'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { widthMapping } from '@/constants/mappings/width.mapping'

export const useDeviceWidth = () => {
  const width = ref<number>(window.innerWidth)

  const currentBreakpoint = computed(() => {
    return (Object.keys(widthMapping) as widthType[]).find(
      (key: widthType) => widthMapping[key] >= width.value
    )
  })

  const updateWidth = () => {
    width.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    width,
    currentBreakpoint
  }
}
