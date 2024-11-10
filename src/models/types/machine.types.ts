export type MachineType = 'claw' | 'coin'

// 選物機和兌幣機共用
export type MachineOperationsDetailReqType = {
  pcbId: string
  startDate: string
  endDate: string
}

export type BaseClawRecordType = {
  date: string
  prizeWinCount: number
  profit: number
  revenue: number
}

export type BaseCoinRecordType = {
  date: string
  exchangeCount: number
}

export type AggregateRecordType = {
  date: string
  prizeWinCount?: number
  profit?: number
  revenue?: number
  exchangeCount?: number
}

export type ClawOperationsDetailResType = {
  pcbName: string
  records: BaseClawRecordType[]
}

export type CoinOperationsDetailResType = {
  pcbName: string
  coinExchanged: number
  coinRemaining: number
  records: BaseCoinRecordType[]
}

type BaseClawGoodsRecordResType = {
  from: string
  to: string
  start: string | null
  end: string | null
}

export type GetClawGoodsRecordResType = BaseClawGoodsRecordResType[]

type BaseMachineEventRecordResType = {
  date: string
  event: string
  eventLog: string
  eventCode: number
}

export type MachineEventRecordsResType = BaseMachineEventRecordResType[]

export type clawMachineCardType = {
  pcbName: string
  totalRevenue: number
  prizeWinCount: number
  averagePrizeWinCount: number
  profit: number
}

export type coinMachineCardType = {
  pcbName: string
  coinExchanged: number
  coinRemaining: number
  totalExchangeCoinCount: number
}
