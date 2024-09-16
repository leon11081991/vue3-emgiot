import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common.stores'
import { navigationList } from '@/constants/common.const'

/** header 相關邏輯 */
export const useHeader = () => {
  const router = useRouter()
  const commonStore = useCommonStore()

  // 是否顯示返回按鈕
  const showGoBack = computed<boolean>(() => {
    if (router.currentRoute.value.name == 'Home') return false

    return true
  })

  // 返回上一頁
  const goPrevPage = () => {
    router.go(-1)
  }

  /** 處理header title
   *  尋找 navigationList 中是否有與當前頁面相同的 header title
   */
  const headerTitleHandler = (title: string = '') => {
    const currentPage = router.currentRoute.value.name
    const item = navigationList.find((item) => item.name == currentPage)
    return item?.['header-title'] ?? title
  }

  const updateHeaderTitle = (customTitle?: string) => {
    // 需求: header title 有可能會在不同頁面中重新定義，所以使用 commonStore
    commonStore.headerTitle = customTitle || headerTitleHandler()
  }

  // 每次路由改變後更新 headerTitle
  router.afterEach(() => {
    updateHeaderTitle()
  })

  onMounted(() => {
    updateHeaderTitle()
  })

  return {
    showGoBack,
    goPrevPage,
    updateHeaderTitle
  }
}