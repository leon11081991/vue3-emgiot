import type {
  LoginReqType
  // GoogleLoginReqType,
  // SignUpReqType
  // ForgetPasswordReqType,
  // PasswordChangeReqType,
  // AccountDisableReqType
} from '@/models/types/auth.types'
import { useI18n } from 'vue-i18n'
// import { useMessage } from '@/composables/useMessage'
import { useNotification } from '@/composables/useNotification'
import { api } from '@/services'
import { useUserStore } from '@/stores/user.stores'
import { UtilCommon } from '@/utils/utilCommon'
import { errorMessagesMapping } from '@/constants/mappings/errorMessages.mapping'

export const useAuth = () => {
  const { t: $t } = useI18n()
  // const { openMessage } = useMessage()
  const { openNotification } = useNotification()
  const userStore = useUserStore()

  // 初始化用戶資訊
  const initUserInfo = () => {
    return {
      token: '',
      userId: '',
      photoUrl: ''
    }
  }

  /** 登入 */
  const fnLogin = async (params: LoginReqType) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.auth.login(params)

      if (!isSuccess) {
        // 顯示錯誤訊息提示
        openNotification(
          {
            title: $t('Common.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping[message])}`
          },
          'error'
        )
        return
      }

      // TODO: 登入成功後的處理
      userStore.userInfo = result
      UtilCommon.setLocalStorage<string>('token', result.token)
      UtilCommon.goPage('/')
    } catch (e) {
      // TODO: 錯誤處理
      throw new Error('Error')
    }
  }

  // const fnSignIn = async (params: SignUpReqType) => {
  //   try {
  //     await api.auth.signIn(params)
  //   } catch (error) { }
  // }

  /** 登出 */
  const fnLogOut = async () => {
    try {
      const { isSuccess, message, resultCode } = await api.auth.logout()

      if (!isSuccess) {
        // 顯示錯誤訊息提示
        openNotification(
          {
            title: $t('Common.Error'),
            subTitle: `${resultCode} - ${$t(errorMessagesMapping[message])}`
          },
          'error'
        )
        return
      }

      // TODO: 登出成功後的處理
      userStore.userInfo = initUserInfo()
      UtilCommon.removeLocalStorage('token')
      UtilCommon.goPage('/login')
    } catch (e) {
      // TODO: 錯誤處理
      throw new Error('Error')
    }
  }

  return {
    initUserInfo,
    fnLogin,
    fnLogOut
  }
}
