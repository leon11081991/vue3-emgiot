import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { BaseCreateStoreReqType } from '@/models/types/store.types'
import { StoreEnums } from '@/constants/enums/api/store.enums'

export class StoreServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得總total店家資訊清單 */
  getTotalOperationChart = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(StoreEnums.totalOperationsChart)
  }

  /** 取得所有店家資訊清單 */
  getStoresListInfo = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(StoreEnums.stores)
  }

  /** 記錄當下點選的店家 */
  recordCurrentStore = async (params: string): Promise<ApiResponse> => {
    return await this.post<string, ApiResponse>(StoreEnums.recordCurrentStore, params)
  }

  /** 建立新店家 */
  createNewStore = async (params: BaseCreateStoreReqType): Promise<ApiResponse> => {
    return await this.post<BaseCreateStoreReqType, ApiResponse>(StoreEnums.add, params)
  }

  /** 更新店家 */
  updateStore = async (params: BaseCreateStoreReqType): Promise<ApiResponse> => {
    return await this.put<BaseCreateStoreReqType, ApiResponse>(StoreEnums.update, params)
  }
}
