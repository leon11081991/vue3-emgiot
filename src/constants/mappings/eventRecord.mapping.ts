export const CLAW_EVENT_RECORD_MAPPING: Record<string, number[]> = {
  connection: [0, -1, 4, 112], // 0=機台連線 -1=機台斷線 4=機台故障 112=遠端測試
  dispatch: [100], // 100=出幣/出貨
  refill: [111, 110] // 111=補幣事件 110=錢箱收款
  // cashbox: [110], // 110=錢箱收款 /** 目前"錢箱收款"尚未設定實際的功能需求，故先將其隱藏，待日後硬體方面支援此功能後再顯示 */
}

export const CLAW_EVENT_TYPE_ICON_MAPPING: Record<number, string> = {
  '-1': 'offline', // 機台斷線
  0: 'online', // 機台連線
  4: 'fail', // 機台故障
  112: 'remote-testing', // 遠端測試
  100: 'product', // 電眼出貨
  111: 'replenish-coins-sm', // 補幣事件
  110: 'cash-box' // 錢箱收款
}

export const COIN_EVENT_RECORD_MAPPING: Record<string, number[]> = {
  connection: [0, -1, 4], // 0=機台連線 -1=機台斷線 4=機台故障
  dispense: [100], // 100=出幣/出貨
  return: [210], // 210=退幣事件
  inventory: [102], // 102=庫存回報
  status: [103, 211, 212, 213] // 103=狀態回報 211=兌幣機關閉 212=兌幣機開鎖 213=兌幣機故障消除
}

export const COIN_EVENT_TYPE_ICON_MAPPING: Record<number, string> = {
  '-1': 'offline', // 機台斷線
  0: 'online', // 機台連線
  4: 'fail', // 機台故障
  100: 'cash-box', // 出幣事件
  210: 'cash-box', // 退幣事件
  102: 'replenish-coins-sm', // 庫存回報
  103: 'record', // 狀態回報
  211: 'lock', // 兌幣機關閉
  212: 'key', // 兌幣機開鎖
  213: 'success' // 兌幣機故障消除
}
