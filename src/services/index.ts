import { TestService } from '@/services/test.services'
import { AuthServices } from '@/services/auth.services'
import { DashboardServices } from '@/services/dashboard.services'
import { UserServices } from '@/services/user.services'

const api = {
  test: new TestService(), // 測試範例
  auth: new AuthServices(), // 系統登入
  dashboard: new DashboardServices(), // 控制台
  user: new UserServices() // 使用者
}

export { api }
