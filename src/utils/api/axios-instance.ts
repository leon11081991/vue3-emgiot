import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { env } from '@/env'
import { getI18nTranslate } from '@/utils/i18nUtils'
import { errorCodeHandler, unauthorizedHandler } from '@/utils/api/error-handler'
import { useMessage } from '@/composables/useMessage'
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
  return Promise.reject(error)
}

/** 處理回傳成功: 狀態碼為 2xx 都在此處理 */
const responseSuccess = (response: AxiosResponse) => {
  if (!response.data.isSuccess) {
    return response.data
  }

  return response.data
}

/** 處理回傳失敗: 狀態碼為非 2xx 都在此處理 */
const responseFailed = (error: AxiosError) => {
  const { openMessage } = useMessage()

  if (!window.navigator.onLine) {
    // 處理沒有網路連線
    openMessage('error', getI18nTranslate('Common.Response.NoNetwork'))
    return Promise.reject(new Error(getI18nTranslate('Common.Response.NoNetwork')))
  }

  const { response } = error
  if (response) {
    const { status } = response

    unauthorizedHandler(status)
    errorCodeHandler(status)
  }

  return Promise.reject(error)
}

/** 請求攔截器 */
axiosInstance.interceptors.request.use(beforeRequest, requestFailed)
/** 回傳攔截器 */
axiosInstance.interceptors.response.use(responseSuccess, responseFailed)

export default axiosInstance
