import type { GetClawOperationsInfoReqType } from '@/models/types/dashboard.types'
import { ref } from 'vue'
import { api } from '@/services'

export const useFetchDashboard = () => {
  const clawOperationsInfo = ref<{
    data: any[]
  }>()

  // TODO: WIP
  const fetchClawOperationsInfo = async (params: GetClawOperationsInfoReqType) => {
    try {
      const res = await api.dashboard.getClawOperationsInfo(params)
      console.log("[fetchClawOperationsInfo] res", res);
    } catch (error) {

    }

  }

  return {
    clawOperationsInfo,
    fetchClawOperationsInfo
  }
}