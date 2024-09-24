import type { UserInfoType } from '@/models/types/auth.types'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfoType>({
    userId: '',
    photoUrl: ''
  })

  return {
    token,
    userInfo
  }
})
