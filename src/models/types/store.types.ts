type CustomerId = string // 集團編號

type BaseWifiInfoReqType = {
  wifiSSID: string
  wifiPassword: string
}

type BaseStoreInfoResType = {
  storeId: string // 店家編號
  storeName: string // 店家名稱
  wifiInfo: [
    {
      wifiSSID: string // WIFI SSID
      wifiPassword: string // WIFI密碼
    }
  ]
}

type BaseStoresTotalResType = {
  coinExchanged: number
  date: string
  revenue: number
  profit: number
  prizeWinCount: number
}

export type StoresListInfoResType = {
  customerId: CustomerId
  stores: Array<BaseStoreInfoResType>
}

export type StoresTotalResType = Array<BaseStoresTotalResType>

export type BaseCreateStoreReqType = {
  storeName: string
  wifiInfo: BaseWifiInfoReqType[]
}
