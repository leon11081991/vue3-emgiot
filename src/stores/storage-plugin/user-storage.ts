import { type PiniaPluginContext } from 'pinia'
import { UtilCommon } from '@/utils/utilCommon'

export const useUserStorage = (context: PiniaPluginContext) => {
  const { store } = context

  const storeId = store.$id
  if (storeId !== 'user') return

  const key = `storage-${store.$id}`
  store.$persist = key

  // 檢查是否是 iOS 裝置
  const isOnIOS = !!navigator.userAgent.match(/iPad/i) || !!navigator.userAgent.match(/iPhone/i)
  // 在瀏覽器關閉時或是刷新頁面時，儲存在 localStorage 中
  const eventName = isOnIOS ? 'pagehide' : 'beforeunload'

  const saveState = () => {
    UtilCommon.setLocalStorage(key, store.$state)
  }

  // 存儲狀態：根據裝置監聽對應的事件
  window.addEventListener(eventName, () => {
    saveState()
  })

  // 取得狀態：
  const savedState = UtilCommon.getLocalStorage<typeof store.$state>(store.$persist)
  if (!savedState) return
  try {
    store.$patch(savedState) // 復原保存的狀態
  } catch (e) {
    console.log(e)
  }

  // 清理事件和定時器
  store.$onAction(({ after }) => {
    after(() => {
      window.removeEventListener(eventName, saveState)
    })
  })
}
