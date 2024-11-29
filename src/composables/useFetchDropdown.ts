import type {
  BaseGroupsDDLResType,
  BaseGoodsResType,
  PcbsResType,
  UserRoleInStoreResType,
  StoresItemDataType,
  GoodsDDLReqType
} from '@/models/types/dropdown.type'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { DropdownDto } from '@/utils/api/dto/dropdown.dto'

export const useFetchDropdown = () => {
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
    data: PcbsResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  // 權限設定
  const userRoleInStoreList = ref<{
    data: UserRoleInStoreResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  // 可用店家
  const storesList = ref<{
    data: StoresItemDataType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  // 可用商品
  const goodsDDLList = ref<{
    data: GoodsDDLReqType
    isLoading: boolean
  }>({
    data: [] as GoodsDDLReqType,
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
  const fetchPcbsList = async (storeId: string, machineType?: 0 | 1) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.dropdown.getPcbs({
        storeId,
        machineType
      })

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      pcbsList.value.data = DropdownDto.FilterEmptyNameData(result)
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      pcbsList.value.isLoading = false
    }
  }

  /** 處理權限設定 */
  const fetchUserRoleInStore = async (storeId: string) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.dropdown.userRoleInStore({
        storeId
      })

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      userRoleInStoreList.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      userRoleInStoreList.value.isLoading = false
    }
  }

  /** 處理可用店家 */
  const fetchStoresList = async (): Promise<void> => {
    try {
      const { result, isSuccess, message, resultCode } = await api.dropdown.getStores()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      storesList.value.data = result['stores']
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      storesList.value.isLoading = false
    }
  }

  /** 處理可用商品 */
  const fetchGoodsDDLList = async (): Promise<void> => {
    try {
      const { result, isSuccess, message, resultCode } = await api.dropdown.getGoodsDDL()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      goodsDDLList.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      goodsDDLList.value.isLoading = false
    }
  }

  return {
    groupsDDLList,
    goodsList,
    pcbsList,
    userRoleInStoreList,
    storesList,
    goodsDDLList,
    fetchGroupsDDLList,
    fetchGoodsList,
    fetchPcbsList,
    fetchUserRoleInStore,
    fetchStoresList,
    fetchGoodsDDLList
  }
}
