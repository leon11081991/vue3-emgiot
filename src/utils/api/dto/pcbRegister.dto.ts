import type {
  BindingPcbDataType,
  BindingPcbReqType,
  UpdatePcbNameReqType,
  UpdateGoodsReqType
} from '@/models/types/pcbRegister.types'

export class BindingPcbDto {
  /** BindingPcbDataType =>  轉換為 BindingPcbReqType */
  static FormattedBindingPcbReqData(content: BindingPcbDataType): BindingPcbReqType {
    const { machineName, qrcode } = content
    return { machineName, pcbId: qrcode }
  }
}
