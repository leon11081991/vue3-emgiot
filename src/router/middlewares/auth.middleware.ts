import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.stores'
import { useMessage } from '@/composables/useMessage'
import { useToken } from '@/composables/useToken'
import { useFetchUser } from '@/composables/useFetchUser'
import { UtilCommon } from '@/utils/utilCommon'
import { getI18nTranslate } from '@/utils/i18nUtils'

export const authMiddleware = async ({
  to,
  from,
  next
}: {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}) => {
  console.log('[authMiddleware]', to, from)

  const router = useRouter()
  const userStore = useUserStore()
  const token = userStore.token
  const { openMessage } = useMessage()
  const { isTokenExpired } = useToken()
  const { fnGetUserInfo } = useFetchUser()

  const tokenValid = token && !isTokenExpired(token)

  // 處理無效token的非登入頁
  if (to.name !== 'Login' && !tokenValid) {
    openMessage('error', getI18nTranslate('Common.Result.NotLogin'), { duration: 2 }, () => {
      router.push({ name: 'Login' })
    })
    return
  }

  // 處理有效token的非登入頁
  if (to.name !== 'Login' && tokenValid) {
    const { realName } = userStore.userInfo
    if (!realName) {
      await fnGetUserInfo(token)
    }

    return next()
  }

  // 處理有效token的登入頁
  if (to.name === 'Login' && tokenValid) {
    router.push({ name: 'Home' })
    return
  }

  // 處理token過期
  if (token && isTokenExpired(token)) {
    userStore.initLoginState()
    UtilCommon.removeLocalStorage('storage-user')
    openMessage('warning', getI18nTranslate('Common.Result.TokenExpired'), {}, () => {
      router.push({ name: 'Login' })
    })
    return
  }

  next()
}
