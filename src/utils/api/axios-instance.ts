import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { env } from '@/env'
import { useI18n } from 'vue-i18n'
import { useMessage } from '@/composables/useMessage'
import { useUserStore } from '@/stores/user.stores'
import { UtilCommon } from '@/utils/utilCommon'

const { t: $t } = useI18n()
const { openMessage } = useMessage()

/** 創建實例 */
const axiosInstance = axios.create({
  baseURL: `${env.apiBaseUrl}${env.apiVersion}/`,
  timeout: 10000 // 請求超時時間
})

/** 處理請求發送前 */
const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const userStore = useUserStore()

  // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}` // 假設 token 存在於 local storage
  config.headers.Authorization = `Bearer ${userStore.userInfo.token}` // 假設 token 存在於 user store
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'

  return config
}
/** 處理請求錯誤 */
const requestFailed = (error: AxiosError) => {
  console.log(error)
  return Promise.reject(error)
}

/** 處理回傳成功: 狀態碼為 2xx 都在此處理 */
const responseSuccess = (response: AxiosResponse) => {
  return response.data
}

/** 處理回傳失敗: 狀態碼為非 2xx 都在此處理 */
const responseFailed = (error: AxiosError) => {

  const { t: $t } = useI18n()
  const userStore = useUserStore()

  console.log("error", error)
  const { response } = error

  if (response) {
    // 處理 401 未授權
    if (response.status === 401 && userStore.userInfo.token) {
      openMessage('warning', $t('Common.Response.Unauthorized'), {}, () => UtilCommon.goPage('/login'))
      // TODO: 初始化 token 和 user資料 及重新登入

      return Promise.reject(new Error($t('Common.Response.Unauthorized')))
    }
  }

  if (!window.navigator.onLine) {
    // 處理沒有網路連線
    openMessage('error', $t('Common.Response.NoNetwork'))
    return Promise.reject(new Error($t('Common.Response.NoNetwork')))
  }

  console.log(error)
  return Promise.reject(error)
}

/** 請求攔截器 */
axiosInstance.interceptors.request.use(beforeRequest, requestFailed)
/** 回傳攔截器 */
axiosInstance.interceptors.response.use(responseSuccess, responseFailed)

export default axiosInstance