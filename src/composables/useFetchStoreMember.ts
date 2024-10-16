import type {
  StoreMemberResType,
  StoreMemberInfoReqType,
  StoreMemberInfoDataType
} from '@/models/types/storeMember.types'
import { ref } from 'vue'
import { api } from '@/services'
import { StoreMemberDto } from '@/utils/api/dto/storeMember.dto'

export const useFetchStoreMember = () => {
  /** 店家成員清單 */
  const storeMembers = ref<{
    data: StoreMemberResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  const storeMemberInfo = ref<{
    data: StoreMemberInfoDataType
    isLoading: boolean
  }>({
    data: {} as StoreMemberInfoDataType,
    isLoading: true
  })

  /** 處理取得店家成員清單 */
  const fnGetStoreMembers = async () => {
    try {
      const { result, isSuccess, resultCode } = await api.storeMember.getStoreMembers()

      console.log('[fnGetStoreMembers]', result, isSuccess, resultCode)
      if (!isSuccess) {
        //  TODO: 錯誤處理
        return
      }

      storeMembers.value.data = result
    } catch (error) {
      //  TODO: 錯誤處理
    } finally {
      storeMembers.value.isLoading = false
    }
  }

  /** 處理取得成員資訊 */
  const fnGetStoreMemberInfo = async (params: StoreMemberInfoReqType) => {
    try {
      const { result, isSuccess, resultCode } = await api.storeMember.getStoreMemberInfo(params)

      console.log('[fnGetStoreMemberInfo]', result, isSuccess, resultCode)
      if (!isSuccess) {
        //  TODO: 錯誤處理
        return
      }

      storeMemberInfo.value.data = StoreMemberDto.FormattedStoreMemberInfoData(result)
    } catch (error) {
      //  TODO: 錯誤處理
    } finally {
      storeMemberInfo.value.isLoading = false
    }
  }

  /** 處理變更成員資訊 */
  const fnUpdateStoreMemberInfo = async (params: StoreMemberInfoDataType) => {
    try {
      console.log('[fnUpdateStoreMemberInfo]', params)

      const { result, isSuccess, resultCode } = await api.storeMember.updateStoreMemberInfo(
        StoreMemberDto.FormattedUpdateReqData(params)
      )
    } catch (error) {
      //  TODO: 錯誤處理
    }
  }

  return {
    storeMembers,
    storeMemberInfo,
    fnGetStoreMembers,
    fnGetStoreMemberInfo,
    fnUpdateStoreMemberInfo
  }
}
