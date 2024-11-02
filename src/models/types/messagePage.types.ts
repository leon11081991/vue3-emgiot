export type NotificationSettingsResType = {
  systemNotificationEnable: boolean
  operationNotificationEnable: boolean
}

export type EnableNotificationReqType = {
  messageType: number //0=系統訊息 1=營業訊息
  enable: boolean //是否開啟通知
  subscription: string | null //FCM的推播Token，如enable=false則給null
}

export type EventRecordsReqType = {
  messageType: number //0=系統訊息 1=營業訊息
  pageIndex: number // 頁碼
}

export type EventRecordsItemResType = {
  eventId: string
  storeName: string
  machineName: string
  date: string
  eventContent: string
}

export type EventRecordsResType = {
  items: EventRecordsItemResType[]
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
