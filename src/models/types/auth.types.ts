export type LoginReqType = {
  userId: string // 帳號(email)
  password: string // 密碼
}

export type LoginDataType = {
  userId: string // 帳號(email)
  password: string // 密碼
  rememberMe: boolean // 記得我
}

export type GoogleLoginReqType = {
  userAccount: string
  accessToken: string
}

export type SignUpReqType = LoginReqType & {
  realName: string // 真實姓名
}

export type SignUpDataType = SignUpReqType & {
  confirmPassword: string
}

export type ForgotPasswordReqType = Omit<LoginReqType, 'password'>

export type AccountDisableReqType = {
  userId: string
}

export type UserInfoDataType = {
  name: string // 名稱
  userId: string // 帳號
  roleOrder: number // 等級
  photoUrl: string // 大頭貼
}
