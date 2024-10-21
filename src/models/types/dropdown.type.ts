export type BaseGroupsDDLResType = {
  groupId: string
  groupName: string
}

export type BaseGoodsResType = {
  goodsId: string
  goodsName: string
  cost: number
}

export type PcbsReqType = {
  storeId: string
  machineType?: 0 | 1 // 0: 選物販賣機 1:兌幣機
}

export type PcbsResType = {
  pcbId: string
  dueDate: string
  machineName: string
  groupName: string
}
