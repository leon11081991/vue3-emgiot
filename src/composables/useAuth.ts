import type {
  LoginReqType
  // GoogleLoginReqType,
  // SignUpReqType
  // ForgetPasswordReqType,
  // PasswordChangeReqType,
  // AccountDisableReqType
} from '@/models/types/auth.types'
import { useI18n } from 'vue-i18n'
import { useMessage } from '@/composables/useMessage'
import { useNotification } from '@/composables/useNotification'
import { api } from '@/services'
import { useUserStore } from '@/stores/user.stores'
import { UtilCommon } from '@/utils/utilCommon'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { errorMessagesMapping } from '@/constants/mappings/errorMessages.mapping'

export const useAuth = () => {
  const { t: $t } = useI18n()
  const { openMessage } = useMessage()
  const { openNotification } = useNotification()
  const userStore = useUserStore()

  /** 存儲登入資訊 */
  const _saveLoginInfo = (loginData: LoginReqType): void => {
    UtilCommon.setLocalStorage('rememberMe', loginData)
  }

  /** 讀取記住我資訊 */
  const loadLoginInfo = () => {
    const rememberMe = UtilCommon.getLocalStorage<LoginReqType>('rememberMe')
    if (!rememberMe) return
    return {
      userId: rememberMe.userId,
      password: rememberMe.password,
      rememberMe: true
    }
  }

  /** 處理記住我 */
  const handleRememberMe = (params: LoginReqType, isRememberMe: boolean): void => {
    if (!isRememberMe) {
      return UtilCommon.removeLocalStorage('rememberMe')
    }
    _saveLoginInfo(params)
  }

  /** 處理登入 */
  const fnLogin = async (params: LoginReqType, isRememberMe: boolean) => {
    try {
      handleRememberMe(params, isRememberMe)

      const { result, isSuccess, resultCode } = await api.auth.login(params)

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        openNotification(
          {
            title: $t('Common.Response.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping[resultCode])}`
          },
          'error'
        )
        return
      }

      userStore.token = result.token
      openMessage('success', $t('Common.Result.LoginSuccess'), {}, () => {
        UtilCommon.goPage('/')
      })
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  // const fnSignIn = async (params: SignUpReqType) => {
  //   try {
  //     await api.auth.signIn(params)
  //   } catch (error) { }
  // }

  /** 處理登出 */
  const fnLogOut = async () => {
    try {
      const { isSuccess, message, resultCode } = await api.auth.logout()

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        openNotification(
          {
            title: $t('Common.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping[message])}`
          },
          'error'
        )
        return
      }

      userStore.initLoginState()

      openMessage('success', $t('Common.Result.LogoutSuccess'), {}, () => {
        UtilCommon.goPage('/login')
      })
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  return {
    loadLoginInfo,
    fnLogin,
    fnLogOut
  }
}
