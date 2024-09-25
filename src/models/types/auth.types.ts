export type jwtDecodeType = {
  exp: number // 過期時間
  iat: number // 簽發時間
  iss: string // 發行者
  jti: string
  nbf: number
  sub: string // 主題：用戶的唯一標識符
  name: string
  photo: string
}

export type LoginReqType = {
  userId: string
  password: string
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

export type SignUpReqType = LoginReqType
export type ForgetPasswordReqType = Omit<SignUpReqType, 'password'>
export type PasswordChangeReqType = SignUpReqType
export type AccountDisableReqType = {
  userId: string
}

export type UserInfoType = {
  userId: string
  photoUrl: string
}
