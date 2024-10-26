import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/stores/user.stores'
import { useToken } from '@/composables/useToken'
import { UtilCommon } from '@/utils/utilCommon'

export const memberJoinMiddleware = ({
  to,
  from,
  next
}: {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}) => {
  console.log('[memberJoinMiddleware]', to, from)

  const userStore = useUserStore()
  const token = userStore.token
  const { checkTokenValidity } = useToken()
  const tokenValid = checkTokenValidity(token) // 檢查token是否有效

  const inviteKeyring = UtilCommon.getQueryParam('inviteKeyring')
  console.log('inviteKeyring', inviteKeyring)

  /** 處理邏輯
   * 1. 檢查是否有無token
   * 2. 檢查token是否有效
   * 3. 無token或token無效時,導至登入頁
   * 4. 儲存下一步為成員加入頁的狀態，導至成員加入頁後移除狀態
   */

  if (!token || !tokenValid) {
    console.log('token無效，導至登入頁')
    userStore.initLoginState()
    UtilCommon.removeLocalStorage('storage-user')
    UtilCommon.removeLocalStorage('store-info')

    UtilCommon.setLocalStorage('member-join', inviteKeyring)
    return next({ name: 'Login' })
  }

  next()
}
