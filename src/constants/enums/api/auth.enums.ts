export enum LoginEnum {
  login = 'LogIn/LogIn', // 系統登入
  googleLogIn = 'LogIn/GoogleLogIn', // Google登入
  logOut = 'LogIn/LogOut' // 系統登出
}

export enum SignInEnum {
  signIn = 'SignUp/SignUp', // 註冊新帳號
  validate = 'SignUp/Validate', // 帳號驗證
  forgetPassword = 'SignUp/ForgetPassword', // 忘記密碼
  passwordChange = 'SignUp/Password', // 變更密碼
  accountDisable = 'SignUp/AccountDisable' // 帳號停用
}
