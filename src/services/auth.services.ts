import { type ApiResponse, ApiFactory } from '@/utils/api'
import type {
  LoginReqType,
  GoogleLoginReqType,
  SignUpReqType,
  ForgetPasswordReqType,
  PasswordChangeReqType,
  AccountDisableReqType
} from '@/models/types/auth.types'
import { LoginEnum, SignInEnum } from '@/constants/enums/api/auth.enums'

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
  logOut = async () => {
    return await this.post<unknown, ApiResponse>(LoginEnum.logOut)
  }

  /** 註冊新帳號 */
  signIn = async (signInData: SignUpReqType): Promise<ApiResponse> => {
    return await this.post<SignUpReqType, ApiResponse>(SignInEnum.signIn, signInData)
  }

  /** 忘記密碼 */
  forgetPassword = async (userAccountData: ForgetPasswordReqType): Promise<ApiResponse> => {
    return await this.put<ForgetPasswordReqType, ApiResponse>(
      SignInEnum.forgetPassword,
      userAccountData
    )
  }

  /** 變更密碼 */
  passwordChange = async (passwordChangeData: PasswordChangeReqType): Promise<ApiResponse> => {
    return await this.put<PasswordChangeReqType, ApiResponse>(
      SignInEnum.passwordChange,
      passwordChangeData
    )
  }

  /** 帳號停用 */
  accountDisable = async (accountDisableData: AccountDisableReqType): Promise<ApiResponse> => {
    return await this.put<AccountDisableReqType, ApiResponse>(
      SignInEnum.accountDisable,
      accountDisableData
    )
  }
}
