import type {
  LoginReqType,
  // GoogleLoginReqType,
  SignUpReqType,
  ForgotPasswordReqType
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
  const fnLogin = async (params: LoginReqType, isRememberMe: boolean): Promise<void> => {
    try {
      // 處理記住我
      handleRememberMe(params, isRememberMe)

      const { result, isSuccess, resultCode } = await api.auth.login(params)

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        return openNotification(
          {
            title: $t('Common.Response.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping['fnLogin'][resultCode])}`
          },
          'error'
        )
      }

      userStore.token = result.token
      return openMessage('success', $t('Common.Result.LoginSuccess'), {}, () => {
        UtilCommon.goPage('/')
      })
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理註冊 */
  const fnSignUp = async (params: SignUpReqType): Promise<boolean> => {
    try {
      const { userId, password, realName } = params
      const { isSuccess, resultCode } = await api.auth.signIn({ userId, password, realName })

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        // TODO: 錯誤處理，目前沒有提供對應的狀態碼錯誤
        openMessage('error', `${resultCode} - ${$t(errorMessagesMapping['fnSignUp'][resultCode])}`)
        return false
      }

      openNotification(
        {
          subTitle: $t('Common.Result.SignUpSuccess')
        },
        'success',
        'top',
        () => {
          UtilCommon.goPage('/login')
        },
        {
          hasIcon: false,
          hasClose: false
        }
      )

      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  /** 處理註冊驗證 */
  const fnSignUpValidate = async (validateCode: string): Promise<void> => {
    try {
      const { isSuccess, resultCode } = await api.auth.validate(validateCode)

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        // TODO: 之後依據resultCode去做對應的訊息
        return openNotification(
          {
            title: $t('Common.Response.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping['fnSignUpValidate'][resultCode])}`
          },
          'error',
          'top',
          () => {
            UtilCommon.goPage('/login')
          }
        )
      }

      return openNotification(
        {
          title: $t('Common.Response.Success'),
          subTitle: $t('Common.Result.ValidateSuccess')
        },
        'success',
        'top',
        () => {
          UtilCommon.goPage('/login')
        }
      )
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理登出 */
  const fnLogOut = async (): Promise<void> => {
    try {
      const { isSuccess, resultCode } = await api.auth.logout()

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        return openNotification(
          {
            title: $t('Common.Response.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping['fnLogOut'][resultCode])}`
          },
          'error'
        )
      }

      userStore.initLoginState()
      return openMessage('success', $t('Common.Result.LogoutSuccess'), {}, () => {
        UtilCommon.goPage('/login')
      })
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理忘記密碼 */
  const fnForgotPassword = async (params: ForgotPasswordReqType): Promise<boolean> => {
    try {
      const { isSuccess, resultCode } = await api.auth.forgotPassword(params)

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        // TODO: 錯誤處理，目前沒有提供對應的狀態碼錯誤
        openMessage(
          'error',
          `${resultCode} - ${$t(errorMessagesMapping['fnForgotPassword'][resultCode])}`
        )
        return false
      }

      openNotification(
        {
          title: $t('Common.Response.Success'),
          subTitle: `${$t('Common.Result.ForgotPasswordSuccess')}`
        },
        'success'
      )

      return true
    } catch (error) {
      catchErrorHandler(error)
      return false
    }
  }

  return {
    loadLoginInfo,
    fnLogin,
    fnSignUp,
    fnSignUpValidate,
    fnLogOut,
    fnForgotPassword
  }
}
