import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { BaseAddGoodsInfoType, BaseEditGoodsInfoType } from '@/models/types/goods.type'
import { GoodsEnums } from '@/constants/enums/api/goods.enum'

export class GoodsServices extends ApiFactory {
  constructor() {
    super('')
  }

  /* 編輯商品 */
  edit = async (params: BaseEditGoodsInfoType): Promise<ApiResponse> => {
    return await this.put<unknown, ApiResponse>(GoodsEnums.edit, params)
  }

  /* 建立商品 */
  add = async (params: BaseAddGoodsInfoType): Promise<ApiResponse> => {
    return await this.post<unknown, ApiResponse>(GoodsEnums.add, params)
  }
}
