export type SignInReqType = {
  userAccount: string
  password: string
}
export type ForgetPasswordReqType = Omit<SignInReqType, 'password'>
export type PasswordChangeReqType = SignInReqType
export type AccountDisableReqType = {
  userId: string
}