import type { LoginReqType, GoogleLoginReqType, SignUpReqType, ForgetPasswordReqType, PasswordChangeReqType, AccountDisableReqType } from '@/models/types/auth.types'
import { useMessage } from '@/composables/useMessage'
import { api } from '@/services'

export const useAuth = () => {
  const { openMessage } = useMessage()

  const fnLogin = async (params: LoginReqType) => {
    try {
      const res = await api.auth.login(params)

      if (!res.isSuccess) {
        console.log('res', res);

        if (res.resultCode === 400) {
          return openMessage('error', '查無此帳號')
        }
      }

      // TODO: 登入成功後的處理

    } catch (e) {
      openMessage('error', '登入失敗')
    }
  }

  const fnSignIn = async (params: SignUpReqType) => {
    try {
      await api.auth.signIn(params)
    } catch (error) {

    }
  }

  return {
    fnLogin
  }
}