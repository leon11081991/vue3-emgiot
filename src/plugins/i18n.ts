import { createI18n } from 'vue-i18n'
import tw from '@/lang/tw.json'
import en from '@/lang/en.json'

const messages = {
  tw,
  en
}

const i18n = createI18n({
  legacy: false, // 設置為false, 啟用composition API模式
  locale: 'tw', // 設置默認語言
  fallbackLocale: 'tw', // 當前語言沒有對應的語言時，顯示的語言
  globalInjection: true,
  messages
})

export default i18n
