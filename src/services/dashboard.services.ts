import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { GetClawOperationsInfoReqType } from '@/models/types/dashboard.types'
import { DashboardEnum } from '@/constants/enums/api/dashboard.enums'

export class DashboardServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得選物機運營清單 */
  getClawOperationsInfo = async (params: GetClawOperationsInfoReqType): Promise<ApiResponse> => {
    return await this.get<GetClawOperationsInfoReqType, ApiResponse>(DashboardEnum.clawOperationsInfo, params)
  }
}