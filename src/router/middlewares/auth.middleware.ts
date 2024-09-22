import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useRouter } from 'vue-router'
import { UtilCommon } from '@/utils/utilCommon'

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
  const token = UtilCommon.getLocalStorage<string>('token')

  if (to.path === '/login' || to.path === '/sign-up') {
    // 檢查是否訪問登入頁或是註冊頁
    if (token) {
      // 如果有 token(已登入) 則重新導向首頁
      router.push({ name: 'Home' })
      return
    }
  } else {
    if (!token) {
      // 如果沒有 token(未登入) 則重新導向登入頁
      router.push({ name: 'Login' })
      return
    }
  }

  return next()
}
