import type { MachineType } from '@/models/types/machine.types'
import type {
  ClawOperationsInfoDataType,
  CoinOperationsInfoDataType,
  GetClawOperationsInfoReqType,
  GetCoinOperationsInfoReqType,
  GetOperationChartReqType,
  OperationChartResType,
  BaseMachineActionType
} from '@/models/types/dashboard.types'
import type {
  MachineOperationsDetailReqType,
  ClawOperationsDetailResType,
  CoinOperationsDetailResType,
  GetClawGoodsRecordResType,
  MachineEventRecordsResType
} from '@/models/types/machine.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useI18n } from 'vue-i18n'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { DashboardDto } from '@/utils/api/dto/dashboard.dto'
import { machineActionMapping } from '@/constants/mappings/dashboard.mapping'

export const useFetchDashboard = () => {
  const { t: $t } = useI18n()
  const { openMessage } = useMessage()

  /** 店家運營圖表 */
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
    data: ClawOperationsInfoDataType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  /** 兌幣機運營清單 */
  const coinOperationsInfo = ref<{
    data: CoinOperationsInfoDataType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  /** 選物機帳務清單 */
  const clawOperationsDetailRecords = ref<{
    data: ClawOperationsDetailResType
    isLoading: boolean
  }>({
    data: {} as ClawOperationsDetailResType,
    isLoading: true
  })

  /** 兌幣機帳務清單 */
  const coinOperationsDetailRecords = ref<{
    data: CoinOperationsDetailResType
    isLoading: boolean
  }>({
    data: {} as CoinOperationsDetailResType,
    isLoading: true
  })

  /** 選物機商品紀錄清單 */
  const clawGoodsRecords = ref<{
    data: GetClawGoodsRecordResType
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  /** 事件紀錄清單 */
  const machineEventRecords = ref<{
    data: MachineEventRecordsResType
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  /** 選物機商品紀錄清單 */
  const fetchOperationClawChart = async (params: GetOperationChartReqType) => {
    try {
      const { result, isSuccess } = await api.dashboard.getOperationClawChart(params)

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      operationChart.value.data.clawMachine = result
    } catch (e) {
      catchErrorHandler(e)
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
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      operationChart.value.isLoading.coinMachine = false
    }
  }

  /** 處理取得選物機運營清單 */
  const fetchClawOperationsInfo = async (params: GetClawOperationsInfoReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.dashboard.getClawOperationsInfo(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      clawOperationsInfo.value.data = DashboardDto.FormattedClawOperationsInfoData(result)
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      clawOperationsInfo.value.isLoading = false
    }
  }

  /** 處理取得兌幣機運營清單 */
  const fetchCoinOperationsInfo = async (params: GetCoinOperationsInfoReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.dashboard.getCoinOperationsInfo(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      coinOperationsInfo.value.data = DashboardDto.FormattedCoinOperationsInfoData(result)
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      coinOperationsInfo.value.isLoading = false
    }
  }

  /** 處理機台操作 */
  const fnUpdateMachineAction = async (
    pcbId: string | string[],
    action: BaseMachineActionType,
    count: number
  ): Promise<boolean> => {
    try {
      const { isSuccess, resultCode, message } = await api.dashboard.updateMachineAction(
        DashboardDto.FormattedUpdateMachineActionData({
          pcbId,
          action,
          count
        })
      )

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return false
      }

      const machineAction = machineActionMapping[action]

      openMessage('success', `${machineAction}  ${$t('Common.Response.Success')}`)
      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  /** (帳務查詢)處理取得選物機帳務清單 */
  const fnGetClawOperationsDetail = async (params: MachineOperationsDetailReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.dashboardAccountInquiry.getClawOperationsDetail(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      clawOperationsDetailRecords.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      clawOperationsDetailRecords.value.isLoading = false
    }
  }

  /** (帳務查詢)處理取得兌幣機帳務清單 */
  const fnGetCoinOperationsDetail = async (params: MachineOperationsDetailReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.dashboardAccountInquiry.getCoinOperationsDetail(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      coinOperationsDetailRecords.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      coinOperationsDetailRecords.value.isLoading = false
    }
  }

  /** (帳務查詢)處理取得選物機商品紀錄清單 */
  const fnGetClawGoodsRecord = async (params: MachineOperationsDetailReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.dashboardAccountInquiry.getClawGoodsRecord(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      clawGoodsRecords.value.data = result ?? []
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      clawGoodsRecords.value.isLoading = false
    }
  }

  /** (帳務查詢)處理取得選物機或兌幣機事件紀錄清單 */
  const fnGetMachineEventRecord = async (
    params: MachineOperationsDetailReqType,
    machineType: MachineType
  ) => {
    try {
      const apiCall =
        machineType === 'claw'
          ? api.dashboardAccountInquiry.getClawEventRecord
          : api.dashboardAccountInquiry.getCoinEventRecord

      const { result, isSuccess, message, resultCode } = await apiCall(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      machineEventRecords.value.data = result ?? []
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      machineEventRecords.value.isLoading = false
    }
  }

  return {
    operationChart,
    clawOperationsInfo,
    coinOperationsInfo,
    clawOperationsDetailRecords,
    coinOperationsDetailRecords,
    clawGoodsRecords,
    machineEventRecords,
    fetchCoinOperationsInfo,
    fetchClawOperationsInfo,
    fetchOperationClawChart,
    fetchOperationCoinChart,
    fnUpdateMachineAction,
    fnGetClawOperationsDetail,
    fnGetCoinOperationsDetail,
    fnGetClawGoodsRecord,
    fnGetMachineEventRecord
  }
}
