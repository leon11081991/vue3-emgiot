import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { UpdatePcbNameReqType, UpdateGoodsReqType } from '@/models/types/pcbRegister.types'
import { PcbRegisterEnums } from '@/constants/enums/api/pcbRegister.enums'

export class PcbRegisterServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 編輯機台名稱 */
  updatePcbName = async (body: UpdatePcbNameReqType) => {
    return await this.put<UpdatePcbNameReqType, ApiResponse>(PcbRegisterEnums.updatePcbName, body)
  }

  /** 更換機台商品 */
  updateGoods = async (body: UpdateGoodsReqType) => {
    return await this.put<UpdateGoodsReqType, ApiResponse>(PcbRegisterEnums.updateGoods, body)
  }
}
