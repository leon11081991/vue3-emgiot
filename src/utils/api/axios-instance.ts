import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { env } from '@/env'
import { useUserStore } from '@/stores/user'

/** 創建實例 */
const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000
})

/** 處理請求發送前 */
const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const userStore = useUserStore()

  // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}` // 假設 token 存在於 local storage
  config.headers.Authorization = `Bearer ${userStore.token}` // 假設 token 存在於 user store

  return config
}
/** 處理請求錯誤 */
const requestFailed = (error: AxiosError) => {
  console.log(error)
  return Promise.reject(error)
}

/** 處理回傳成功: 狀態碼為 2xx 都在此處理 */
const responseSuccess = (response: AxiosResponse) => {
  console.log('[responseSuccess]');
  return response.data
}

/** 處理回傳失敗: 狀態碼為非 2xx 都在此處理 */
const responseFailed = (error: AxiosError) => {
  const { response } = error
  console.log("error", error)

  // TODO: 處理 401
  if (response) {
    // 處理 401
    if (response.status === 401) {
      // 重新登入
      console.log("401!!!!")
    }
  }

  // TODO:處理沒有網路連線
  if (!window.navigator.onLine) {
    // 顯示沒有網路連線

    return Promise.reject(new Error('Please check your network connection'))
  }

  console.log(error)
  return Promise.reject(error)
}

/** 請求攔截器 */
axiosInstance.interceptors.request.use(beforeRequest, requestFailed)
/** 回傳攔截器 */
axiosInstance.interceptors.response.use(responseSuccess, responseFailed)


export default axiosInstance