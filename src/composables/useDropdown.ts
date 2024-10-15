import type {
  BaseGroupsDDLResType,
  BaseGoodsResType,
  PcbsReqType
} from '@/models/types/dropdown.type'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'

export const useDropdown = () => {
  const { openMessage } = useMessage()

  // 可用機台群組
  const groupsDDLList = ref<{
    data: BaseGroupsDDLResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  // 可用商品
  const goodsList = ref<{
    data: BaseGoodsResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  // 可用機台
  const pcbsList = ref<{
    data: PcbsReqType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  /** 取得可用機台群組 */
  const fetchGroupsDDLList = async () => {
    try {
      const { result, isSuccess, message, resultCode } = await api.dropdown.getGroupsDDL()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      groupsDDLList.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      groupsDDLList.value.isLoading = false
    }
  }

  /** 取得可用商品群組 */
  const fetchGoodsList = async () => {
    try {
      const { result, isSuccess, message, resultCode } = await api.dropdown.getGoods()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      goodsList.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      goodsList.value.isLoading = false
    }
  }

  /** 取得可用機台 */
  const fetchPcbsList = async (storeId: string) => {
    try {
      const { result, isSuccess } = await api.dropdown.getPcbs({ storeId })

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      pcbsList.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      pcbsList.value.isLoading = false
    }
  }

  return {
    groupsDDLList,
    goodsList,
    pcbsList,
    fetchGroupsDDLList,
    fetchGoodsList,
    fetchPcbsList
  }
}
