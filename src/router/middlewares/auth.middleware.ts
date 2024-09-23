import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/stores/user.stores'
import { useRouter } from 'vue-router'

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
  const token = userStore.userInfo.token

  // if (to.path === '/login' || !!token) {
  return next()
  // }

  // router.push('/login')
}
