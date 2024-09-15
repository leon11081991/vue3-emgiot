import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { env } from '@/env'
import { errorHandler } from '@/utils/api/error-handler'
import { useUserStore } from '@/stores/user.stores'


/** 創建實例 */
const axiosInstance = axios.create({
  baseURL: `${env.apiBaseUrl}${env.apiVersion}`,
  timeout: 10000 // 請求超時時間
})

/** 處理請求發送前 */
const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const userStore = useUserStore()
  const loginApiPath = '/LogIn/LogIn'

  // TODO: 先請後端將token移除,等待login完成後再開啟
  // if (!config.url?.includes(loginApiPath)) {
  //   // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}` // 假設 token 存在於 local storage
  //   config.headers.Authorization = `Bearer ${userStore.userInfo.token}` // 假設 token 存在於 user store
  // }

  config.headers['Content-Type'] = 'application/json;charset=UTF-8'

  return config
}
/** 處理請求錯誤 */
const requestFailed = (error: AxiosError) => {
  console.log('[requestFailed]', error)
  return Promise.reject(error)
}

/** 處理回傳成功: 狀態碼為 2xx 都在此處理 */
const responseSuccess = (response: AxiosResponse) => {
  console.log("[responseSuccess] response", response)
  return response.data
}

/** 處理回傳失敗: 狀態碼為非 2xx 都在此處理 */
const responseFailed = (error: AxiosError) => {
  console.log("[responseFailed] start", error)

  const userStore = useUserStore()
  return errorHandler(error, userStore.userInfo)
}

/** 請求攔截器 */
axiosInstance.interceptors.request.use(beforeRequest, requestFailed)
/** 回傳攔截器 */
axiosInstance.interceptors.response.use(responseSuccess, responseFailed)

export default axiosInstance