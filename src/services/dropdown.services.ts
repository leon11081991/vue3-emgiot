import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { PcbsReqType, UserRoleInStoreReqType } from '@/models/types/dropdown.type'
import { DropdownEnum } from '@/constants/enums/api/dropdown.enums'

export class DropdownServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得可用機台群組  */
  getGroupsDDL = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DropdownEnum.getGroupsDDL)
  }

  /** 取得可用商品群組 */
  getGoods = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DropdownEnum.getGoods)
  }

  /** 取得可用機台 */
  getPcbs = async (params: PcbsReqType): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DropdownEnum.getPcbs, params)
  }

  /** 取得權限設定 */
  userRoleInStore = async (storeId: UserRoleInStoreReqType): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DropdownEnum.userRoleInStore, storeId)
  }

  /** 可用店家 */
  getStores = async () => {
    return await this.get<unknown, ApiResponse>(DropdownEnum.getStores)
  }
}
