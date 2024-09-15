import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { GetOperationChartReqType, GetClawOperationsInfoReqType, GetCoinOperationsInfoReqType } from '@/models/types/dashboard.types'
import { DashboardEnum } from '@/constants/enums/api/dashboard.enums'

export class DashboardServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得首頁運營圖表 */
  getOperationChart = async (params: GetOperationChartReqType): Promise<ApiResponse> => {
    return await this.get<GetOperationChartReqType, ApiResponse>(DashboardEnum.operationsChart, params)
  }

  /** 取得選物機運營清單 */
  getClawOperationsInfo = async (params: GetClawOperationsInfoReqType): Promise<ApiResponse> => {
    return await this.get<GetClawOperationsInfoReqType, ApiResponse>(DashboardEnum.clawOperationsInfo, params)
  }

  /** 取得兌幣機運營清單 */
  getCoinOperationsInfo = async (params: GetCoinOperationsInfoReqType): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DashboardEnum.coinOperationsInfo, params)
  }
}