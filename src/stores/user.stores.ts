import type { UserInfoDataType } from '@/models/types/auth.types'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfoDataType>({
    name: '',
    userId: '',
    roleOrder: 0,
    photoUrl: ''
  })

  const initLoginState = (): void => {
    token.value = ''
    userInfo.value = {
      name: '',
      userId: '',
      roleOrder: 0,
      photoUrl: ''
    }
  }

  return {
    token,
    userInfo,
    initLoginState
  }
})
