import type {
  BaseEditGoodsInfoType,
  BaseAddGoodsInfoType,
  BaseProductInfoListType,
  BaseProductInfoChartResType
} from '@/models/types/goods.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'

/** 處理商品 api 資料邏輯 */
export const useFetchGoods = () => {
  const { openMessage } = useMessage()

  const productListInfo = ref<{
    data: BaseProductInfoListType[]
    isLoading: boolean
  }>({
    data: [] as BaseProductInfoListType[],
    isLoading: true
  })

  const productListInfoChart = ref<{
    data: BaseProductInfoChartResType[]
    isLoading: boolean
  }>({
    data: [] as BaseProductInfoChartResType[],
    isLoading: true
  })

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

  /** 商品營運數據清單 */
  const fnGetProductOperationInfo = async (params: string) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.goods.operationInfo(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
      if (result) {
        productListInfo.value.data = result
      }
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      productListInfo.value.isLoading = false
    }
  }

  /** 商品營運數據圖表 */
  const fnGetProductOperationInfoChart = async (params: string) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.goods.operationInfoChart(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      if (result) {
        productListInfoChart.value.data = result
      }
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      productListInfoChart.value.isLoading = false
    }
  }

  return {
    productListInfo,
    productListInfoChart,
    dispatchEditGoods,
    dispatchAddGoods,
    dispatchDeleteGoods,
    fnGetProductOperationInfo,
    fnGetProductOperationInfoChart
  }
}
