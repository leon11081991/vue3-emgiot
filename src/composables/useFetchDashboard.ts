import type { ClawOperationsInfoResType, GetClawOperationsInfoReqType } from '@/models/types/dashboard.types'
import { ref } from 'vue'
import { api } from '@/services'

export const useFetchDashboard = () => {
  const clawOperationsInfo = ref<{
    data: ClawOperationsInfoResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  // TODO: WIP
  const fetchClawOperationsInfo = async (params: GetClawOperationsInfoReqType) => {
    try {
      const { result, isSuccess } = await api.dashboard.getClawOperationsInfo(params)

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      clawOperationsInfo.value.data = result
    } catch (error) {
      // TODO: 錯誤處理
    } finally {
      clawOperationsInfo.value.isLoading = false
    }

  }

  return {
    clawOperationsInfo,
    fetchClawOperationsInfo
  }
}