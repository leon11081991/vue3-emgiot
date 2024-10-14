import { type ApiResponse, ApiFactory } from '@/utils/api'
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
}
