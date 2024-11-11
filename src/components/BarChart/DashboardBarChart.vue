<script setup lang="ts">
/* import */
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import DashboardBarChart from '@/components/BarChart/DashboardBaseBarChart.vue'
import type { PropsBarChartType } from '@/models/types/dashboard.types'
import { useDate } from '@/composables/useDate'
import { useFetchDashboard } from '@/composables/useFetchDashboard'

/* type */
type OperationDataKey = 'revenue' | 'prizeWinCount' | 'profit' | 'coinExchanged'

/* defineProps */
const props = defineProps<{
  type: PropsBarChartType
  startDate: string
  endDate: string
  isInitialChart: boolean
}>()

/* defineEmit */
const emit = defineEmits<{
  (e: 'update:storeInfo'): void
}>()

/* i18n */
const { t: $t } = useI18n()

/* 非響應式變數 */
const TABS = {
  REVENUE: 'revenue',
  PROFIT: 'profit'
}

/* ref 變數 */
const currentTab = ref(TABS.REVENUE)
const lastUpdatedTime = ref('')

// 初始化日期
const { today, getCurrentDateTime, formatDate } = useDate()
lastUpdatedTime.value = getCurrentDateTime()

// 獲取數據
const { operationChart, fetchOperationClawChart, fetchOperationCoinChart } = useFetchDashboard()

// Helper function to filter data within date range
function getEntriesWithinDateRange(data: any[], startDate: string, endDate: string) {
  const start = new Date(props.isInitialChart ? today() : startDate)
  const end = new Date(props.isInitialChart ? today() : endDate)

  return data.filter((entry) => {
    const entryDate = new Date(formatDate(entry.date, 'YYYY-MM-DD'))
    return entryDate >= start && entryDate <= end
  })
}

// Helper function to calculate total by key
function sumByKey(data: any[], key: OperationDataKey) {
  return data.reduce((total, entry) => total + (entry[key] || 0), 0)
}

// Computed to calculate total for a specific range
const getTotalForDateRange = (key: OperationDataKey) => {
  return computed(() => {
    const startDate = props.isInitialChart ? today() : props.startDate
    const endDate = props.isInitialChart ? today() : props.endDate
    const clawMachineData = operationChart.value.data.clawMachine || []
    const filteredData = getEntriesWithinDateRange(clawMachineData, startDate, endDate)
    return sumByKey(filteredData, key)
  })
}

const isTodayData = computed(() => {
  const isSameStartEnd = props.startDate === props.endDate
  const isToday = props.startDate === today()

  return isSameStartEnd && isToday
})

// Calculated data
const revenueTotal = computed(() => `${getTotalForDateRange('revenue').value}`)
const prizeWinCountTotal = getTotalForDateRange('prizeWinCount')
const profitTotal = computed(() => `${getTotalForDateRange('profit').value}`)
const coinExchangedTotal = computed(() => {
  const coinMachineData = operationChart.value.data.coinMachine || []
  const todayCoinData = getEntriesWithinDateRange(coinMachineData, props.startDate, props.endDate)
  return sumByKey(todayCoinData, 'coinExchanged')
})

/* functions */
const changeTab = (tab: string) => {
  currentTab.value = tab
}

const emitUpdateStoreWifiInfo = () => {
  emit('update:storeInfo')
}

/* lifecycle hooks */
fetchOperationClawChart({
  startDate: props.startDate,
  endDate: props.endDate
})
fetchOperationCoinChart({
  startDate: props.startDate,
  endDate: props.endDate
})
</script>

<template>
  <div class="bar-chart-tab">
    <div
      class="tab-item revenue"
      :class="{ active: currentTab === TABS.REVENUE }"
      @click="changeTab(TABS.REVENUE)"
    >
      {{ $t('DashboardPage.Chart.Revenue') }}
    </div>
    <div
      class="tab-item profit"
      :class="{ active: currentTab === TABS.PROFIT }"
      @click="changeTab(TABS.PROFIT)"
    >
      {{ $t('DashboardPage.Chart.Profit') }}
    </div>
    <div
      class="edit-store"
      @click="emitUpdateStoreWifiInfo"
    >
      <BaseSvgIcon
        iconName="edit"
        color="white"
        size="sm"
      />
      {{ $t('DashboardPage.Chart.EditStore') }}
    </div>
  </div>
  <div class="bar-chart-container">
    <div class="chart-section">
      <div class="revenue">
        {{
          isTodayData || props.isInitialChart
            ? $t('DashboardPage.Chart.Today')
            : `${props.startDate} ~ ${props.endDate}`
        }}{{
          currentTab === TABS.REVENUE
            ? $t('DashboardPage.Chart.Revenue')
            : $t('DashboardPage.Chart.Profit')
        }}
        <p class="revenue-data">
          {{ currentTab === TABS.REVENUE ? revenueTotal : profitTotal }}
        </p>
      </div>
      <div class="chartData-section">
        <DashboardBarChart
          class="chart"
          :isLoading="operationChart.isLoading.clawMachine || operationChart.isLoading.coinMachine"
          :data="operationChart.data"
          :type="props.type"
        />
        <div class="chartData-container">
          <div class="data-title">
            <div class="title">
              {{ $t('DashboardPage.Chart.PrizeWinCount') }}
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data">{{ prizeWinCountTotal }}</div>
          </div>
          <div class="data-title">
            <div class="title">
              {{ $t('DashboardPage.Chart.Profit') }}
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data">{{ profitTotal }}</div>
          </div>
          <div class="data-title">
            <div class="title">
              {{ $t('DashboardPage.Chart.CoinExchanged') }}
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data">{{ coinExchangedTotal }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar-chart-tab {
  display: flex;
  column-gap: 8px;
  padding-left: 1rem;
  .tab-item {
    padding: 8px 40px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    letter-spacing: 3px;
    user-select: none;
    text-align: center;
    cursor: pointer;
    color: $--color-white;
    background-color: $--color-Tab-bg;
    &.active {
      background-color: $--color-targetTab-bg;
    }
    @media screen and (max-width: 430px) {
      flex: 1;
      padding: 8px 0;
    }
  }
  .edit-store {
    display: flex;
    align-items: center;
    max-height: 32px;
    padding: 0 8px;
    margin: 0 16px 0 auto;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    color: $--color-white;
    background-color: $--color-primary;
  }
}
.bar-chart-container {
  background-color: $--color-targetTab-bg;
  border-radius: $--border-radius-extraLarge;
  padding: 1rem;
  display: flex;
  column-gap: 2rem;
  .revenue {
    font-size: 1rem;
    font-weight: 400;
    color: $--color-white;
    line-height: 1.4;
    margin-bottom: 1rem;
    &-data {
      font-size: 2rem;
      font-weight: 700;
    }
  }
  .chart-section {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .chartData-section {
    display: flex;
    column-gap: 1.5rem;
    @include media-breakpoint-down(sm) {
      align-items: center;
    }
    .chart {
      width: 100%;
      aspect-ratio: 2 / 1;
      flex: 8;
    }
    .chartData-container {
      flex: 2;
      font-weight: 700;
      color: $--color-white;
      @include media-breakpoint-down(xs) {
        font-size: 0.75rem;
      }
    }

    .data-title {
      margin-bottom: 0.5rem;
      .title {
        display: flex;
        white-space: nowrap;
        align-items: center;
        justify-content: space-between;
        > * {
          flex-shrink: 0;
        }
      }
      .data {
        width: 100%;
      }
    }
  }
}
</style>
