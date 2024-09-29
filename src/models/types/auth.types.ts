export type LoginReqType = {
  userId: string // 帳號(email)
  password: string // 密碼
}

export type LoginDataType = {
  userId: string
  password: string
  rememberMe: boolean
}

export type GoogleLoginReqType = {
  userAccount: string
  accessToken: string
}

export type SignUpReqType = LoginReqType & {
  realName: string // 真實姓名
}

export type ForgetPasswordReqType = Omit<SignUpReqType, 'password'>
export type PasswordChangeReqType = SignUpReqType
export type AccountDisableReqType = {
  userId: string
}

export type UserInfoDataType = {
  realName: string
  nickName: string
  photoUrl: string
}
