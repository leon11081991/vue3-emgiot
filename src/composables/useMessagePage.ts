import type {
  NotificationSettingsResType,
  EnableNotificationReqType,
  EventRecordsReqType,
  EventRecordsResType
} from '@/models/types/messagePage.types'
import { ref } from 'vue'
import { api } from '@/services'
import { useMessage } from '@/composables/useMessage'
import { catchErrorHandler } from '@/utils/api/error-handler'

/** message 頁面相關邏輯，包含api方法處理 */
export const useMessagePage = () => {
  const { openMessage } = useMessage()

  const notificationSettingsInfo = ref<{
    data: NotificationSettingsResType
    isLoading: boolean
  }>({
    data: {} as NotificationSettingsResType,
    isLoading: true
  })

  const notificationInfo = ref<{
    data: EventRecordsResType
    isLoading: boolean
  }>({
    data: {} as EventRecordsResType,
    isLoading: true
  })

  /** 取得推播通知啟用設定 */
  const getNotificationSettings = async () => {
    try {
      const { result, isSuccess, message, resultCode } = await api.message.getNotificationSettings()

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }

      notificationSettingsInfo.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      notificationSettingsInfo.value.isLoading = false
    }
  }

  /** 啟/停用系統推播通知 */
  const dispatchEnableNotification = async (params: EnableNotificationReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.message.enableNotification(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
      console.log(`result`, result)
      openMessage('success', 'success')
      return isSuccess
    } catch (e) {
      catchErrorHandler(e)
    }
  }

  /** 取得系統訊息 */
  const getNotificationInfo = async (params: EventRecordsReqType) => {
    try {
      const { result, isSuccess, message, resultCode } =
        await api.message.getEventNotification(params)

      if (!isSuccess) {
        openMessage('error', `${resultCode} - ${message}`)
        return
      }
      notificationInfo.value.data = result
    } catch (e) {
      catchErrorHandler(e)
    } finally {
      notificationInfo.value.isLoading = false
    }
  }

  return {
    notificationInfo,
    notificationSettingsInfo,
    getNotificationSettings,
    dispatchEnableNotification,
    getNotificationInfo
  }
}
