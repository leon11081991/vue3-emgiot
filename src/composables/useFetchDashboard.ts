import type {
  ClawOperationsInfoResType,
  GetClawOperationsInfoReqType,
  GetOperationChartReqType,
  OperationChartResType
} from '@/models/types/dashboard.types'
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

  // 待優化
  const operationChart = ref<{
    data: OperationChartResType
    isLoading: boolean
  }>({
    data: {
      clawMachine: [],
      coinMachine: []
    },
    isLoading: true
  })
  const fetchOperationChart = async (params: GetOperationChartReqType) => {
    try {
      const { result, isSuccess } = await api.dashboard.getOperationChart(params)

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      operationChart.value.data = result
    } catch (error) {
      // TODO: 錯誤處理
    } finally {
      operationChart.value.isLoading = false
    }
  }

  return {
    clawOperationsInfo,
    operationChart,
    fetchClawOperationsInfo,
    fetchOperationChart
  }
}
