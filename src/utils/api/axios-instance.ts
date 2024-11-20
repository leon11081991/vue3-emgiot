import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import type { ApiResponseModel } from '@/utils/api/models'
import axios from 'axios'
import { api } from '@/services'
import { env } from '@/env'
import { getI18nTranslate } from '@/utils/i18nUtils'
import { errorCodeHandler, unauthorizedHandler } from '@/utils/api/error-handler'
import { useMessage } from '@/composables/useMessage'
import { useUserStore } from '@/stores/user.stores'
import { UtilCommon } from '@/utils/utilCommon'
import { LoginEnum, SignUpEnum } from '@/constants/enums/api/auth.enums'

/** 創建實例 */
const axiosInstance = axios.create({
  baseURL: `${env.apiBaseUrl}${env.apiVersion}`,
  timeout: 10000 // 請求超時時間
})

/** 處理請求發送前 */
const beforeRequest = (config: InternalAxiosRequestConfig) => {
  const { token } = useUserStore()
  const { login, googleLogIn } = LoginEnum
  const { signIn, validate, forgotPassword } = SignUpEnum

  const isAuthApi = [login, googleLogIn, signIn, validate, forgotPassword].some((apiPath) =>
    config.url?.includes(apiPath)
  )

  if (!isAuthApi) {
    config.headers.Authorization = `Bearer ${token}`
  }

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

  // 如果 response.data.resultCode=1002,則強制登出並跳轉到登入頁面
  if (response.data.resultCode === 1002) {
    api.auth.logout().then(() => {
      useUserStore().initLoginState()
      UtilCommon.removeLocalStorage('store-info')
      UtilCommon.removeLocalStorage('from-third-party-id')
      UtilCommon.removeLocalStorage('from-third-party-type')
      UtilCommon.goPage('/login')
    })
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
    const { status, data } = response

    const unauthorized = unauthorizedHandler(status)
    if (unauthorized) return unauthorized

    errorCodeHandler(status, (data as ApiResponseModel).message)
    return Promise.resolve(data as ApiResponseModel) // 讓後續的 catch 去做個別處理
  }
}

/** 請求攔截器 */
axiosInstance.interceptors.request.use(beforeRequest, requestFailed)
/** 回傳攔截器 */
axiosInstance.interceptors.response.use(responseSuccess, responseFailed)

export default axiosInstance
