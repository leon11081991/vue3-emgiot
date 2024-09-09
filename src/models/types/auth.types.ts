export type LoginReqType = {
  userId: string
  password: string
}
export type GoogleLoginReqType = {
  userAccount: string
  accessToken: string
}

export type SignUpReqType = LoginReqType
export type ForgetPasswordReqType = Omit<SignUpReqType, 'password'>
export type PasswordChangeReqType = SignUpReqType
export type AccountDisableReqType = {
  userId: string
}

export type UserInfoType = {
  token: string
  userId: string
  photoUrl: string
}