import { getI18nTranslate } from '@/utils/i18nUtils'

type BaseOptionType = {
  label: string
  value: number
}

export const CLAW_EVENT_OPTIONS: BaseOptionType[] = [
  {
    value: 1,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.ConnectionStatus')
  },
  {
    value: 2,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.Dispatch')
  },
  {
    value: 3,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CashBoxCollection')
  },
  {
    value: 4,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CoinRefillEvent')
  }
]

export const COIN_EVENT_OPTIONS: BaseOptionType[] = [
  {
    value: 1,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.ConnectionStatus')
  },
  {
    value: 2,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CoinDispenseEvent')
  },
  {
    value: 3,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.CoinReturnEvent')
  },
  {
    value: 4,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.InventoryReport')
  },
  {
    value: 5,
    label: getI18nTranslate('AccountInquiryPage.EventRecord.StatusReport')
  }
]
