import type {
  PcbGroupResType,
  BaseGroupUpdateReqType,
  ReArrangeGroupReqType
} from '@/models/types/group.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'

export const useGroup = () => {
  const { openMessage } = useMessage()

  const groupList = ref<{
    data: PcbGroupResType
    isLoading: boolean
  }>({
    data: [] as PcbGroupResType,
    isLoading: true
  })

  /* 取得機台自訂分類清單 */
  const fnGetGroupList = async () => {
    try {
      const { result, isSuccess, message, resultCode } = await api.group.getGroup()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
      groupList.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      groupList.value.isLoading = false
    }
  }

  /* 重新分類機台群組 */
  const fnReArrangeGroupList = async (params: ReArrangeGroupReqType) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.group.reArrangeGroup(params)

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


  /* 新增機台自訂分類 */
  const fnAddGroupList = async (params: string) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.group.addGroup(params)

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

  /* 編輯機台自訂分類 */
  const fnUpdateGroupList = async (params: BaseGroupUpdateReqType) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.group.updateGroup(params)

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

  /* 刪除機台自訂分類 */
  const fnDeleteGroupList = async (params: string) => {
    try {
      const { result, isSuccess, message, resultCode } = await api.group.deleteGroup(params)

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

  return {
    groupList,
    fnGetGroupList,
    fnAddGroupList,
    fnUpdateGroupList,
    fnDeleteGroupList,
    fnReArrangeGroupList
  }
}
