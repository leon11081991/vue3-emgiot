import type { BaseGroupUpdateReqType, ReArrangeGroupReqType } from '@/models/types/group.types'
import { type ApiResponse, ApiFactory } from '@/utils/api'
import { GroupEnums } from '@/constants/enums/api/group.enum'

export class GroupServices extends ApiFactory {
  constructor() {
    super('')
  }

  /* 取得機台自訂分類清單 */
  getGroup = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(GroupEnums.get)
  }

  /* 重新分類機台群組 */
  reArrangeGroup = async (params: ReArrangeGroupReqType): Promise<ApiResponse> => {
    return await this.put<unknown, ApiResponse>(GroupEnums.reArrange, params)
  }

  /* 新增機台自訂分類 */
  addGroup = async (params: string): Promise<ApiResponse> => {
    return await this.post<unknown, ApiResponse>(GroupEnums.add, params)
  }

  /* 編輯機台自訂分類 */
  updateGroup = async (params: BaseGroupUpdateReqType): Promise<ApiResponse> => {
    return await this.put<unknown, ApiResponse>(GroupEnums.update, params)
  }

  /* 刪除機台自訂分類 */
  deleteGroup = async (params: string): Promise<ApiResponse> => {
    return await this.delete<unknown, ApiResponse>(GroupEnums.delete, params)
  }
}
