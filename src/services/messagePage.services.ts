import { type ApiResponse, ApiFactory } from '@/utils/api'
import type {
  EnableNotificationReqType,
  EventRecordsReqType
} from '@/models/types/messagePage.types'
import { MessagePageEnum } from '@/constants/enums/api/messagePage.enums'

export class MessagePageServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得推播通知啟用設定 */
  getNotificationSettings = async () => {
    return await this.get<unknown, ApiResponse>(MessagePageEnum.notificationSettings)
  }

  /** 啟/停用系統推播通知 */
  enableNotification = async (params: EnableNotificationReqType) => {
    return await this.put<EnableNotificationReqType, ApiResponse>(
      MessagePageEnum.enableNotification,
      params
    )
  }

  /** 取得系統訊息 */
  getEventNotification = async (params: EventRecordsReqType) => {
    return await this.get<EventRecordsReqType, ApiResponse>(
      MessagePageEnum.eventNotification,
      params
    )
  }
}
