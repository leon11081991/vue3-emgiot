import type { StoreMemberInfoDataType } from '@/models/types/storeMember.types'

export const useStoreMember = () => {
  /** 變更權限設定 */
  const changePermissionSetting = (val: string, memberInfo: StoreMemberInfoDataType) => {
    memberInfo.roleId = val
  }

  /** 清除啟用裝置選項 */
  const resetForbiddenPcbsIfNeeded = (val: boolean, memberInfo: StoreMemberInfoDataType) => {
    if (val) return
    memberInfo.forbiddenPcbs.length = 0
  }

  return {
    changePermissionSetting,
    resetForbiddenPcbsIfNeeded
  }
}
