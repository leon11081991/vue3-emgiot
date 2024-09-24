import { type PiniaPluginContext } from 'pinia'
import { UtilCommon } from '@/utils/utilCommon'

export const useUserStorage = (context: PiniaPluginContext) => {
  const { store } = context

  const storeId = store.$id
  if (storeId !== 'user') return

  const key = `storage-${store.$id}`
  store.$persist = key

  // 存儲狀態：在瀏覽器關閉時或是刷新頁面時，儲存在 localStorage 中
  window.onbeforeunload = () => {
    UtilCommon.setLocalStorage(key, store.$state)
  }

  // 取得狀態：
  const savedState = UtilCommon.getLocalStorage<typeof store.$state>(store.$persist)
  if (!savedState) return
  try {
    store.$patch(savedState) // 復原保存的狀態
  } catch (e) {
    console.log(e)
  }
}
