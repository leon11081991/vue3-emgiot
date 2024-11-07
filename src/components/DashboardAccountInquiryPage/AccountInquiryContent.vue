<script setup lang="ts">
import type { MachineType } from '@/models/types/machine.types'
import type {
  BaseClawRecordType,
  BaseCoinRecordType,
  ClawOperationsDetailResType,
  CoinOperationsDetailResType
} from '@/models/types/machine.types'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useDate } from '@/composables/useDate'
import { LIST_TYPE } from '@/constants/common/option.const'

type ListType = 'day' | 'week' | 'month'

const props = withDefaults(
  defineProps<{
    data: ClawOperationsDetailResType | CoinOperationsDetailResType
  }>(),
  {
    data() {
      return {} as ClawOperationsDetailResType | CoinOperationsDetailResType
    }
  }
)

const { t: $t } = useI18n()
const route = useRoute()
const { formatDate } = useDate()

// 非響應式變數
const machineType = route.params.machineType as MachineType

// ref 變數
const selectedType = ref<ListType>('day')
const accountList = computed(() => {
  if (selectedType.value === 'week') {
    return handleWeekData(props.data?.records)
  }

  if (selectedType.value === 'month') {
    return handleMonthData(props.data?.records)
  }

  return props.data?.records
})

// function
const getDate = (date: string | null) => {
  if (!date) return ''
  return formatDate(date, 'YYYY-MM-DD')
}

const getWeekTitle = (date: string) => {
  // 如果是中文，則顯示"第X週"，否則顯示"Week X"
  return $t('AccountInquiryPage.WeekTitle', { date })
}

const handleDateContent = (type: ListType, date: string | null) => {
  if (!date) return ''

  if (type === 'day') {
    return getDate(date)
  }

  if (type === 'week') {
    return getWeekTitle(date)
  }

  return date
}

const handleWeekData = (records: BaseClawRecordType[] | BaseCoinRecordType[]) => {
  if (!records) return []

  const weeklyData = []
  for (let i = 0; i < records.length; i += 7) {
    // 提取每七個為一組的記錄
    const weekRecords = records.slice(i, i + 7)

    // 初始化累加結果，並使用該週的第一天作為日期標記
    const weeklySummary = weekRecords.reduce(
      (acc, record) => {
        for (const key in record) {
          // 若該屬性為 `date`，則以第幾週作為日期標記
          if (key === 'date' && !acc.date) {
            acc.date = i / 7 + 1
          } else {
            // 對每個屬性進行動態累加，如果是數字類型的屬性
            acc[key as keyof typeof acc] =
              (acc[key] || 0) +
              (typeof record[key as keyof typeof record] === 'number'
                ? record[key as keyof typeof record]
                : 0)
          }
        }
        return acc
      },
      {} as Record<string, any>
    )

    // 將該週累加的結果推入陣列
    weeklyData.push(weeklySummary)
  }

  return weeklyData
}

const handleMonthData = (
  records: BaseClawRecordType[] | BaseCoinRecordType[]
): BaseClawRecordType[] | BaseCoinRecordType[] => {
  if (!records) return []

  const monthlyData: Record<string, any> = {}

  records.forEach((record) => {
    const monthKey = formatDate(record.date, 'YYYY-MM') // Format date to get the month

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { ...record }
    } else {
      for (const key in record) {
        if (key !== 'date') {
          monthlyData[monthKey][key] =
            (monthlyData[monthKey][key] || 0) +
            (typeof record[key as keyof typeof record] === 'number'
              ? record[key as keyof typeof record]
              : 0)
        }
      }
    }
    monthlyData[monthKey].date = monthKey
  })
  return Object.values(monthlyData)
}
</script>

<template>
  <div class="account-inquiry-content">
    <div class="list-container">
      <div class="list-action">
        <label
          class="action-label"
          v-for="type in LIST_TYPE"
          :for="type.value"
          :key="type.value"
        >
          <input
            type="radio"
            :id="type.value"
            :name="type.value"
            :value="type.value"
            v-model="selectedType"
          />
          <span>{{ type.label }}</span>
        </label>
      </div>
      <div class="list-content">
        <div
          class="content-header"
          :class="machineType"
        >
          <div class="date-header">{{ $t('AccountInquiryPage.ContentHeader.Date') }}</div>
          <template v-if="machineType === 'claw'">
            <div class="count-header">
              {{ $t('AccountInquiryPage.ContentHeader.PrizeWinCount') }}
            </div>
            <div class="count-header">{{ $t('AccountInquiryPage.ContentHeader.Revenue') }}</div>
          </template>
          <template v-if="machineType === 'coin'">
            <div class="count-header">
              {{ $t('AccountInquiryPage.ContentHeader.ExchangeCount') }}
            </div>
          </template>
        </div>
        <ul class="content-list">
          {{
            accountList
          }}
          <li
            v-for="item in accountList"
            :key="item.date"
            :class="machineType"
            class="content-item"
          >
            <div class="date">{{ handleDateContent(selectedType, item?.date) }}</div>
            <template v-if="machineType === 'claw'">
              <div class="count prizeWinCount">
                {{ (item as BaseClawRecordType)?.prizeWinCount }}
              </div>
              <div class="count revenue">{{ (item as BaseClawRecordType)?.revenue }}</div>
            </template>
            <template v-if="machineType === 'coin'">
              <div class="count exchangeCount">
                {{ (item as BaseCoinRecordType)?.exchangeCount }}
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-action {
  display: flex;

  .action-label {
    margin-right: 1rem;

    &:first-of-type {
      margin-left: 1rem;
    }

    span {
      @include base-transition;
      display: block;
      padding-block: 2px;
      padding-inline: 0.5rem;
      background-color: $--color-white;
      border: 3px solid $--color-primary;
      border-bottom: none;
      border-radius: $--border-radius-middle $--border-radius-middle 0 0;
      color: $--color-primary;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: rgba($--color-primary--hover, 0.8);
        color: $--color-white;
      }
    }

    input[type='radio'] {
      display: none;
    }

    input[type='radio']:checked + span {
      background-color: $--color-primary;
      color: $--color-white;

      &:hover {
        background-color: rgba($--color-primary--hover, 0.8);
      }
    }
  }
}

.list-content {
  padding: 1rem;
  border: 3px solid $--color-primary;
  border-radius: $--border-radius-middle;

  .content-header {
    display: grid;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $--color-gray-500;
    color: $--color-gray-600;

    &.claw {
      grid-template-columns: 1fr 1fr 1fr;
    }

    &.coin {
      grid-template-columns: 1fr 1fr;
    }
  }

  .content-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1rem;
  }

  .content-item {
    display: grid;
    text-align: center;
    color: $--color-gray-700;

    &.claw {
      grid-template-columns: 1fr 1fr 1fr;
    }

    &.coin {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
