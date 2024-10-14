import type {
  StoreMemberInfoResType,
  StoreMemberInfoDataType,
  UpdateStoreMemberInfoReqType
} from '@/models/types/storeMember.types'

export class StoreMemberDto {
  /** 轉換資料為 StoreMemberInfoDataType */
  static FormattedStoreMemberInfoData(content: StoreMemberInfoResType): StoreMemberInfoDataType {
    const toReturn = {
      ...content,
      isForbidden: content.forbiddenPcbs?.length > 0 // 如果有禁用裝置則為 true
    }
    return toReturn
  }

  /** 轉換資料為 UpdateStoreMemberInfoReqType */
  static FormattedUpdateReqData(content: StoreMemberInfoDataType) {
    const toReturn = {} as UpdateStoreMemberInfoReqType

    toReturn['storeId'] = content.storeId as string
    toReturn['userId'] = content.userId
    toReturn['roleOrder'] = content.roleOrder
    toReturn['isSpecial'] = content.isSpecial
    toReturn['isGoodsManagement'] = content.isGoodsManagement
    toReturn['forbiddenPcbs'] = content.isForbidden ? content.forbiddenPcbs : []

    return toReturn
  }
}
