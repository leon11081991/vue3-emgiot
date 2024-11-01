import type { UpdatePcbNameReqType, UpdateGoodsReqType } from '@/models/types/pcbRegister.types'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { getI18nTranslate } from '@/utils/i18nUtils'

export const useFetchPcbRegister = () => {
  const { openMessage } = useMessage()

  /** 處理編輯機台名稱 */
  const fnUpdatePcbName = async (params: UpdatePcbNameReqType): Promise<boolean> => {
    try {
      const { isSuccess, resultCode, message } = await api.pcbRegister.updatePcbName(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return false
      }

      openMessage(
        'success',
        getI18nTranslate('DashboardPage.Modal.EditMachine.Title') +
          getI18nTranslate('Common.Response.Success')
      )
      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  /** 處理更換機台商品 */
  const fnUpdateGoods = async (params: UpdateGoodsReqType): Promise<boolean> => {
    try {
      const { isSuccess, resultCode, message } = await api.pcbRegister.updateGoods(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return false
      }

      openMessage(
        'success',
        getI18nTranslate('DashboardPage.Modal.ChangeProduct.Title') +
          getI18nTranslate('Common.Response.Success')
      )
      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  return {
    fnUpdatePcbName,
    fnUpdateGoods
  }
}
