import { TestService } from "@/services/test.services"
import { AuthServices } from "@/services/auth.services"

const api = {
  test: new TestService(), // 測試範例
  auth: new AuthServices()
}

export { api }