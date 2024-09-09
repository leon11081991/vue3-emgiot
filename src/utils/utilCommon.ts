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
  /**  根據當前tab在tabList的位置，确定过渡方向。 */
  static determineTransitionDirection(tabs: string[], currentTab: string): string {
    if (tabs.indexOf(currentTab) !== tabs.length - 1) {
      return 'right'
    }
    return 'left'
  }
}