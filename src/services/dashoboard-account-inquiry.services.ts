import type {
  MachineOperationsDetailReqType,
  MachineOperationsDetailResType
} from '@/models/types/machine.types'
import { type ApiResponse, ApiFactory } from '@/utils/api'
import { ClawMachineEnum } from '@/constants/enums/api/clawMachine.enums'
// import { CoinMachineEnum } from '@/constants/enums/api/coinMachine.enums'

export class DashboardAccountInquiryServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得選物機帳務清單 */
  getClawOperationsDetail = async (
    param: MachineOperationsDetailReqType
  ): Promise<ApiResponse<MachineOperationsDetailResType>> => {
    return await this.get<MachineOperationsDetailReqType, ApiResponse>(
      ClawMachineEnum.operationsDetail,
      param
    )
  }

  /** 取得選物機商品紀錄清單 */
  getClawGoodsRecord = async (param: MachineOperationsDetailReqType) => {
    return await this.get<MachineOperationsDetailReqType, ApiResponse>(
      ClawMachineEnum.goodsRecord,
      param
    )
  }

  /** 取得選物機事件紀錄清單 */
  // getClawEventRecord = async (param) => {

  // }

  /** 取得兌幣機帳務清單 */

  /** 取得兌幣機商品紀錄清單 */

  /** 取得兌幣機事件紀錄清單 */
}
