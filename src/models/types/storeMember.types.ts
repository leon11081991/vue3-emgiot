export type StoreMemberResType = {
  storeName: string
  storeId: string
  members: MemberType[]
}

type MemberType = {
  userId: string
  userName: string
  roleId: string
  roleName: string
}

export type StoreMemberInfoReqType = {
  storeId: string
  userId: string
}
