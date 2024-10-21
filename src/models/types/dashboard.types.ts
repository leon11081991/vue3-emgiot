export type DashboardTabType = 'claw' | 'coin'

type BaseOperationsInfoReqType = {
  startDate: string // 開始時間
  endDate: string // 結束時間
  pcbName?: string // 選物機名稱
  pcbGroupId?: string // 選物機群組ID
}

type BaseOperationsInfoResType = {
  pcbId: string // 機台ID
  pcbName: string // 機台名稱
  connectionStatus: number // 連線狀態
  pcbGroupName: string // 機台群組名稱
}

export type ClawMachineResType = {
  date: string // 日期
  revenue: number // 營收
  profit: number // 盈餘
  prizeWinCount: number // 出貨
}

export type CoinMachineResType = {
  date: string // 日期
  coinExchanged: number // 兌幣量
}

export type GetOperationChartReqType = BaseOperationsInfoReqType & {
  goodsId?: string // 選物機商品ID
}

export type OperationChartResType = {
  clawMachine: Array<ClawMachineResType>
  coinMachine: Array<CoinMachineResType>
}

export type GetClawOperationsInfoReqType = BaseOperationsInfoReqType & {
  goodsId?: string // 選物機商品ID
}

export type ClawOperationsInfoResType = BaseOperationsInfoResType & {
  goodsName: string // 商品名稱
  revenue: number // 營收
  prizeWinCount: number // 出貨
  cashboxAmount: number // 錢箱累積
  cumulativeAmount: number // 累保金額
}

export type GetCoinOperationsInfoReqType = BaseOperationsInfoReqType

export type CoinOperationsInfoResType = BaseOperationsInfoResType & {
  exchangedCount: number // 兌幣量
  coinExchanged: number // 已兌
  coinRemaining: number // 剩餘
}

export type PropsBarChartType = 'claw' | 'coin'

export type RefreshDashboardType = {
  startDate: string
  endDate: string
  groupsDDLFilter: string
  groupName: string
  goodsName: string
}

export type SelectedGroupAndGoodsType = {
  groupName: string
  goodsName: string
}

export type SelectedGroupAndGoodsRemoveType = {
  groupName: number
  goodsName: number
}

type BaseMachineActionType =
  | 'restock'
  | 'withdraw'
  | 'lock'
  | 'unlock'
  | 'errorReset'
  | 'M1Reset'
  | 'M2Reset'

export type UpdateMachineActionReqType = {
  pcbId: string
  action: BaseMachineActionType
  count: number
}
