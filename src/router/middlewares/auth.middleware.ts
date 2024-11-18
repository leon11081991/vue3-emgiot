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
  // console.log('[authMiddleware]', to, from)

  const router = useRouter()
  const userStore = useUserStore()
  const token = userStore.token
  const { openMessage } = useMessage()
  const { checkTokenValidity } = useToken()
  const { fnGetUserInfo } = useFetchUser()
  const tokenValid = checkTokenValidity(token) // 檢查token是否有效

  // 處理無效token的非登入頁
  if (to.name !== 'Login' && !tokenValid) {
    userStore.initLoginState()
    UtilCommon.removeLocalStorage('storage-user')
    UtilCommon.removeLocalStorage('store-info')
    return openMessage('error', getI18nTranslate('Common.Result.NotLogin'), { duration: 2 }, () => {
      UtilCommon.goPage('/login')
    })
  }

  // 處理有效token的非登入頁
  if (to.name !== 'Login' && tokenValid) {
    const { name } = userStore.userInfo
    if (!name) {
      await fnGetUserInfo(token)
    }
    return next()
  }

  // 處理有效token的登入頁
  if (to.name === 'Login' && tokenValid) {
    router.push({ name: 'Home' })
    return
  }

  // 處理有token但無效token
  if (token && !checkTokenValidity(token)) {
    userStore.initLoginState()
    UtilCommon.removeLocalStorage('storage-user')
    UtilCommon.removeLocalStorage('store-info')
    openMessage('warning', getI18nTranslate('Common.Result.TokenExpired'), {}, () => {
      UtilCommon.goPage('/login')
    })
    return
  }

  next()
}
