export enum MessagePageEnum {
  eventNotification = 'EventNotification/EventRecords', // 取得系統訊息、營業訊息 => messageType 0=系統訊息 1=營業訊息
  enableNotification = 'LogIn/EnableNotification', // 啟/停用系統推播通知、營業推播通知
  notificationSettings = 'EventNotification/NotificationSettings' // 取得推播通知啟用設定
}
