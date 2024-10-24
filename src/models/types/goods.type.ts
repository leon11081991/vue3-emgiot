export type BaseAddGoodsInfoType = {
  goodsName: string
  cost: number
  forbiddenStores: string[]
  isSpecial: boolean
}

export type BaseEditGoodsInfoType = BaseAddGoodsInfoType & {
  goodsId: string
}
