import { TestService } from "@/services/test.services"
import { AuthServices } from "@/services/auth.services"
import { DashboardServices } from '@/services/dashboard.services'

const api = {
  test: new TestService(), // 測試範例
  auth: new AuthServices(), // 系統登入
  dashboard: new DashboardServices() // 控制台
}

export { api }