/** 抓取瀏覽器語系 */
export const useLocale = () => {
  const languageMap = {
    'zh-TW': 'tw', // 繁體中文
    en: 'en' // 英文
  } as const

  // 取得瀏覽器語系
  const languages =
    navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]

  // 找到對應語系，若找不到則回傳 'tw' 作為預設
  for (const lang of languages) {
    const key = (Object.keys(languageMap) as (keyof typeof languageMap)[]).find((prefix) =>
      lang.startsWith(prefix)
    )
    if (key) return languageMap[key]
  }

  return 'tw'
}
