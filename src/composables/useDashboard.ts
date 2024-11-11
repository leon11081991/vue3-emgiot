import type {
  ClawOperationsInfoResType,
  CoinOperationsInfoResType
} from '@/models/types/dashboard.types'
import type { StoreInfoStorageDataType } from '@/models/types/store.types'
import { computed } from 'vue'
import { UtilCommon } from '@/utils/utilCommon'
import { getI18nTranslate } from '@/utils/i18nUtils'

export const useDashboard = () => {
  const storeName = computed(() => {
    const keyword = getI18nTranslate('Common.Store')
    const name = UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.storeName

    if (!name) {
      return ''
    }

    const lastChar = name[name.length - 1]
    const isStoreKeywordExist = lastChar.includes(keyword)

    return isStoreKeywordExist ? name : name + keyword
  })

  /** 查詢特定機台資訊 */
  const findItemData = (
    listData: ClawOperationsInfoResType[] | CoinOperationsInfoResType[],
    id: string
  ) => {
    return listData.find((item) => item.pcbId === id)
  }

  return {
    storeName,
    findItemData
  }
}
