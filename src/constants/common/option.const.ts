import { getI18nTranslate } from '@/utils/i18nUtils'

type BaseOptionType = {
  label: string
  value: string
}

export const CLAW_EVENT_OPTIONS: BaseOptionType[] = [
  {
    value: 'connection',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.ConnectionStatus')
  },
  {
    value: 'dispatch',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.Dispatch')
  },
  {
    value: 'cashbox',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CashBoxCollection')
  },
  {
    value: 'refill',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CoinRefillEvent')
  }
]

export const COIN_EVENT_OPTIONS: BaseOptionType[] = [
  {
    value: 'connection',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.ConnectionStatus')
  },
  {
    value: 'dispense',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CoinDispenseEvent')
  },
  {
    value: 'return',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CoinReturnEvent')
  },
  {
    value: 'inventory',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.InventoryReport')
  },
  {
    value: 'status',
    label: getI18nTranslate('AccountInquiryPage.EventRecord.StatusReport')
  }
]

export const LIST_TYPE = [
  {
    value: 'day',
    label: getI18nTranslate('AccountInquiryPage.ListType.Day')
  },
  {
    value: 'week',
    label: getI18nTranslate('AccountInquiryPage.ListType.Week')
  },
  {
    value: 'month',
    label: getI18nTranslate('AccountInquiryPage.ListType.Month')
  }
]
