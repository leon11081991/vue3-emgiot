import { type ApiResponse, ApiFactory } from '@/utils/api'
import type {
  GetOperationChartReqType,
  GetClawOperationsInfoReqType,
  GetCoinOperationsInfoReqType
} from '@/models/types/dashboard.types'
import { DashboardEnum } from '@/constants/enums/api/dashboard.enums'

export class DashboardServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得店家選物機圖表 */
  getOperationClawChart = async (params: GetOperationChartReqType): Promise<ApiResponse> => {
    return await this.get<GetOperationChartReqType, ApiResponse>(
      DashboardEnum.operationsClawChart,
      params
    )
  }

  /** 取得店家兌幣機圖表 */
  getOperationCoinChart = async (params: GetOperationChartReqType): Promise<ApiResponse> => {
    return await this.get<GetOperationChartReqType, ApiResponse>(
      DashboardEnum.operationsCoinChart,
      params
    )
  }

  /** 取得店家選物機運營清單 */
  getClawOperationsInfo = async (params: GetClawOperationsInfoReqType): Promise<ApiResponse> => {
    return await this.get<GetClawOperationsInfoReqType, ApiResponse>(
      DashboardEnum.clawOperationsInfo,
      params
    )
  }

  /** 取得店家兌幣機運營清單 */
  getCoinOperationsInfo = async (params: GetCoinOperationsInfoReqType): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DashboardEnum.coinOperationsInfo, params)
  }
}
