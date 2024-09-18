import type {
  LoginReqType,
  // GoogleLoginReqType,
  SignUpReqType
  // ForgetPasswordReqType,
  // PasswordChangeReqType,
  // AccountDisableReqType
} from '@/models/types/auth.types'
import { useMessage } from '@/composables/useMessage'
import { api } from '@/services'
import { useUserStore } from '@/stores/user.stores'
import { UtilCommon } from '@/utils/utilCommon'

export const useAuth = () => {
  const { openMessage } = useMessage()
  const userStore = useUserStore()

  const fnLogin = async (params: LoginReqType) => {
    try {
      const { result, isSuccess } = await api.auth.login(params)

      if (!isSuccess) {
        // TODO: 錯誤處理
        return
      }

      // TODO: 登入成功後的處理
      userStore.userInfo = result
      // UtilCommon.setLocalStorage('token', result.token)
      UtilCommon.goPage('/')
    } catch (e) {
      openMessage('error', '登入失敗')
    }
  }

  // const fnSignIn = async (params: SignUpReqType) => {
  //   try {
  //     await api.auth.signIn(params)
  //   } catch (error) { }
  // }

  return {
    fnLogin
  }
}
