export type GetClawOperationsInfoReqType = {
  startDate: string
  endDate: string
  pcbName?: string
  pcbGroupId?: string
  goodsId?: string
}

export type ClawOperationsInfoResType = {
  pcbId: string
  pcbName: string
  connectionStatus: number
  pcbGroupName: string
  goodsName: string
  revenue: number
  prizeWinCount: number
  cashboxAmount: number
  cumulativeRevenue: number
}