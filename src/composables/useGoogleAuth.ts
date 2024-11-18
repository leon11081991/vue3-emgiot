import { api } from '@/services'
import { useUserStore } from '@/stores/user.stores'
import { useI18n } from 'vue-i18n'
import { useNotification } from '@/composables/useNotification'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { UtilCommon } from '@/utils/utilCommon'
import { errorMessagesMapping } from '@/constants/mappings/errorMessages.mapping'

export const useGoogleAuth = () => {
  const { t: $t } = useI18n()
  const { openNotification } = useNotification()
  const userStore = useUserStore()

  // 初始化第三方存儲
  const initializeThirdPartyStorage = () => {
    UtilCommon.removeLocalStorage('from-third-party-id')
    UtilCommon.removeLocalStorage('from-third-party-type')
  }

  // 呼叫後端 API 進行登入
  const loginWithGoogle = async (credential: string): Promise<boolean> => {
    try {
      const { result, isSuccess, resultCode } = await api.auth.googleLogIn({ credential })

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        openNotification(
          {
            title: $t('Common.Response.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping['fnLogin'][resultCode])}`
          },
          'error'
        )
        return false
      }

      userStore.token = result.token
      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  return {
    initializeThirdPartyStorage,
    loginWithGoogle
  }
}
