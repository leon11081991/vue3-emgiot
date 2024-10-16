import type { UserInfoDataType } from '@/models/types/auth.types'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfoDataType>({
    realName: '',
    nickName: '',
    userId: '',
    photoUrl: ''
  })

  const initLoginState = (): void => {
    token.value = ''
    userInfo.value = {
      realName: '',
      nickName: '',
      userId: '',
      photoUrl: ''
    }
  }

  return {
    token,
    userInfo,
    initLoginState
  }
})
