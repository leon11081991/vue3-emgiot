import { type PiniaPluginContext } from 'pinia'
import { UtilCommon } from '@/utils/utilCommon'

export const useUserStorage = (context: PiniaPluginContext) => {
  const { store } = context

  const storeId = store.$id
  if (storeId !== 'user') return

  console.log('useUserStorage store', store.$id)

  const key = `storage-${store.$id}`
  store.$persist = key

  // 存儲狀態：在瀏覽器關閉時或是刷新頁面時，儲存在 localStorage 中
  window.onbeforeunload = () => {
    localStorage.setItem(store.$persist, JSON.stringify(store.$state))
  }

  // 取得狀態：
  const savedState = localStorage.getItem(store.$persist)
  if (!savedState) return
  try {
    store.$patch(JSON.parse(savedState)) // 復原保存的狀態
  } catch (e) {
    console.error(e)
  }
}
