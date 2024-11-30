import type {
  ClawOperationsInfoResType,
  ClawOperationsInfoDataType,
  CoinOperationsInfoResType,
  CoinOperationsInfoDataType,
  UpdateMachineActionDataType,
  UpdateMachineActionReqType
} from '@/models/types/dashboard.types'
import { UtilCommon } from '@/utils/utilCommon'

export class DashboardDto {
  /** 轉換格式為 ClawOperationsInfoDataType */
  static FormattedClawOperationsInfoData(
    content: ClawOperationsInfoResType[]
  ): ClawOperationsInfoDataType[] {
    /** 資料中增加uuid */
    return content?.map((item) => {
      return {
        ...item,
        uuid: UtilCommon.generateUUID()
      }
    })
  }

  /** 轉換格式為 CoinOperationsInfoDataType */
  static FormattedCoinOperationsInfoData(
    content: CoinOperationsInfoResType[]
  ): CoinOperationsInfoDataType[] {
    /** 資料中增加uuid */
    return content?.map((item) => {
      return {
        ...item,
        uuid: UtilCommon.generateUUID()
      }
    })
  }

  /** 轉換格式為 UpdateMachineActionReqType */
  static FormattedUpdateMachineActionData(
    content: UpdateMachineActionDataType
  ): UpdateMachineActionReqType[] {
    const toReturn = [] as UpdateMachineActionReqType[]

    // 如果content.pcbId 為非陣列
    if (!Array.isArray(content.pcbId)) {
      toReturn.push({
        pcbId: content.pcbId,
        action: content.action,
        count: content.count
      })
    }

    // 如果content.pcbId 為陣列
    if (Array.isArray(content.pcbId)) {
      content.pcbId.forEach((pcbId) => {
        toReturn.push({
          pcbId,
          action: content.action,
          count: content.count
        })
      })
    }

    return toReturn
  }
}
