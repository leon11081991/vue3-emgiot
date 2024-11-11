import type { PcbsResType } from '@/models/types/dropdown.type'

export class DropdownDto {
  /** 過濾掉沒有機台名稱的資料 */
  static FilterEmptyNameData(content: PcbsResType[]) {
    // 過濾掉沒有機台名稱的資料
    const filteredContent = content.filter((item) => {
      return !!item.machineName
    })

    return filteredContent
  }
}
