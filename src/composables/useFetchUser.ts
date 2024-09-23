import { api } from '@/services'

export const useFetchUser = () => {
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
      // TODO: 錯誤處理
    }
  }

  /** 處理變更使用者資訊 */
  const fnUpdateUserInfo = async (newUserName: string) => {
    try {
      const res = await api.user.updateUserInfo(newUserName)

      console.log('fnUpdateUserInfo', res)
    } catch (e) {
      // TODO: 錯誤處理
    }
  }

  return {
    fnChangePassword,
    fnUpdateUserInfo
  }
}
