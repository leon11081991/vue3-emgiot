import type { BaseAddGoodsInfoType, BaseEditGoodsInfoType } from '@/models/types/goods.type'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'

export const useGoods = () => {
  const { openMessage } = useMessage()

  /** 編輯商品 */
  const dispatchEditGoods = async (params: BaseEditGoodsInfoType) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.goods.edit(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
      openMessage('success', 'success')
      return true
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 取得可用商品群組 */
  const dispatchAddGoods = async (params: BaseAddGoodsInfoType) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.goods.add(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
      openMessage('success', 'success')
      return isSuccess
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 刪除商品 */
  const dispatchDeleteGoods = async (params: string) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.goods.delete(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
      openMessage('success', 'success')
      return isSuccess
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  return {
    dispatchEditGoods,
    dispatchAddGoods,
    dispatchDeleteGoods
  }
}
