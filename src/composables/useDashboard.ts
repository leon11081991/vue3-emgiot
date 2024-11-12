import type {
  ClawOperationsInfoResType,
  CoinOperationsInfoResType
} from '@/models/types/dashboard.types'
import type { StoreInfoStorageDataType } from '@/models/types/store.types'
import { computed } from 'vue'
import { UtilCommon } from '@/utils/utilCommon'

export const useDashboard = () => {
  const storeName = computed(() => {
    const name = UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.storeName
    return name ?? ''
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
