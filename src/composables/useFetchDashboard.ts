import type {
  ClawOperationsInfoResType,
  CoinOperationsInfoResType,
  GetClawOperationsInfoReqType,
  GetCoinOperationsInfoReqType,
  GetOperationChartReqType,
  OperationChartResType
} from '@/models/types/dashboard.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'

export const useFetchDashboard = () => {
  const { openMessage } = useMessage()

  // TODO: 待優化
  /** 首頁運營圖表 */
  const operationChart = ref<{
    data: OperationChartResType
    isLoading: {
      clawMachine: boolean
      coinMachine: boolean
    }
  }>({
    data: {
      clawMachine: [],
      coinMachine: []
    },
    isLoading: {
      clawMachine: true,
      coinMachine: true
    }
  })

  /** 選物機運營清單 */
  const clawOperationsInfo = ref<{
    data: ClawOperationsInfoResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  /** 兌幣機運營清單 */
  const coinOperationsInfo = ref<{
    data: CoinOperationsInfoResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  const fetchOperationClawChart = async (params: GetOperationChartReqType) => {
    try {
      const { result, isSuccess } = await api.dashboard.getOperationClawChart(params)

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      operationChart.value.data.clawMachine = result
    } catch (error) {
      // TODO: 錯誤處理
    } finally {
      operationChart.value.isLoading.clawMachine = false
    }
  }

  const fetchOperationCoinChart = async (params: GetOperationChartReqType) => {
    try {
      const { result, isSuccess } = await api.dashboard.getOperationCoinChart(params)

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      operationChart.value.data.coinMachine = result
    } catch (error) {
      // TODO: 錯誤處理
    } finally {
      operationChart.value.isLoading.coinMachine = false
    }
  }

  // TODO: WIP
  /** 處理取得選物機運營清單 */
  const fetchClawOperationsInfo = async (params: GetClawOperationsInfoReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.dashboard.getClawOperationsInfo(params)
      // const res = await api.dashboard.getClawOperationsInfo(params)

      // if (!res.IsSuccess) {
      if (!isSuccess) {
        // openMessage('error', `${res.ResultCode} - ${res.Message}`)
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      clawOperationsInfo.value.data = result
    } catch (error) {
      // TODO: 錯誤處理
    } finally {
      clawOperationsInfo.value.isLoading = false
    }
  }

  // TODO: WIP
  /** 處理取得兌幣機運營清單 */
  const fetchCoinOperationsInfo = async (params: GetCoinOperationsInfoReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.dashboard.getCoinOperationsInfo(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      coinOperationsInfo.value.data = result
    } catch (error) {
      // TODO: 錯誤處理
    } finally {
      coinOperationsInfo.value.isLoading = false
    }
  }

  return {
    operationChart,
    clawOperationsInfo,
    coinOperationsInfo,
    fetchCoinOperationsInfo,
    fetchClawOperationsInfo,
    fetchOperationClawChart,
    fetchOperationCoinChart
  }
}
