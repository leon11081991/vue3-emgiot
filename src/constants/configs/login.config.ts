// (ant design) tab bar 樣式設定
export const loginPageTabBarStyleConfig = {
  display: 'none'
}

export const createSignUpFormConfig = ($t: any) => ({
  userId: {
    name: 'userId',
    placeholder: $t('SignUpPage.SignUp.UserId'),
    rules: [{ required: true }]
  },
  password: {
    name: 'password',
    placeholder: $t('SignUpPage.SignUp.Password'),
    rules: [{ required: true }]
  },
  verifyPassword: {
    name: 'verifyPassword',
    placeholder: $t('SignUpPage.SignUp.VerifyPassword'),
    rules: [{ required: true }]
  },
  userInfo: {
    name: 'userInfo',
    placeholder: $t('SignUpPage.SignUp.UserInfo'),
    rules: [{ required: true }]
  }
})
