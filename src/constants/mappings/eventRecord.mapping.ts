export const EVENT_RECORD_MAPPING: Record<string, number[]> = {
  connection: [0, -1], // 0=機台連線 -1=機台斷線
  dispatch: [100], // 100=出幣/出貨
  cashbox: [110], // 110=錢箱收款
  refill: [111], // 111=補幣事件
  dispense: [100], // 100=出幣/出貨
  return: [210], // 210=退幣事件
  inventory: [211], // 211=庫存回報
  status: [212] // 212=狀態回報
}

export const CLAW_EVENT_TYPE_ICON_MAPPING: Record<number, string> = {
  '-1': 'offline', // 機台斷線
  0: 'online', // 機台連線
  100: 'product', // 電眼出貨
  110: 'cash-box', // 錢箱收款
  111: 'replenish-coins-sm' // 補幣事件
}

export const COIN_EVENT_TYPE_ICON_MAPPING: Record<number, string> = {
  '-1': 'offline', // 機台斷線
  0: 'online', // 機台連線
  100: 'cash-box', // 出幣事件
  210: 'cash-box', // 退幣事件
  211: 'replenish-coins-sm', // 庫存回報
  212: 'record' // 狀態回報
}
