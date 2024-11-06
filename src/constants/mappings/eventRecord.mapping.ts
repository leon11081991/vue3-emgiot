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

export const EVENT_TYPE_ICON_MAPPING: Record<number, string> = {
  '-1': '',
  0: '',
  100: 'product',
  110: 'cash-box',
  111: 'replenish-coins-sm',
  210: '',
  211: '',
  212: ''
}
