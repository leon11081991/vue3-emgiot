import { createI18n } from 'vue-i18n';
import tw from '@/lang/tw.json';
import en from '@/lang/en.json';

const i18n = createI18n({
  legacy: false,  // 設置為false, 啟用composition API模式
  locale: 'tw',
  fallbackLocale: 'tw',
  globalInjection: true,
  messages: {
    tw,
    en
  }
})

export default i18n