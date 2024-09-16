// .eslintrc.js 定義 ESLint 的規則設定
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true, // 運行在瀏覽器環境
    es2021: true // 使用ES2021 語法
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'prettier' // 使用 Prettier 格式化
  ],
  parserOptions: {
    ecmaVersion: 'latest', // 最新版本的 ECMAScript 語法
    sourceType: 'module' // 使用 ECMAScript Modules
  },
  plugins: ['prettier'], // 使用 Prettier plugin 檢查程式碼格式
  rules: {
    'prettier/prettier': 'error', // 啟用 Prettier plugin, 強制執行 Prettier 格式化程式碼，違反時錯誤
    // 'no-console': process.env.NUXT_ENV === 'prod' ? 'warn' : 'off', // 檢查 console.log，如果是production環境則違反時警告，否則違反時禁止
    // 'no-undef': 'error', // 檢查未定義的變數，違反時錯誤
    // 'no-unused-vars': 'warn' // 檢查沒有使用到的變數，違反時警告
  },
  overrides: [
    // 其他特定配置
    {
      files: ['src/views/**/*.{js,ts,vue}', 'src/layouts/**/*.{js,ts,vue}', 'app.{js,ts,vue}' ],
      rules: {
        'vue/multi-word-component-names': 'warn' // 組件名稱必須是多個單詞，違反時警告
      }
    }
  ]
}
