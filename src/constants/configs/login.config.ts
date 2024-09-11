// ant 登入元件設定

export const loginPageTabBarStyleConfig = {
  "display": "none"
}

export const createLoginFormConfig = ($t: any) => ({
  userId: {
    name: 'userId',
    placeholder: $t('LoginPage.Login.UserId'),
    rules: [{ required: true }]
  },
  password: {
    name: 'password',
    placeholder: $t('LoginPage.Login.Password'),
    rules: [{ required: true }]
  }
})

export const createForgotPasswordModalConfig = ($t: any) => ({
  title: $t('LoginPage.ForgotPassword.Title'),
  userId: {
    name: 'userAccount',
    placeholder: $t('LoginPage.ForgotPassword.UserId'),
    rules: [{ required: true }]
  }
})

export const createRegisterFormConfig = ($t: any) => ({

})

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

// ant 元件驗證設定
export const formValidateMsgsConfig = {
  required: '請填寫 ${label}'
}