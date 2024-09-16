import type { Tab } from '@/models/interfaces/tab.interface'
import type { DashboardTabType } from '@/models/types/dashboard.types'

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
