import type { StoresListInfoResType } from '@/models/types/store.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'

export const useFetchStore = () => {
  const { openMessage } = useMessage()

  /** 店家資訊清單 */
  const storesListInfo = ref<{
    data: StoresListInfoResType
    isLoading: boolean
  }>({
    data: {
      customerId: '',
      stores: []
    },
    isLoading: true
  })

  /** 取得店家資訊清單 */
  const fetchStoresListInfo = async () => {
    try {
      const { result, isSuccess, message, resultCode } = await api.store.getStoresListInfo()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      storesListInfo.value.data = result
      console.log(`storesListInfo.value.data`, storesListInfo.value.data)
    } catch (error) {
      // TODO: 錯誤處理
      console.error('Error fetchStoresListInfo:', error)
    } finally {
      storesListInfo.value.isLoading = false
    }
  }

  /** 記錄當下點選的店家 */
  const dispatchRecordCurrentStore = async (storeId: string) => {
    try {
      const { isSuccess, message, resultCode } = await api.store.recordCurrentStore(storeId)
      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      } else {
        return true
      }
    } catch (error) {
      // TODO: 錯誤處理
      console.error('Error dispatchRecordCurrentStore:', error)
    }
  }

  return {
    storesListInfo,
    fetchStoresListInfo,
    dispatchRecordCurrentStore
  }
}
