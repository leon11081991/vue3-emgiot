import { type ApiResponse, ApiFactory } from '@/utils/api'
import { StoreEnums } from '@/constants/enums/api/store.enums'

export class StoreServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得店家資訊清單 */
  getStoresListInfo = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(StoreEnums.stores)
  }
}
