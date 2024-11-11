import type {
  StoreMemberInfoResType,
  StoreMemberInfoDataType,
  UpdateStoreMemberInfoReqType,
  AddInviteMemberReqType
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
  static FormattedUpdateReqData(content: StoreMemberInfoDataType): UpdateStoreMemberInfoReqType {
    const toReturn = {} as UpdateStoreMemberInfoReqType

    toReturn['storeId'] = content.storeId as string
    toReturn['userId'] = content.userId
    toReturn['roleId'] = content.roleId
    toReturn['isSpecial'] = content.isSpecial
    toReturn['isGoodsManagement'] = content.isGoodsManagement
    toReturn['isInvisibleToThisUser'] = content.isInvisibleToThisUser
    toReturn['forbiddenPcbs'] = content.isForbidden ? content.forbiddenPcbs : []

    return toReturn
  }

  /** 轉換資料為 AddInviteMemberReqType */
  static FormattedAddInviteReqData(content: StoreMemberInfoDataType): AddInviteMemberReqType {
    const toReturn = {} as AddInviteMemberReqType

    toReturn['storeId'] = content.storeId as string
    toReturn['roleId'] = content.roleId
    toReturn['forbiddenPcbs'] = content.isForbidden ? content.forbiddenPcbs : []
    toReturn['isGoodsManagement'] = content.isGoodsManagement
    toReturn['isSpecial'] = content.isSpecial
    toReturn['isInvisibleToThisUser'] = content.isInvisibleToThisUser

    return toReturn
  }
}
