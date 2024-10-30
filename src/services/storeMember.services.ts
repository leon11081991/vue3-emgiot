import { type ApiResponse, ApiFactory } from '@/utils/api'
import type {
  StoreMemberInfoReqType,
  HideIdentityReqType,
  UpdateStoreMemberInfoReqType,
  AddInviteMemberReqType
} from '@/models/types/storeMember.types'
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

  /** 對底下所有成員隱身 */
  hideIdentity = async (body: HideIdentityReqType): Promise<ApiResponse> => {
    return await this.put<HideIdentityReqType, ApiResponse>(StoreMemberEnums.hideIdentity, body)
  }

  /** 取得成員資訊 */
  getStoreMemberInfo = async (params: StoreMemberInfoReqType): Promise<ApiResponse> => {
    return await this.get<StoreMemberInfoReqType, ApiResponse>(StoreMemberEnums.memberInfo, params)
  }

  /** 變更成員資訊 */
  updateStoreMemberInfo = async (body: UpdateStoreMemberInfoReqType): Promise<ApiResponse> => {
    return await this.put<unknown, ApiResponse>(StoreMemberEnums.updateMember, body)
  }

  /** 刪除成員 */
  deleteStoreMember = async (body: StoreMemberInfoReqType): Promise<ApiResponse> => {
    return await this.delete<StoreMemberInfoReqType, ApiResponse>(
      StoreMemberEnums.deleteMember,
      body
    )
  }

  /** 邀請新成員 */
  addInviteMember = async (body: AddInviteMemberReqType) => {
    return await this.post<AddInviteMemberReqType, ApiResponse>(StoreMemberEnums.addInvite, body)
  }

  /** 成員加入 */
  memberJoin = async (body: string) => {
    return await this.post<string, ApiResponse>(StoreMemberEnums.memberJoin, body)
  }
}
