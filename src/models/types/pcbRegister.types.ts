export type UpdatePcbNameReqType = {
  pcbId: string
  pcbName: string
}

export type UpdateGoodsReqType = {
  pcbId: string
  goodsId: string
}

export type BindingPcbDataType = {
  machineName: string
  qrcode: string
}

export type BindingPcbReqType = {
  machineName: string
  pcbId: string
}
