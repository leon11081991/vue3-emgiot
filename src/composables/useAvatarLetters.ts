import { computed } from 'vue'

/** 頭像顯示前第幾位字母 */
export const useAvatarLetters = (userName: string = '', letterIndex: number = 1) => {
  const avatarLetters = computed<string>(() => {
    const trimmedName = (userName ?? '').trim().toUpperCase()
    const validLetterIndex = Math.max(1, letterIndex)

    return trimmedName.slice(0, validLetterIndex) || trimmedName[0] || ''
  })

  return {
    avatarLetters
  }
}
