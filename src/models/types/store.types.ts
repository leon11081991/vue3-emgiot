type CustomerId = string // 集團編號

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

export type StoresListInfoResType = {
  customerId: CustomerId
  stores: Array<BaseStoreInfoResType>
}
