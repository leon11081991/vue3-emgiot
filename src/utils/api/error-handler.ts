import type { AxiosError } from 'axios'
import { getI18nTranslate } from '@/utils/i18nUtils'
import { useMessage } from '@/composables/useMessage'
import { UtilCommon } from '@/utils/utilCommon'

const { openMessage } = useMessage()

export const errorHandler = (error: AxiosError, userInfo: any) => {
  const { response } = error

  if (response) {
    const { status } = response

    if (status === 401 && userInfo.token) {
      // 處理 401 未授權
      openMessage('error', getI18nTranslate('Common.Response.Unauthorized'), {}, () =>
        UtilCommon.goPage('/login')
      )
      return Promise.reject(new Error(getI18nTranslate('Common.Response.Unauthorized')))
    }

    if (response.status === 400) {
      openMessage('error', getI18nTranslate('Common.Response.BadRequest'))
      return Promise.reject(new Error(getI18nTranslate('Common.Response.BadRequest')))
    }

    if (response.status === 404) {
      openMessage('error', getI18nTranslate('Common.Response.NotFound'))
      return Promise.reject(new Error(getI18nTranslate('Common.Response.NotFound')))
    }

    if (response.status === 500) {
      openMessage('error', getI18nTranslate('Common.Response.InternalServerError'))
      return Promise.reject(new Error(getI18nTranslate('Common.Response.InternalServerError')))
    }
  }

  if (!window.navigator.onLine) {
    // 處理沒有網路連線
    openMessage('error', getI18nTranslate('Common.Response.NoNetwork'))
    return Promise.reject(new Error(getI18nTranslate('Common.Response.NoNetwork')))
  }

  return Promise.reject(error)
}
