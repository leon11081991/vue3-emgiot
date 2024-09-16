import { computed } from 'vue'

/** 頭像顯示前第幾位字母 */
export const useAvatarLetters = (userName: string, letterIndex: number = 1) => {

  const avatarLetters = computed<string>(() => {
    const letters = userName.trim().toUpperCase()
    if (letters.length <= letterIndex) return letters[0]
    return letters.slice(0, letterIndex)
  })

  return {
    avatarLetters
  }
}