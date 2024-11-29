import type { JwtDecodeData } from '@/models/interfaces/token.interface'
import { api } from '@/services'
import { useToken } from '@/composables/useToken'
import { useMessage } from '@/composables/useMessage'
import { useUserStore } from '@/stores/user.stores'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { UtilCommon } from '@/utils/utilCommon'
import { getI18nTranslate } from '@/utils/i18nUtils'

/** 處理使用者 api 資料邏輯 */
export const useFetchUser = () => {
  const userStore = useUserStore()
  const { getDataFromToken } = useToken()
  const { openMessage } = useMessage()

  /** 取得使用者資訊 */
  const fnGetUserInfo = async (token: string): Promise<void> => {
    try {
      const { result, isSuccess } = await api.user.getUserInfo()

      if (!isSuccess) {
        userStore.initLoginState()
        return openMessage('error', getI18nTranslate('ErrorMessage.GetUserInfoFail'), {}, () => {
          UtilCommon.goPage('/login')
        })
      }

      userStore.userInfo.name = result.name
      userStore.userInfo.userId = (getDataFromToken<JwtDecodeData>(token, 'name') as string) || ''
      userStore.userInfo.roleOrder =
        (getDataFromToken<JwtDecodeData>(token, 'roleOrder') as number) || 0
      userStore.userInfo.photoUrl =
        (getDataFromToken<JwtDecodeData>(token, 'photo') as string) || ''
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理變更使用者資訊 */
  const fnUpdateUserInfo = async (newUserName: string) => {
    try {
      const { isSuccess } = await api.user.updateUserInfo(newUserName)

      if (!isSuccess) {
        // TODO: 錯誤處理
        openMessage('error', getI18nTranslate('ErrorMessage.UpdateUserInfoFail'))
        return
      }

      fnGetUserInfo(userStore.token)
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  return {
    fnGetUserInfo,
    fnUpdateUserInfo
  }
}
