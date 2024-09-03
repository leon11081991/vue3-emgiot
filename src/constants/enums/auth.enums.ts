export enum SignInEnum {
  signIn = 'SignIn/SignIn', // 註冊新帳號
  validate = 'SignIn/Validate', // 帳號驗證
  forgetPassword = 'SignIn/ForgetPassword', // 忘記密碼
  passwordChange = 'SignIn/PasswordChange', // 變更密碼
  accountDisable = 'SignIn/AccountDisable', // 帳號停用
}

export enum LoginEnum {
  login = 'LogIn/LogIn', // 系統登入
  googleLogIn = 'LogIn/GoogleLogIn', // Google登入
  logOut = 'LogIn/LogOut' // 系統登出
}