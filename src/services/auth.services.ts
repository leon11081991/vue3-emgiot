import { type ApiResponse, ApiFactory } from '@/utils/api'
import type { SignInReqType, ForgetPasswordReqType, PasswordChangeReqType, AccountDisableReqType } from '@/models/types/auth.types'
import { SignInEnum } from '@/constants/enums/services.enums'

/** 系統登入、註冊 */
export class AuthServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 系統登入 */

  /** Google登入 */

  /** 系統登出 */

  /** 註冊新帳號 */
  signIn = async (signInData: SignInReqType): Promise<ApiResponse> => {
    return await this.post<SignInReqType, ApiResponse>(SignInEnum.signIn, signInData)
  }

  /** 忘記密碼 */
  forgetPassword = async (userAccountData: ForgetPasswordReqType): Promise<ApiResponse> => {
    return await this.put<ForgetPasswordReqType, ApiResponse>(SignInEnum.forgetPassword, userAccountData)
  }

  /** 變更密碼 */
  passwordChange = async (passwordChangeData: PasswordChangeReqType): Promise<ApiResponse> => {
    return await this.put<PasswordChangeReqType, ApiResponse>(SignInEnum.passwordChange, passwordChangeData)
  }

  /** 帳號停用 */
  accountDisable = async (accountDisableData: AccountDisableReqType): Promise<ApiResponse> => {
    return await this.put<AccountDisableReqType, ApiResponse>(SignInEnum.accountDisable, accountDisableData)
  }
}