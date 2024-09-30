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

  /** 處理註冊 */
  const fnSignIn = async (params: SignUpReqType): Promise<void> => {
    try {
      const { userId, password, realName } = params
      const { isSuccess } = await api.auth.signIn({ userId, password, realName })

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        // TODO: 錯誤處理，目前沒有提供對應的狀態碼錯誤
        return
      }

      openNotification(
        {
          subTitle:
            '系統寄出[驗證信]至您的電子郵件地址。請依郵件內容，點擊下面的連結完成完成Email驗證。'
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
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 處理註冊驗證 */
  const fnSignUpValidate = async (validateCode: string): Promise<void> => {
    try {
      const { isSuccess } = await api.auth.validate(validateCode)

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示

        return
      }

      openNotification(
        {
          title: $t('Common.Success'),
          subTitle: $t('Common.Result.SignUpSuccess')
        },
        'success',
        'top',
        () => {
          UtilCommon.goPage('/')
        }
      )
    } catch (e) {
      catchErrorHandler(e)
    }
  }

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

  /** 處理忘記密碼 */
  const fnForgotPassword = async (params: ForgotPasswordReqType): Promise<void> => {
    try {
      const { isSuccess } = await api.auth.forgotPassword(params)

      if (!isSuccess) {
        // 失敗：顯示錯誤訊息提示
        // TODO: 錯誤處理，目前沒有提供對應的狀態碼錯誤
        return
      }
    } catch (error) {
      catchErrorHandler(error)
    }
  }

  return {
    loadLoginInfo,
    fnLogin,
    fnSignIn,
    fnSignUpValidate,
    fnLogOut,
    fnForgotPassword
  }
}
