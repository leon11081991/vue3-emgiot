import type {
  StoreMemberResType,
  HideIdentityReqType,
  StoreMemberInfoReqType,
  StoreMemberInfoDataType,
  DeleteStoreMemberReqType
} from '@/models/types/storeMember.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { useNotification } from '@/composables/useNotification'
import { StoreMemberDto } from '@/utils/api/dto/storeMember.dto'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { UtilCommon } from '@/utils/utilCommon'
import { getI18nTranslate } from '@/utils/i18nUtils'

const { openMessage } = useMessage()
const { openNotification } = useNotification()

/** 處理成員相關 api 資料邏輯 */
export const useFetchStoreMember = () => {
  /** 店家成員清單 */
  const storeMembers = ref<{
    data: StoreMemberResType[]
    isLoading: boolean
  }>({
    data: [],
    isLoading: true
  })

  const storeMemberInfo = ref<{
    data: StoreMemberInfoDataType
    isLoading: boolean
  }>({
    data: {} as StoreMemberInfoDataType,
    isLoading: true
  })

  /** 處理取得店家成員清單 */
  const fetchStoreMembers = async (): Promise<void> => {
    try {
      const { result, isSuccess, resultCode, message } = await api.storeMember.getStoreMembers()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      storeMembers.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      storeMembers.value.isLoading = false
    }
  }

  /** 處理對底下所有成員隱身 */
  const fnHideIdentity = async (params: HideIdentityReqType): Promise<boolean> => {
    try {
      const { isSuccess, resultCode, message } = await api.storeMember.hideIdentity(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return false
      }

      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  /** 處理取得成員資訊 */
  const fetchStoreMemberInfo = async (params: StoreMemberInfoReqType): Promise<void> => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.storeMember.getStoreMemberInfo(params)

      if (!isSuccess) {
        return openMessage('error', `${resultCode} - ${message}`)
      }

      storeMemberInfo.value.data = StoreMemberDto.FormattedStoreMemberInfoData(result)
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      storeMemberInfo.value.isLoading = false
    }
  }

  /** 處理變更成員資訊 */
  const fnUpdateStoreMemberInfo = async (params: StoreMemberInfoDataType): Promise<void> => {
    try {
      const { result, isSuccess, resultCode, message } =
        await api.storeMember.updateStoreMemberInfo(StoreMemberDto.FormattedUpdateReqData(params))
      console.log('fnUpdateStoreMemberInfo result', result)

      if (!isSuccess) {
        return openMessage('error', `${resultCode} - ${message}`)
      }

      return openMessage(
        'success',
        getI18nTranslate('MemberInfoPage.Message.UpdateSuccess'),
        { duration: 1.5 },
        () => UtilCommon.scrollToTop()
      )
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理刪除成員 */
  const fnDeleteStoreMember = async (params: DeleteStoreMemberReqType): Promise<boolean> => {
    try {
      const { isSuccess, resultCode, message } = await api.storeMember.deleteStoreMember(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return false
      }

      openMessage(
        'success',
        getI18nTranslate('MemberInfoPage.Message.DeleteSuccess'),
        {
          duration: 1.5
        },
        () => UtilCommon.goPage('/member')
      )
      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  /** 處理邀請新成員 */
  const fnAddInviteMember = async (params: StoreMemberInfoDataType): Promise<void | string> => {
    try {
      const { result, isSuccess, message, resultCode } = await api.storeMember.addInviteMember(
        StoreMemberDto.FormattedAddInviteReqData(params)
      )

      if (!isSuccess) {
        return openNotification(
          {
            title: '邀請成員',
            subTitle: `${resultCode} - ${message}`
          },
          'error',
          'top',
          () => UtilCommon.goPage('/member')
        )
      }
      console.log('fnAddInviteMember', result)
      return result
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理成員加入 */
  const fnMemberJoin = async (params: string): Promise<boolean> => {
    try {
      const { result, isSuccess, message, resultCode } = await api.storeMember.memberJoin(params)
      console.log('fnMemberJoin', result, isSuccess, message, resultCode)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return false
      }

      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  return {
    storeMembers,
    storeMemberInfo,
    fetchStoreMembers,
    fnHideIdentity,
    fetchStoreMemberInfo,
    fnUpdateStoreMemberInfo,
    fnDeleteStoreMember,
    fnAddInviteMember,
    fnMemberJoin
  }
}
