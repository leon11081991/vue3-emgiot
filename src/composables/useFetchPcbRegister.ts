import type { UpdatePcbNameReqType } from '@/models/types/pcbRegister.types'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'

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

      openMessage('success', '編輯機台名稱成功')
      return true
    } catch (e) {
      catchErrorHandler(e)
      return false
    }
  }

  return {
    fnUpdatePcbName
  }
}
