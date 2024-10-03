import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { StoreMemberInfoReqType } from '@/models/types/storeMember.types'
import { StoreMemberEnums } from '@/constants/enums/api/storeMember.enums'

/** 成員管理 */
export class StoreMemberService extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得店家成員清單 */
  getStoreMembers = async (): Promise<ApiResponse> => {
    return await this.get<unknown, ApiResponse>(StoreMemberEnums.members)
  }

  /** 取得成員資訊 */
  getStoreMemberInfo = async (params: StoreMemberInfoReqType): Promise<ApiResponse> => {
    return await this.get<StoreMemberInfoReqType, ApiResponse>(StoreMemberEnums.memberInfo, params)
  }
}
