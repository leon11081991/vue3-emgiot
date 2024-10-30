import type { BaseMachineActionType } from '@/models/types/dashboard.types'
import { getI18nTranslate } from '@/utils/i18nUtils'

export const machineActionMapping: Record<BaseMachineActionType, string> = {
  restock: getI18nTranslate('DashboardPage.MachineAction.Restock'),
  withdraw: getI18nTranslate('DashboardPage.MachineAction.Withdraw'),
  lock: getI18nTranslate('DashboardPage.MachineAction.Lock'),
  unlock: getI18nTranslate('DashboardPage.MachineAction.Unlock'),
  errorReset: getI18nTranslate('DashboardPage.MachineAction.ErrorReset'),
  M1Reset: getI18nTranslate('DashboardPage.MachineAction.M1Reset'),
  M2Reset: getI18nTranslate('DashboardPage.MachineAction.M2Reset')
}
