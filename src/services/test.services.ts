import { type ApiResponse, ApiFactory } from '@/utils/api'
import { env } from '@/env'

export class TestService extends ApiFactory {
  constructor() {
    super(`https://newapi.funday.asia/api/v1`)
  }

  testLogin = async (params: Record<string, any>) => {
    const res = await this.post<unknown, ApiResponse>('Auth/Login', params)
    console.log('res', res)
  }
}
