import { type Ref, onMounted, onBeforeUnmount } from 'vue'

/** 點擊外部關閉 */
export const useClickOutside = (
  elementRef: Ref<HTMLElement | null>,
  callback: (event: MouseEvent) => void
) => {
  const clickOutsideHandler = (event: MouseEvent) => {
    event.stopPropagation()
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('click', clickOutsideHandler)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutsideHandler)
  })
}
