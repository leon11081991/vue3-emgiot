import { getI18nTranslate } from '@/utils/i18nUtils'
import { useMessage } from '@/composables/useMessage'
import { UtilCommon } from '@/utils/utilCommon'
import { useUserStore } from '@/stores/user.stores'

const { openMessage } = useMessage()

export const errorCodeHandler = (errorCode: number): Promise<Error> => {
  const errorMessages: { [key: number]: string } = {
    // 401: 'Common.Response.Unauthorized',
    400: 'Common.Response.BadRequest',
    404: 'Common.Response.NotFound',
    500: 'Common.Response.ServerError',
    502: 'Common.Response.ServerError'
  }

  const errorMessageKey = errorMessages[errorCode]

  if (errorMessageKey) {
    openMessage('error', getI18nTranslate(errorMessageKey))
    return Promise.reject(new Error(getI18nTranslate(errorMessageKey)))
  }

  return Promise.reject(new Error('Unknown error code'))
}

export const unauthorizedHandler = (errorCode: number): void => {
  if (errorCode !== 401) return

  const { initLoginState } = useUserStore()

  initLoginState()
  UtilCommon.removeLocalStorage('storage-user')
  openMessage(
    'error',
    getI18nTranslate('Common.Response.Unauthorized'),
    {}
    // () =>
    // UtilCommon.goPage('/login')
  )
}

export const catchErrorHandler = (error: unknown) => {
  let errorMessage: string

  if (error instanceof Error) {
    errorMessage = error.message
  } else {
    try {
      errorMessage = JSON.stringify(error)
    } catch {
      errorMessage = String(error) // 如果 JSON.stringify 失败，使用 String 处理
    }
  }

  // 抛出新的 Error，帶有詳細的錯誤信息，方便開發者查看
  throw new Error(errorMessage)
}
