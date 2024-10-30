export type BaseReArrangeGroupReqType = {
  groupId: string
  pcbs: string[]
}

export type BasePcbsInfoType = {
  storeName: string
  pcbId: string
  machineType: number
  machineName: string
}

export type BasePcbGroupResType = {
  groupId: string | null
  groupName: string | null
  pcbs: BasePcbsInfoType[]
}

export type BaseGroupUpdateReqType = {
  groupId: string
  groupName: string
}

export type ReArrangeDataType = {
  groupId: string
  pcbs: BasePcbsInfoType[]
}

export type PcbGroupResType = BasePcbGroupResType[]

export type ReArrangeGroupReqType = BaseReArrangeGroupReqType[]
