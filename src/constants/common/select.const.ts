import type { SelectProps } from 'ant-design-vue'
import { getI18nTranslate } from '@/utils/i18nUtils'

export const RECENT_RECORDS_SELECT_OPTIONS = <SelectProps['options']>[
  {
    value: 3,
    label: getI18nTranslate('Common.Select.RecentRecords.3')
  },
  {
    value: 5,
    label: getI18nTranslate('Common.Select.RecentRecords.5')
  },
  {
    value: 10,
    label: getI18nTranslate('Common.Select.RecentRecords.10')
  }
]
