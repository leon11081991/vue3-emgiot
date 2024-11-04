export type MachineOperationsDetailReqType = {
  pcbId: string
  startDate: string
  endDate: string
}

export type BaseRecordType = {
  date: string
  prizeWinCount: number
  profit: number
  revenue: number
}

export type MachineOperationsDetailResType = {
  pcbName: string
  records: BaseRecordType[]
}

type BaseClawGoodsRecordResType = {
  from: string
  to: string
  start: string | null
  end: string | null
}

export type GetClawGoodsRecordResType = BaseClawGoodsRecordResType[]
