/** 通用工具類及其靜態方法 */
export class UtilCommon {
  /**
   * 滾動至頂部
   */
  static scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  /**
   * 普通深拷貝(不適用物件含有函式、Date...等)
   */
  static normalDeepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  }
}