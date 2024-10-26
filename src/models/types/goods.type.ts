export type BaseAddGoodsInfoType = {
  goodsName: string
  cost: number
  forbiddenStores: string[]
  isSpecial: boolean
}

export type BaseEditGoodsInfoType = BaseAddGoodsInfoType & {
  goodsId: string
}

export type BaseProductInfoListType = {
  goodsName: string
  storeName: string
  pcbId: string
  pcbName: string
  revenue: number
  prizeWinCount: number
}

export type BaseProductInfoChartResType = {
  coinExchanged: number
  date: string
  revenue: number
  profit: number
  prizeWinCount: number
}
