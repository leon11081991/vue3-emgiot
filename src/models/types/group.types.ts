type BasePcbsInfoType = {
  storeName: string
  pcbId: string
  machineType: number
  machineName: string
}

type BaseReArrangeGroupReqType = {
  groupId: string,
  pcbs: string[]
}

export type BasePcbGroupResType = {
  groupId: string | null
  groupName: string | null
  pcbs: BasePcbsInfoType[]
}

export type PcbGroupResType = BasePcbGroupResType[]

export type BaseGroupUpdateReqType = {
  groupId: string,
  groupName: string
}

export type ReArrangeGroupReqType = BaseReArrangeGroupReqType[]