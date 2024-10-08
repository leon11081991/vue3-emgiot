import { type ApiResponse, ApiFactory } from '@/utils/api'
import { DropdownEnum } from '@/constants/enums/api/dropdown.enums'

export class DropdownServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得店家選物機圖表 */
  getGroupsDDL = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DropdownEnum.getGroupsDDL)
  }

  /** 取得店家兌幣機圖表 */
  getGoods = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(DropdownEnum.getGoods)
  }
}
