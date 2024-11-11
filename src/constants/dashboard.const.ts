import type { Tab } from '@/models/interfaces/tab.interface'
import type { DashboardTabType, AccountInquiryTabType } from '@/models/types/dashboard.types'

export const createDashboardTabs = ($t: any): Tab<DashboardTabType>[] => [
  {
    value: 'claw',
    title: $t('DashboardPage.Tabs.Claw'),
    payload: {
      icon: 'product'
    }
  },
  {
    value: 'coin',
    title: $t('DashboardPage.Tabs.Coin'),
    payload: {
      icon: 'coin'
    }
  }
]

export const createAccountInquiryTabs = (
  $t: any,
  machineType: DashboardTabType
): Tab<AccountInquiryTabType>[] => {
  const tabs: Tab<AccountInquiryTabType>[] = [
    {
      value: 'accountInquiry',
      title: $t('AccountInquiryPage.Tabs.AccountInquiry'),
      payload: {
        icon: 'accounts'
      }
    },
    {
      value: 'eventRecord',
      title: $t('AccountInquiryPage.Tabs.EventRecord'),
      payload: {
        icon: 'coin'
      }
    }
  ]

  if (machineType === 'claw') {
    tabs.splice(1, 0, {
      value: 'productRecord',
      title: $t('AccountInquiryPage.Tabs.ProductRecord'),
      payload: {
        icon: 'product'
      }
    })
  }

  return tabs
}
