import type {
  BindingPcbDataType,
  UpdatePcbNameReqType,
  UpdateGoodsReqType
} from '@/models/types/pcbRegister.types'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'
import { BindingPcbDto } from '@/utils/api/dto/pcbRegister.dto'
import { getI18nTranslate } from '@/utils/i18nUtils'

/** 處理機台相關 api 資料邏輯 */
export const useFetchPcbRegister = () => {
  const { openMessage } = useMessage()

  /** 處理機台新增(預綁定) */
  const fnBindingPcb = async (params: BindingPcbDataType): Promise<boolean> => {
    try {
      const { isSuccess, resultCode, message } = await api.pcbRegister.bindingPcb(
        BindingPcbDto.FormattedBindingPcbReqData(params)
      )

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return false
      }

      openMessage(
        'success',
        getI18nTranslate('DashboardPage.Modal.AddNewMachine.Title.Default') +
          getI18nTranslate('Common.Response.Success')
      )
      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

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
    fnBindingPcb,
    fnUpdatePcbName,
    fnUpdateGoods
  }
}
