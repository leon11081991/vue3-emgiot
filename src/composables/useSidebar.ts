import { ref } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useCommonStore } from '@/stores/common.stores'

export const useSidebar = () => {
  const commonStore = useCommonStore()

  const sidebarRef = ref<HTMLElement | null>(null)

  const handleCloseSidebar = (event: MouseEvent) => {
    event.stopPropagation()
    const menu = document.getElementById('menu')
    if (event.target == menu || event.target == sidebarRef.value) return
    commonStore.isSidebarOpen = false
  }

  const handleOpenSidebar = () => {
    commonStore.isSidebarOpen = true
  }

  useClickOutside(sidebarRef, handleCloseSidebar)

  return {
    sidebarRef,
    handleCloseSidebar,
    handleOpenSidebar
  }
}
