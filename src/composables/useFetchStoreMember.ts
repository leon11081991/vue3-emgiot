import type { StoreMemberResType, StoreMemberInfoReqType } from '@/models/types/storeMember.types'
import { ref } from 'vue'
import { api } from '@/services'

export const useFetchStoreMember = () => {
  /** 店家成員清單 */
  const storeMembers = ref<{
    data: StoreMemberResType[]
    isLoading: boolean
  }>({
    data: [],
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
    } catch (error) {
      //  TODO: 錯誤處理
    }
  }

  return {
    storeMembers,
    fnGetStoreMembers,
    fnGetStoreMemberInfo
  }
}
