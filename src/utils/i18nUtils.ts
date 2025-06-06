import i18n from '@/plugins/i18n'

/** 取得i18n翻譯 */
export const getI18nTranslate = (key: string, params: Record<string, any> = {}) => {
  return i18n.global.t(key, params)
}
