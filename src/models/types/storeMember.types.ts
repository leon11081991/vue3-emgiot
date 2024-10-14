export type StoreMemberResType = {
  storeName: string
  storeId: string
  members: MemberType[]
}

type MemberType = {
  userId: string
  userName: string
  roleId: string
  roleOrder: number
  photoUrl: string
  isVisible: boolean
}

export type StoreMemberInfoReqType = {
  storeId: string
  userId: string
}

export type StoreMemberInfoResType = {
  userId: string
  userName: string
  storeName: string
  roleOrder: number
  photoUrl: string
  isSpecial: boolean
  isGoodsManagement: boolean
  forbiddenPcbs: string[]
}

export type StoreMemberInfoDataType = StoreMemberInfoResType & {
  storeId?: string
  isForbidden: boolean
}

export type UpdateStoreMemberInfoReqType = {
  storeId: string
  userId: string
  roleOrder: number
  isSpecial: boolean
  isGoodsManagement: boolean
  forbiddenPcbs: string[]
}
