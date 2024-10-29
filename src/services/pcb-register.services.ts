import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { UpdatePcbNameReqType } from '@/models/types/pcbRegister.types'
import { PcbRegisterEnums } from '@/constants/enums/api/pcbRegister.enums'

export class PcbRegisterServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 編輯機台名稱 */
  updatePcbName = async (body: UpdatePcbNameReqType) => {
    return await this.put<UpdatePcbNameReqType, ApiResponse>(PcbRegisterEnums.updatePcbName, body)
  }
}
