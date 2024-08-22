// ant 登入元件設定
export const createLoginFormConfig = ($t: any) => ({
  userAccount: {
    name: 'userAccount',
    placeholder: $t('LoginView.Login.UserAccount'),
    rules: [{ required: true }]
  },
  password: {
    name: 'password',
    placeholder: $t('LoginView.Login.Password'),
    rules: [{ required: true }]
  }
})

// ant 元件驗證設定
export const formValidateMsgsConfig = {
  required: '請填寫 ${label}'
}