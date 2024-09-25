import type { UserInfoDataType } from '@/models/types/auth.types'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfoDataType>({
    realName: '',
    nickName: '',
    photoUrl: ''
  })

  const initLoginState = (): void => {
    token.value = ''
    userInfo.value = {
      realName: '',
      nickName: '',
      photoUrl: ''
    }
  }

  return {
    token,
    userInfo,
    initLoginState
  }
})
