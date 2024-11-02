import type {
  ClawOperationsInfoResType,
  CoinOperationsInfoResType
} from '@/models/types/dashboard.types'

export const useDashboard = () => {
  /** 查詢特定機台資訊 */
  const findItemData = (
    listData: ClawOperationsInfoResType[] | CoinOperationsInfoResType[],
    id: string
  ) => {
    return listData.find((item) => item.pcbId === id)
  }

  return {
    findItemData
  }
}
