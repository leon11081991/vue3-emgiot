export const errorMessagesMapping: Record<string, any> = {
  fnLogin: {
    '4001': 'ErrorMessage.WrongUserIdAndPassword',
    '4002': 'ErrorMessage.UserNotFound'
  },
  fnForgotPassword: {
    null: 'ErrorMessage.UserNotVerified' // TODO: 目前回傳的是 null，等後端定義
  },
  fnLogOut: {
    '400': 'ErrorMessage.UserNotFound' // TODO: 狀態碼需要確認
  },
  fnSignUp: {
    '4003': 'ErrorMessage.DuplicateUserId'
  },
  fnSignUpValidate: {
    null: 'ErrorMessage.ValidationCodeIncorrect' // TODO: 目前回傳的是 null，等後端定義
  }
}
