import type { JwtDecodeData } from '@/models/interfaces/token.interface'
import { api } from '@/services'
import { useToken } from '@/composables/useToken'
import { useUserStore } from '@/stores/user.stores'
import { catchErrorHandler } from '@/utils/api/error-handler'

export const useFetchUser = () => {
  const userStore = useUserStore()
  const { getDataFromToken } = useToken()

  /** 取得使用者資訊 */
  const fnGetUserInfo = async (token: string) => {
    try {
      const { result, isSuccess } = await api.user.getUserInfo()

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      console.log('fnGetUserInfo', result)

      userStore.userInfo.realName = result.realName
      userStore.userInfo.nickName = result.nickName
      userStore.userInfo.photoUrl =
        (getDataFromToken<JwtDecodeData>(token, 'photo') as string) || ''
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理變更密碼 */
  const fnChangePassword = async (newPwd: string) => {
    try {
      const { result, isSuccess } = await api.user.changePassword(newPwd)

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }
      console.log('fnChangePassword', result)
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理變更使用者資訊 */
  const fnUpdateUserInfo = async (newUserName: string) => {
    try {
      console.log('object', newUserName)
      const { result, isSuccess } = await api.user.updateUserInfo(newUserName)

      console.log('fnUpdateUserInfo', result, isSuccess)
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  return {
    fnGetUserInfo,
    fnChangePassword,
    fnUpdateUserInfo
  }
}
