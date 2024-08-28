import { computed } from 'vue'

/** 處理頭像
 * 取使用者者名稱的第一個字母作為頭像
 */
export const useAvatar = (userName: string) => {

  const avatar = computed(() => {
    return userName.charAt(0).toUpperCase().slice(0, 1)
  })

  return avatar

}