export interface ApiResponseModel<T = any> {
  isSuccess: boolean // 是否成功
  message: string // 回傳訊息
  resultCode: number // 狀態碼
  result?: T // 回傳資料
}
