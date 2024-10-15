export type BaseGroupsDDLResType = {
  groupId: string
  groupName: string
}

export type BaseGoodsResType = {
  goodsId: string
  goodsName: string
  cost: number
}

export type PcbsResType = {
  storeId: string
}

export type PcbsReqType = {
  pcbId: string
  dueDate: string
  machineName: string
  groupName: string
}
