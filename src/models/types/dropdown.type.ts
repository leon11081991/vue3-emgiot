export type BaseGroupsDDLResType = {
  groupId: string
  groupName: string
}

export type BaseGoodsResType = {
  goodsId: string
  goodsName: string
  cost: number
  isSpecial: boolean
  forbiddenStores: string[]
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

export type UserRoleInStoreReqType = {
  storeId: string
}

export type UserRoleInStoreResType = {
  roleId: string
  roleName: string
}

type BaseWifiInfoType = {
  wifiSSID: string
  wifiPassword: string
}

export type StoresItemDataType = {
  storeId: string
  storeName: string
  wifiInfo: BaseWifiInfoType[]
}
