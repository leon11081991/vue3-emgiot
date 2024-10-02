/** 通用工具類及其靜態方法 */
export class UtilCommon {
  /** 返回特定頁面 */
  static goPage(path: string): void {
    window.location.href = path
  }

  /** 滾動至頂部 */
  static scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /** 普通深拷貝(不適用物件含有函式、Date...等) */
  static normalDeepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }

  /** 文字超過特定字數以刪節號顯示 */
  static ellipsisText(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text
  }

  /** 轉換第一個字為大寫 */
  static firstCapitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  /** 檢查是否為空 */
  static checkIsEmpty = <T>(value: T | T[]): boolean => {
    if (Array.isArray(value)) {
      return value.length === 0
    }

    if (typeof value === 'object') {
      return Object.keys(value as object).length === 0
    }

    if (value === null) {
      return true
    }

    return value === ''
  }

  /** 取得百分比 */
  static getPercentage(num: number, total: number): number {
    if (total === 0) {
      return 0
    }
    return Math.round((num / total) * 100)
  }

  /** 取得平均值 */
  static getAveragePrice(total: number, quantity: number): number {
    if (quantity === 0) {
      return 0
    }
    return Math.round(total / quantity)
  }

  /** 取得localStorage */
  static getLocalStorage<T>(key: string): T | null {
    const val = localStorage.getItem(key)
    if (val) {
      return JSON.parse(val) as T
    }
    return null
  }

  /** 儲存localStorage */
  static setLocalStorage<T>(key: string, val: T): void {
    localStorage.setItem(key, JSON.stringify(val))
  }

  /** 刪除localStorage */
  static removeLocalStorage(key: string): void {
    localStorage.removeItem(key)
  }

  /** 抓取網址查詢參數 */
  static getQueryParam(key: string): string | null {
    const urlParams = new URLSearchParams(window.location.search)
    let param = urlParams.get(key)

    if (param) {
      param = decodeURIComponent(param) // 先使用 decodeURIComponent 解碼
      param = param.replace(/ /g, '+') // 將空格替換回 '+'
    }

    return param
  }
}
