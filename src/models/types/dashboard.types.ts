import type { MachineType } from '@/models/types/machine.types'

export type DashboardTabType = MachineType
export type AccountInquiryTabType = 'accountInquiry' | 'productRecord' | 'eventRecord'

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

export type RefreshClawDashboardType = {
  startDate: string
  endDate: string
  groupsDDLFilter: string
  groupName: string
  goodsName: string
}

export type RefreshCoinDashboardType = {
  startDate: string
  endDate: string
  groupsDDLFilter: string
  groupName: string
}

export type SelectedGroupAndGoodsType = {
  groupName: string
  goodsName: string
  groupsDDLFilter: string
}

export type SelectedGroupType = {
  groupName: string
  groupsDDLFilter: string
}

export type SelectedGroupAndGoodsRemoveType = {
  groupName: number
  goodsName: number
  groupsDDLFilter: number
}

export type BaseMachineActionType =
  | 'restock' // 選物機補幣
  | 'withdraw' // 兌幣機退幣
  | 'lock' // 兌幣機關閉
  | 'unlock' // 兌幣機開鎖
  | 'errorReset' // 兌幣機故障消除
  | 'M1Reset' // 機械錶1重置
  | 'M2Reset' // 機械錶2重置

type BaseMachineActionData = {
  action: BaseMachineActionType
  count: number
}

export type UpdateMachineActionDataType = BaseMachineActionData & {
  pcbId: string | string[]
}

export type UpdateMachineActionReqType = BaseMachineActionData & {
  pcbId: string
}
