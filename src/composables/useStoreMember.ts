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

  /** 更新使用者資料為布林值的資料 */
  const updateMemberData = (
    payload: { value: boolean | string | string[]; key: keyof StoreMemberInfoDataType },
    memberInfoData: StoreMemberInfoDataType
  ) => {
    const { value: val, key } = payload

    if (key === 'isForbidden' && typeof val === 'boolean') {
      handleIsForbidden(val, key, memberInfoData)
    }

    if (typeof memberInfoData[key] === typeof val || Array.isArray(val)) {
      ;(memberInfoData[key] as typeof val) = val
    }
  }

  /** 處理啟用裝置啟用 */
  const handleIsForbidden = (
    val: boolean,
    key: keyof StoreMemberInfoDataType,
    memberInfoData: StoreMemberInfoDataType
  ) => {
    if (key !== 'isForbidden') return
    resetForbiddenPcbsIfNeeded(val, memberInfoData)
  }

  return {
    changePermissionSetting,
    resetForbiddenPcbsIfNeeded,
    updateMemberData
  }
}
