import type {
  StoreMemberResType,
  HideIdentityReqType,
  StoreMemberInfoReqType,
  StoreMemberInfoDataType,
  DeleteStoreMemberReqType
} from '@/models/types/storeMember.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useRouter } from 'vue-router'
import { useMessage } from '@/composables/useMessage'
import { useNotification } from '@/composables/useNotification'
import { StoreMemberDto } from '@/utils/api/dto/storeMember.dto'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { UtilCommon } from '@/utils/utilCommon'

const router = useRouter()
const { openMessage } = useMessage()
const { openNotification } = useNotification()

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
  const fetchStoreMembers = async () => {
    try {
      const { result, isSuccess, resultCode } = await api.storeMember.getStoreMembers()

      console.log('[fetchStoreMembers]', result, isSuccess, resultCode)
      if (!isSuccess) {
        //  TODO: 錯誤處理
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
  const fnHideIdentity = async (params: HideIdentityReqType) => {
    try {
      const { isSuccess, resultCode, message } = await api.storeMember.hideIdentity(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理取得成員資訊 */
  const fetchStoreMemberInfo = async (params: StoreMemberInfoReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.storeMember.getStoreMemberInfo(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
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

      if (!isSuccess) {
        return openMessage('error', `${resultCode} - ${message}`)
      }

      return openMessage('success', `變更成員資訊成功`)
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理刪除成員 */
  const fnDeleteStoreMember = async (params: DeleteStoreMemberReqType) => {}

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
  const fnMemberJoin = async (params: string) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.storeMember.memberJoin(params)
      console.log('fnMemberJoin', result, isSuccess, message, resultCode)
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  return {
    storeMembers,
    storeMemberInfo,
    fetchStoreMembers,
    fnHideIdentity,
    fetchStoreMemberInfo,
    fnUpdateStoreMemberInfo,
    fnAddInviteMember,
    fnMemberJoin
  }
}
