import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { BaseAddGoodsInfoType, BaseEditGoodsInfoType } from '@/models/types/goods.types'
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

  /* 刪除商品 */
  delete = async <Response = ApiResponse>(params: string): Promise<Response> => {
    return await super.delete<unknown, Response>(GoodsEnums.delete, params)
  }

  /* 商品營運數據清單 */
  operationInfo = async (params: string): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(GoodsEnums.info, { input: params })
  }

  /* 商品營運數據圖表 */
  operationInfoChart = async (params: string): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(GoodsEnums.chart, { input: params })
  }
}
