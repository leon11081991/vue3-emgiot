import type {
  StoresListInfoResType,
  StoresTotalResType,
  BaseCreateStoreReqType
} from '@/models/types/store.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'

export const useFetchStore = () => {
  const { openMessage } = useMessage()

  /** 首頁總total運營圖表 */
  const operationTotalChart = ref<{
    data: StoresTotalResType
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  /** 取得首頁總total運營圖表 */
  const fetchTotalOperationChart = async () => {
    try {
      const { result, isSuccess, resultCode, message } = await api.store.getTotalOperationChart()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      operationTotalChart.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      operationTotalChart.value.isLoading = false
    }
  }

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

  /** 建立新店家 */
  const createNewStore = async (params: BaseCreateStoreReqType) => {
    try {
      const { isSuccess, message, resultCode } = await api.store.createNewStore(params)
      if (!isSuccess) {
        if (message.includes('existed')) {
          return false
        }

        openMessage('error', `${resultCode} - ${message}`)
        return
      } else {
        openMessage('success', 'success')
        return true
      }
    } catch (error) {
      // TODO: 錯誤處理
      console.error('Error createNewStore:', error)
    }
  }

  /** 更新店家 */
  const updateStore = async (params: BaseCreateStoreReqType) => {
    try {
      const { isSuccess, message, resultCode } = await api.store.updateStore(params)
      if (!isSuccess) {
        if (message.includes('existed')) {
          return false
        }

        openMessage('error', `${resultCode} - ${message}`)
        return
      } else {
        openMessage('success', 'success')
        return true
      }
    } catch (error) {
      // TODO: 錯誤處理
      console.error('Error updateStore:', error)
    }
  }

  return {
    storesListInfo,
    operationTotalChart,
    fetchStoresListInfo,
    dispatchRecordCurrentStore,
    fetchTotalOperationChart,
    createNewStore,
    updateStore
  }
}
