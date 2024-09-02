import { type ApiResponse, ApiFactory } from '@/utils/api'
import { env } from '@/env'

export class TestService extends ApiFactory {
  constructor() {
    super(env.apiBaseUrl)
  }

  testGet = async (url: string, params: Record<string, any>) => {
    const res = await this.post<unknown, ApiResponse>(url, params)
    console.log("res", res);
  }
}