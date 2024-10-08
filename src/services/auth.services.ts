import { type ApiResponse, ApiFactory } from '@/utils/api'
import type {
  LoginReqType,
  GoogleLoginReqType,
  SignUpReqType,
  ForgotPasswordReqType,
  AccountDisableReqType
} from '@/models/types/auth.types'
import { LoginEnum, SignUpEnum } from '@/constants/enums/api/auth.enums'

/** 系統登入、註冊 */
export class AuthServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 系統登入 */
  login = async (loginData: LoginReqType) => {
    return await this.post<LoginReqType, ApiResponse>(LoginEnum.login, loginData)
  }

  /** Google登入 */
  googleLogIn = async (googleLoginData: GoogleLoginReqType) => {
    return await this.post<GoogleLoginReqType, ApiResponse>(LoginEnum.googleLogIn, googleLoginData)
  }

  /** 系統登出 */
  logout = async () => {
    return await this.post<unknown, ApiResponse>(LoginEnum.logOut)
  }

  /** 註冊新帳號 */
  signIn = async (signInData: SignUpReqType): Promise<ApiResponse> => {
    return await this.post<SignUpReqType, ApiResponse>(SignUpEnum.signIn, signInData)
  }

  /** 帳號驗證 */
  validate = async (validateCode: string): Promise<ApiResponse> => {
    return await this.put<string, ApiResponse>(SignUpEnum.validate, validateCode)
  }

  /** 忘記密碼 */
  forgotPassword = async (userAccountData: ForgotPasswordReqType): Promise<ApiResponse> => {
    return await this.put<ForgotPasswordReqType, ApiResponse>(
      SignUpEnum.forgotPassword,
      userAccountData
    )
  }

  /** 變更密碼 */
  changePassword = async (newPwd: string) => {
    return await this.put<string, ApiResponse>(SignUpEnum.passwordChange, newPwd)
  }

  /** 帳號停用 */
  accountDisable = async (accountDisableData: AccountDisableReqType): Promise<ApiResponse> => {
    return await this.put<AccountDisableReqType, ApiResponse>(
      SignUpEnum.accountDisable,
      accountDisableData
    )
  }
}
