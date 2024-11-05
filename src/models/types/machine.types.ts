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

export type ClawOperationsDetailResType = {
  pcbName: string
  records: BaseClawRecordType[]
}

export type CoinOperationsDetailResType = {
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
